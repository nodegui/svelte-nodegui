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
        this.lastLogMessage = writable(null);
        this.syncInProgress = writable(false);
    }

    qrCodeUrl() {
        return `nsplay://boot?instanceId=${this.instanceId}&pKey=${PubnubKeys.PUBLISH_KEY}&sKey=${PubnubKeys.SUBSCRIBE_KEY}&template=play-ng`
    }

    async onBiggerFilesUpload(filesContent, callback) {
        const uploadResponse = await fetch("/repl/syncfiles", {
            method: "POST",
            body: new Blob([pako.gzip(filesContent)]),
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
        return this.messagingService.applyChanges(this.instanceId, {
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
            throw new Error("Error uploading files", e);
        });
    }

    syncApp(mainjs) {
        let active = false;
        this.syncInProgress.update(x => active = x);
        if (active) {
            console.warn("Sync ignored, already active");
            return Promise.resolve();
        }
        this.syncInProgress.set(true);
        let devices = [];
        this.connectedDevices.update(x => devices = x);
        let platforms = new Set(devices.map(d => d.platform))
        let syncs = [...platforms].map(platform => this.syncAppForPlatform(mainjs, platform))
        return Promise.all(syncs).finally(() => this.syncInProgress.set(false))
    }

    getInitialFiles(device, mainjs) {
        console.log("Sending initial files!");
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

    async init(mainjs) {
        this.previewSdk = await import('nativescript-preview-sdk');

        let callBacks = {
            onLogSdkMessage: (log) => {
                console.log("onLogSdkMessage", log);
            },
            onLogMessage: (log, deviceName, deviceId) => {
                console.log("onLogMessage", log, deviceName, deviceId);
                this.lastLogMessage.set({ log, deviceName, deviceId })
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
            onSendingChange: (sending) => console.log("onSendingChange", sending),
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

