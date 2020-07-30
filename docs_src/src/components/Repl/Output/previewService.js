import { writable } from 'svelte/store';

const PubnubKeys = {
    PUBLISH_KEY: "pub-c-b5343165-e988-4a8d-b415-6166eda14a91",
    SUBSCRIBE_KEY: "sub-c-459b84a2-dcdf-11e9-9067-a65ad2c362ff"
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
                hmrMode: 1,
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
                    "main": "main.js"
                }`
            },
            {
                event: "change",
                file: "app.css",
                binary: false,
                fileContents: `
                    @import '~@nativescript/theme/css/core.light.css';
                `
            },
            {
                event: "change",
                file: "main.js",
                binary: false,
                fileContents: `
require('@nativescript/core/globals')


let app = global.loadModule('./app.js')

global.__onLiveSyncCore = () => {
    console.log('reloading app');
    var fs = require("@nativescript/core/file-system");
    const applicationFiles = fs.knownFolders.currentApp();
    const appjs = applicationFiles.getFile('app.js').readTextSync();
    let refreshed_app = Function( "let exports={};" + appjs +";return exports")();
    console.log(refreshed_app);
    refreshed_app.reload();
}


app.start();

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
            hmrMode: 1,
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

