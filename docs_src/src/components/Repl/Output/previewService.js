import { writable } from 'svelte/store';

const PubnubKeys = {
    PUBLISH_KEY: "pub-c-d7893276-cc78-4d18-8ab0-becba06e43de",
    SUBSCRIBE_KEY: "sub-c-3dad1ebe-aaa3-11e8-8027-363023237e0b"
}



export class PreviewService {

    constructor() {
        this.messagingService = null;
        this.instanceId = null;
        this.init = this.init.bind(this);
        this.previewSdk = null;
        this.connectedDevices = writable([]);
        this.syncInProgress = writable(false);
        this.lastSizeKb = 0;
        this.onLog = () => { };
    }

    qrCodeUrl() {
        return `nsplay://boot?instanceId=${this.instanceId}&pKey=${PubnubKeys.PUBLISH_KEY}&sKey=${PubnubKeys.SUBSCRIBE_KEY}&template=play-ng`
    }

    async onBiggerFilesUpload(filesContent, callback) {
        let bodyBlob = new Blob([pako.gzip(filesContent)])
        this.lastSizeKb = (bodyBlob.size / 1024);
        const uploadResponse = await fetch("/repl/syncfiles", {
            method: "POST",
            body: bodyBlob,
            headers: {
                "Content-Encoding": "gzip",
                "Content-Type": "text/plain"
            }
        });

        const responseBody = await uploadResponse.json();
        const location = responseBody && responseBody.location;
        callback(location, uploadResponse.ok ? null : new Error(`Error uploading files ${uploadResponse.status}:${uploadResponse.statusText}`));
    }

    syncAppForPlatform(mainjs, platform) {
        return new Promise((resolve, reject) => {
            this.messagingService.applyChanges(this.instanceId, {
                files: [{
                    event: "change",
                    file: "app.js",
                    binary: false,
                    fileContents: mainjs
                }],
                platform: platform,
                hmrMode: 0,
                deviceId: null
            }, (e) => {
                console.log('sync complete');
                if (e) {
                    reject(new Error("Error uploading files", e))
                } else {
                    resolve();
                }
            });
        });
    }

    syncApp(mainjs) {
        let active = false;
        this.syncInProgress.update(x => active = x)
        if (active) {
            console.log("Sync ignored, already active");
            return Promise.resolve();
        }
        this.lastSizeKb = (mainjs.length / 1024);
        this.onLog({ log: "Refreshing Preview..." });
        this.syncInProgress.set(true);
        let devices = [];
        this.connectedDevices.update(x => devices = x);
        let platforms = new Set(devices.map(d => d.platform))
        let syncs = [...platforms].map(platform => this.syncAppForPlatform(mainjs, platform))
        return Promise.all(syncs).finally(() => this.syncInProgress.set(false))
    }

    getInitialFiles(device, mainjs) {
        console.log("Sending initial files!");
        this.lastSizeKb = (mainjs.length / 1024);
        this.onLog({ log: `Preparing new device: '${device.name}'` });
        let files = [
            {
                event: "change",
                file: "package.json",
                binary: false,
                fileContents: `{
                    "main": "app.js"
                }`
            },
            {
                event: "change",
                file: "app.css",
                fileContents: `
                    @import '~nativescript-theme-core/css/core.light.css';
                `
            },
            {
                event: "change",
                file: "app.js",
                binary: false,
                fileContents: mainjs
            }
        ];

        return Promise.resolve({
            files: files,
            platform: device.platform,
            hmrMode: 0,
            deviceId: device.id
        });
    }

    async init(mainjs, onLog) {
        this.onLog = onLog;
        this.previewSdk = await import('nativescript-preview-sdk');
        this.lastSizeKb = (mainjs.length / 1024);
        let callBacks = {
            onLogSdkMessage: (log) => {
                console.log("onLogSdkMessage", log);
            },
            onLogMessage: (log, deviceName, deviceId) => {
                console.log("onLogMessage", log, deviceName, deviceId);
                this.onLog({ log, deviceName, deviceId })
            },
            onRestartMessage: () => {
                console.log("onRestartMessage");
            },
            onUncaughtErrorMessage: () => {
                console.log("onUncaughtErrorMessage");
            },
            onConnectedDevicesChange: (connectedDevices) => console.log("onConnectedDevicesChange", connectedDevices),
            onDeviceConnectedMessage: (deviceConnectedMessage) => console.log("onDeviceConnectedMessage", deviceConnectedMessage),
            onDeviceConnected: (device) => console.log("onDeviceConnected", device),
            onDevicesPresence: (devices) => this.connectedDevices.set(devices),
            onSendingChange: (sending) => this.onLog({ log: sending ? `Sending ${Math.round(this.lastSizeKb)}KB ...` : 'Send complete.' }),
            onBiggerFilesUpload: (filesContent, callback) => this.onBiggerFilesUpload(filesContent, callback)
        }

        let config = {
            pubnubPublishKey: PubnubKeys.PUBLISH_KEY,
            pubnubSubscribeKey: PubnubKeys.SUBSCRIBE_KEY,
            msvKey: "cli",
            msvEnv: "live",
            showLoadingPage: false,
            callbacks: callBacks,
            getInitialFiles: (device) => this.getInitialFiles(device, mainjs)
        }
        try {
            this.messagingService = new this.previewSdk.default.MessagingService()
            this.instanceId = await this.messagingService.initialize(config)
        } catch (e) {
            console.error(e);
            throw e;
        }
    }
}

