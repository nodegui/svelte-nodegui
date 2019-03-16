const PubnubKeys = {
    PUBLISH_KEY: "pub-c-d7893276-cc78-4d18-8ab0-becba06e43de",
    SUBSCRIBE_KEY: "sub-c-3dad1ebe-aaa3-11e8-8027-363023237e0b"
}

export class PreviewService {

    constructor() {
        this.messagingService = null;
        this.instanceId = null;
        this.init = this.init.bind(this)
    }

    qrCodeUrl() {
        return `nsplay://boot?instanceId=${this.instanceId}&pKey=${PubnubKeys.PUBLISH_KEY}&sKey=${PubnubKeys.SUBSCRIBE_KEY}&template=play-ng`
    }

    async init() {
        let previewSdk = await import('nativescript-preview-sdk');

        let callBacks = {
            onLogSdkMessage: (log) => {
                console.log("onLogSdkMessage", log);
            },
            onLogMessage: (log, deviceName, deviceId) => {
                console.log("onLogMessage", log, deviceName, deviceId);
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
            onDevicesPresence: (devices) => console.log("onDevicesPresence", devices),
            onSendingChange: (sending) => console.log("onSendingChange", sending),
            onBiggerFilesUpload: async (filesContent, callback) => console.log("onBiggerFilesUpload", filesContent)
        }

        let config = {
            pubnubPublishKey: PubnubKeys.PUBLISH_KEY,
            pubnubSubscribeKey: PubnubKeys.SUBSCRIBE_KEY,
            msvKey: "cli",
            msvEnv: "live",
            showLoadingPage: false,
            callbacks: callBacks,
            getInitialFiles: (device) => (console.log("get initial files, device"))
        }
        this.messagingService = new previewSdk.default.MessagingService()
        this.instanceId = await this.messagingService.initialize(config)
    }
}

