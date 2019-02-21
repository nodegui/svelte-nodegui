import { topmost, NavigationTransition, Frame, getFrameById, Page, BackstackEntry } from "tns-core-modules/ui/frame/frame";
import FrameElement from "./FrameElement";
import { createElement } from "./basicdom";
import PageElement from "./PageElement";

export type FrameSpec = Frame | FrameElement | string

export interface NavigationOptions {
    page: typeof SvelteComponent;
    props?: any;
    frame?: FrameSpec;

    animated?: boolean;
    backstackVisible?: boolean;
    clearHistory?: boolean;
    transition?: NavigationTransition;
    transitionAndroid?: NavigationTransition;
    transitioniOS?: NavigationTransition;
}

function resolveFrame(frameSpec: FrameSpec): Frame {
    let targetFrame: Frame;
    if (!frameSpec) targetFrame = topmost();
    if (frameSpec instanceof FrameElement) targetFrame = frameSpec.nativeView as Frame;
    if (frameSpec instanceof Frame) targetFrame = frameSpec;
    if (typeof frameSpec == "string") {
        targetFrame = getFrameById(frameSpec)
        if (!targetFrame) console.error(`Navigate could not find frame with id ${frameSpec}`)
    }
    return targetFrame;
}

export function navigate(options: NavigationOptions): SvelteComponent {
    let { frame, page, props = {}, ...navOptions } = options;

    let targetFrame = resolveFrame(frame);

    if (!targetFrame) {
        throw new Error("navigate requires frame option to be a native Frame, a FrameElement, a frame Id, or null")
    }
    if (!page) {
        throw new Error("navigage requires page to be set to the svelte component class that implements the page")
    }

    //perform the navigation by rendering to a dummy node, then obtaining a reference to the root nativeView which should be the page
    let dummy = createElement('fragment');
    let pageInstance = new options.page({ target: dummy, props: props });
    let firstElement = dummy.firstElement();
    if (!(firstElement instanceof PageElement)
        || !(firstElement.nativeView)) {
        throw new Error("navigage requires the page option svelte class to have a page element at the root")
    }
    let nativePage = firstElement.nativeView;

    targetFrame.navigate({
        ...navOptions,
        create: () => nativePage
    });

    return pageInstance;
}

export interface BackNavigationOptions {
    frame?: FrameSpec;
    to?: PageElement;
}

export function goBack(options: BackNavigationOptions = {}) {
    let targetFrame = resolveFrame(options.frame);
    if (!targetFrame) {
        throw new Error("goback requires frame option to be a native Frame, a FrameElement, a frame Id, or null")
    }
    let backStackEntry: BackstackEntry = null;
    if (options.to) {
        backStackEntry = targetFrame.backStack.find(e => e.resolvedPage === options.to.nativeView);
        if (!backStackEntry) {
            throw new Error("Couldn't find the destination page in the frames backstack")
        }
    }
    return targetFrame.goBack(backStackEntry);
}