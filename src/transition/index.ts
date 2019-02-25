import { NativeElementNode } from "../dom";
import { AnimationDefinition } from "tns-core-modules/ui/animation/animation";

enum AnimationDirection { Unknown, In, Out }
export function asSvelteTransition(node: NativeElementNode, nativeAnimation: (t: number) => AnimationDefinition) {

    let svelteAnim: any = {}
    let info = nativeAnimation(0);

    if (info.delay)
        svelteAnim.delay = info.delay

    svelteAnim.duration = info.duration || 300;



    let direction = AnimationDirection.Unknown
    let animation: Animation = null;
    let intro_initialized = false;
    svelteAnim.tick = (t: number) => {

        if (t === 0 && AnimationDirection.Out)

            if (direction == AnimationDirection.Unknown) {
                direction = (t > 0.5) ? direction = AnimationDirection.Out : AnimationDirection.In
            }
        if (t === 0 && !intro_initialized && !animation) {
            //we are an intro and are just setting up
            //TODO just apply the values instead of "animating for 1ms"
            let animDef = nativeAnimation(0);
            node.nativeView.animate({ ...animDef, delay: 0, duration: 1 })
            intro_initialized = true;
            return;
        }

        // TODO 
        // convert the easing into a cubicBezier for the animation (https://docs.nativescript.org/api-reference/modules/_ui_enums_.animationcurve#cubicBezier)
        // use the functions in the bezier.ts file to invert it and slice it etc
        // eg normalizeCurve(reverseCurve(partialCurveFrom(curve, startTime, endTime)))

    }

}
/* imported from svelte for easy ref while coding

export function fade(node: NativeElementNode, {
    delay = 0,
    duration = 400
}) {
    const o = node.nativeView.opacity;

    return {
        delay,
        duration,
        css: t => `opacity: ${t * o}`
    };
}

export function fly(node, {
    delay = 0,
    duration = 400,
    easing = cubicOut,
    x = 0,
    y = 0
}) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const transform = style.transform === 'none' ? '' : style.transform;

    return {
        delay,
        duration,
        easing,
        css: t => `
			transform: ${transform} translate(${(1 - t) * x}px, ${(1 - t) * y}px);
			opacity: ${t * opacity}`
    };
}

export function slide(node, {
    delay = 0,
    duration = 400,
    easing = cubicOut
}) {
    const style = getComputedStyle(node);
    const opacity = +style.opacity;
    const height = parseFloat(style.height);
    const padding_top = parseFloat(style.paddingTop);
    const padding_bottom = parseFloat(style.paddingBottom);
    const margin_top = parseFloat(style.marginTop);
    const margin_bottom = parseFloat(style.marginBottom);
    const border_top_width = parseFloat(style.borderTopWidth);
    const border_bottom_width = parseFloat(style.borderBottomWidth);

    return {
        delay,
        duration,
        easing,
        css: t =>
            `overflow: hidden;` +
            `opacity: ${Math.min(t * 20, 1) * opacity};` +
            `height: ${t * height}px;` +
            `padding-top: ${t * padding_top}px;` +
            `padding-bottom: ${t * padding_bottom}px;` +
            `margin-top: ${t * margin_top}px;` +
            `margin-bottom: ${t * margin_bottom}px;` +
            `border-top-width: ${t * border_top_width}px;` +
            `border-bottom-width: ${t * border_bottom_width}px;`
    };
}
*/