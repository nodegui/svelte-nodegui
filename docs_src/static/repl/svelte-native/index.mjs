import { on, launchEvent, run } from 'tns-core-modules/application';
import { initializeDom, createElement, navigate } from './dom';
export { navigate, goBack, showModal, closeModal } from './dom';

function svelteNative(startPage, data) {
    initializeDom();
    //setup a frame so we always have somewhere to hang our css
    let rootFrame = createElement('frame');
    rootFrame.setAttribute("id", "app-root-frame");
    let pageInstance = navigate({
        page: startPage,
        props: data || {},
        frame: rootFrame
    });
    return new Promise((resolve, reject) => {
        //wait for launch
        on(launchEvent, () => {
            console.log("Application Launched");
            resolve(pageInstance);
        });
        try {
            run({ create: () => rootFrame.nativeView });
        }
        catch (e) {
            reject(e);
        }
    });
}

export { svelteNative };
