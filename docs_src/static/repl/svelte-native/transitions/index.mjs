import { CubicBezierAnimationCurve } from 'tns-core-modules/ui/animation';
import { AnimationCurve } from 'tns-core-modules/ui/enums';

// turns an intro curve into an outro curve by mirroring and flipping
// that is a curve that starts slow from 0 then accelerates as it gets to 1
// will become a curve that starts fast and decelerates as it gets to 1
// eg an animation that takes 1 second to get to half opacity but only .5 to get to full opacity
// we could create a reverse animation from full opacity to zero which would only take 0.5 seconds to get to half opacity
// by reversing the curve used for the fade in.
function reverseCurve(curve) {
    let { x0, y0, x1, y1, x2, y2, x3, y3 } = curve;
    return {
        x3: x3 - x0, x2: x3 - x1, x1: x3 - x2, x0: x3 - x3,
        y3: y3 - y0, y2: y3 - y1, y1: y3 - y2, y0: y3 - y3
    };
}
//scales a curve so that the start point is at 0,0 and the end point is at 1,1
function normalizeCurve(curve) {
    let { x0, y0, x1, y1, x2, y2, x3, y3 } = curve;
    //move x0,y0 to origin
    let tx = x0;
    let ty = Math.min(y0, y3);
    let scale = Math.abs(x3 - x0);
    let scaley = Math.abs(y3 - y0);
    return {
        x0: (x0 - tx) / scale, x1: (x1 - tx) / scale, x2: (x2 - tx) / scale, x3: (x3 - tx) / scale,
        y0: (y0 - ty) / scaley, y1: (y1 - ty) / scaley, y2: (y2 - ty) / scaley, y3: (y3 - ty) / scaley
    };
}
// this uses the bezier equation to return the value for x at t (not to be confused with time, in animations time is x, t is more like distance along the curve )
// x(t)= x0(1−t)^3 + 3*x1*t*(1−t)^2+ 3*x2*t^2*(1−t) + x3*t^3
function bezierXatT(curve, t) {
    return curve.x0 * Math.pow(1 - t, 3) + 3 * curve.x1 * t * Math.pow(1 - t, 2) + 3 * curve.x2 * Math.pow(t, 2) * (1 - t) + curve.x3 * Math.pow(t, 3);
}
// Find with t applied to the bezier equation gives us the supplied X 
// the same way chrome does it: iterative bisection!
function tValueForX(curve, x) {
    let t0 = 0.0;
    let t1 = 1.0;
    let t2 = x;
    const epsilon = 0.0001;
    while (t0 < t1) {
        let x2 = bezierXatT(curve, t2);
        if (Math.abs(x2 - x) < epsilon)
            return t2;
        if (x > x2)
            t0 = t2;
        else
            t1 = t2;
        t2 = (t1 - t0) * 0.5 + t0;
    }
}
// Takes a segment of a the line made by a bezier curve between x values
// eg, if it represented an animation we could get the curve that represents half the animation (from x=0 to x=0.5)
function partialCurveFrom(curve, xstart, xend) {
    //Using https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm
    let t0 = xstart ? tValueForX(curve, xstart) : 0;
    let t1 = xend != 1 ? tValueForX(curve, xend) : 1;
    let u0 = 1 - t0;
    let u1 = 1 - t1;
    let r = {};
    let c = curve;
    r.x0 = u0 * u0 * u0 * c.x0 + (t0 * u0 * u0 + u0 * t0 * u0 + u0 * u0 * t0) * c.x1 + (t0 * t0 * u0 + u0 * t0 * t0 + t0 * u0 * t0) * c.x2 + t0 * t0 * t0 * c.x3;
    r.y0 = u0 * u0 * u0 * c.y0 + (t0 * u0 * u0 + u0 * t0 * u0 + u0 * u0 * t0) * c.y1 + (t0 * t0 * u0 + u0 * t0 * t0 + t0 * u0 * t0) * c.y2 + t0 * t0 * t0 * c.y3;
    r.x1 = u0 * u0 * u1 * c.x0 + (t0 * u0 * u1 + u0 * t0 * u1 + u0 * u0 * t1) * c.x1 + (t0 * t0 * u1 + u0 * t0 * t1 + t0 * u0 * t1) * c.x2 + t0 * t0 * t1 * c.x3;
    r.y1 = u0 * u0 * u1 * c.y0 + (t0 * u0 * u1 + u0 * t0 * u1 + u0 * u0 * t1) * c.y1 + (t0 * t0 * u1 + u0 * t0 * t1 + t0 * u0 * t1) * c.y2 + t0 * t0 * t1 * c.y3;
    r.x2 = u0 * u1 * u1 * c.x0 + (t0 * u1 * u1 + u0 * t1 * u1 + u0 * u1 * t1) * c.x1 + (t0 * t1 * u1 + u0 * t1 * t1 + t0 * u1 * t1) * c.x2 + t0 * t1 * t1 * c.x3;
    r.y2 = u0 * u1 * u1 * c.y0 + (t0 * u1 * u1 + u0 * t1 * u1 + u0 * u1 * t1) * c.y1 + (t0 * t1 * u1 + u0 * t1 * t1 + t0 * u1 * t1) * c.y2 + t0 * t1 * t1 * c.y3;
    r.x3 = u1 * u1 * u1 * c.x0 + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * c.x1 + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * c.x2 + t1 * t1 * t1 * c.x3;
    r.y3 = u1 * u1 * u1 * c.y0 + (t1 * u1 * u1 + u1 * t1 * u1 + u1 * u1 * t1) * c.y1 + (t1 * t1 * u1 + u1 * t1 * t1 + t1 * u1 * t1) * c.y2 + t1 * t1 * t1 * c.y3;
    return r;
}
function animation_curve(cpx1, cpy1, cpx2, cpy2) {
    return {
        x0: 0, y0: 0,
        x1: cpx1, y1: cpy1,
        x2: cpx2, y2: cpy2,
        x3: 1, y3: 1
    };
}
let ease_in = animation_curve(0.42, 0, 1, 1);
let ease_out = animation_curve(0, 0, 0.58, 1);
let ease_in_out = animation_curve(0.42, 0, 0.58, 1);
let ease = animation_curve(0.25, 0.1, 0.25, 1);
let linear = animation_curve(0.5, 0.5, 0.5, 0.5);

//similar set to svelte ported to cubic bezier thanks to https://matthewlein.com/tools/ceaser
const easeInQuad = new CubicBezierAnimationCurve(0.550, 0.085, 0.680, 0.530);
const easeInCubic = new CubicBezierAnimationCurve(0.550, 0.055, 0.675, 0.190);
const easeInQuart = new CubicBezierAnimationCurve(0.895, 0.030, 0.685, 0.220);
const easeInQuint = new CubicBezierAnimationCurve(0.755, 0.050, 0.855, 0.060);
const easeInSine = new CubicBezierAnimationCurve(0.470, 0.000, 0.745, 0.715);
const easeInExpo = new CubicBezierAnimationCurve(0.950, 0.050, 0.795, 0.035);
const easeInCirc = new CubicBezierAnimationCurve(0.600, 0.040, 0.980, 0.335);
const easeInBack = new CubicBezierAnimationCurve(0.600, -0.280, 0.735, 0.045);
const easeOutQuad = new CubicBezierAnimationCurve(0.250, 0.460, 0.450, 0.940);
const easeOutCubic = new CubicBezierAnimationCurve(0.215, 0.610, 0.355, 1.000);
const easeOutQuart = new CubicBezierAnimationCurve(0.165, 0.840, 0.440, 1.000);
const easeOutQuint = new CubicBezierAnimationCurve(0.230, 1.000, 0.320, 1.000);
const easeOutSine = new CubicBezierAnimationCurve(0.390, 0.575, 0.565, 1.000);
const easeOutExpo = new CubicBezierAnimationCurve(0.190, 1.000, 0.220, 1.000);
const easeOutCirc = new CubicBezierAnimationCurve(0.075, 0.820, 0.165, 1.000);
const easeOutBack = new CubicBezierAnimationCurve(0.175, 0.885, 0.320, 1.275);
const easeInOutQuad = new CubicBezierAnimationCurve(0.455, 0.030, 0.515, 0.955);
const easeInOutCubic = new CubicBezierAnimationCurve(0.645, 0.045, 0.355, 1.000);
const easeInOutQuart = new CubicBezierAnimationCurve(0.770, 0.000, 0.175, 1.000);
const easeInOutQuint = new CubicBezierAnimationCurve(0.860, 0.000, 0.070, 1.000);
const easeInOutSine = new CubicBezierAnimationCurve(0.445, 0.050, 0.550, 0.950);
const easeInOutExpo = new CubicBezierAnimationCurve(1.000, 0.000, 0.000, 1.000);
const easeInOutCirc = new CubicBezierAnimationCurve(0.785, 0.135, 0.150, 0.860);
const easeInOutBack = new CubicBezierAnimationCurve(0.680, -0.550, 0.265, 1.550);

var easing = /*#__PURE__*/Object.freeze({
	easeInQuad: easeInQuad,
	easeInCubic: easeInCubic,
	easeInQuart: easeInQuart,
	easeInQuint: easeInQuint,
	easeInSine: easeInSine,
	easeInExpo: easeInExpo,
	easeInCirc: easeInCirc,
	easeInBack: easeInBack,
	easeOutQuad: easeOutQuad,
	easeOutCubic: easeOutCubic,
	easeOutQuart: easeOutQuart,
	easeOutQuint: easeOutQuint,
	easeOutSine: easeOutSine,
	easeOutExpo: easeOutExpo,
	easeOutCirc: easeOutCirc,
	easeOutBack: easeOutBack,
	easeInOutQuad: easeInOutQuad,
	easeInOutCubic: easeInOutCubic,
	easeInOutQuart: easeInOutQuart,
	easeInOutQuint: easeInOutQuint,
	easeInOutSine: easeInOutSine,
	easeInOutExpo: easeInOutExpo,
	easeInOutCirc: easeInOutCirc,
	easeInOutBack: easeInOutBack
});

var AnimationDirection;
(function (AnimationDirection) {
    AnimationDirection[AnimationDirection["Unknown"] = 0] = "Unknown";
    AnimationDirection[AnimationDirection["In"] = 1] = "In";
    AnimationDirection[AnimationDirection["Out"] = 2] = "Out";
})(AnimationDirection || (AnimationDirection = {}));
function asSvelteTransition(node, delay = 0, duration = 300, curve = AnimationCurve.linear, nativeAnimationProps) {
    let svelteAnim = {
        delay: delay,
        duration: duration,
    };
    let svelteCurve;
    if (typeof curve == "string") {
        switch (curve) {
            case AnimationCurve.ease:
                svelteCurve = ease;
                break;
            case AnimationCurve.easeIn:
                svelteCurve = ease_in;
                break;
            case AnimationCurve.easeOut:
                svelteCurve = ease_out;
                break;
            case AnimationCurve.easeInOut:
                svelteCurve = ease_in_out;
                break;
            case AnimationCurve.linear:
                svelteCurve = linear;
                break;
            default:
                console.warn("Unsupported nativescript animation name, reverting to linear");
                svelteCurve = linear;
        }
    }
    if (curve instanceof CubicBezierAnimationCurve) {
        //convert to our bezier format
        svelteCurve = animation_curve(curve.x1, curve.y1, curve.x2, curve.y2);
    }
    //default to linear
    if (!curve) {
        svelteCurve = linear;
    }
    let direction = AnimationDirection.Unknown;
    let animation = null;
    let last_t = -1;
    const cancelNativeAnimation = () => {
        if (animation && animation.isPlaying) {
            //  console.log("cancelling animation on ", node);
            let oldanimation = animation;
            animation = null;
            oldanimation.cancel();
        }
        animation = null;
    };
    //Tick is our hook into sveltes transition system. We want to detect a forward or backward animation,
    //determine the end value, and do a single native animation for the entire duration.
    //the spanner in the works is that there is a transistion type (in_out) that can stop mid animation and play in reverse
    //we need to do some math to generate a curve that can apply to the shortened time that mirrors the intro that has already played.
    // we note the following svelte behaviour:
    // "in" animations always get an explicit tick(0, 1) even before any delay.
    // "out" animations have no such quality, therefore we can expect that if we have not been initialized, and get a t=0 we are an Intro
    svelteAnim.tick = (t) => {
        //when you cancel an animation, it appears to set the values back to the start. we use this to reapply them at the given time.
        function applyAnimAtTime(time) {
            let animDef = nativeAnimationProps(time);
            if (typeof animDef.opacity !== 'undefined')
                node.nativeView.opacity = animDef.opacity;
            if (typeof animDef.backgroundColor != 'undefined')
                node.nativeView.backgroundColor = animDef.backgroundColor;
            if (typeof animDef.rotate != 'undefined')
                node.nativeView.rotate = animDef.rotate;
            if (typeof animDef.scale != 'undefined') {
                node.nativeView.scaleX = animDef.scale.x;
                node.nativeView.scaleY = animDef.scale.y;
            }
            if (typeof animDef.translate != 'undefined') {
                node.nativeView.translateX = animDef.translate.x;
                node.nativeView.translateY = animDef.translate.y;
            }
        }
        //our first frame! are we an in or out
        if (direction == AnimationDirection.Unknown) {
            //intro: do an initialize
            if (t === 0) {
                applyAnimAtTime(0);
                direction = AnimationDirection.In;
                last_t = 0;
                //   console.log("forward animation detected!", node);
                //don't start our full animation yet since this is just the init frame, and there will be a delay. so wait for next frame
                return;
            }
            else {
                //we must be an outro since all intros get a t==0
                //  console.log("reverse animation detected!", node);
                direction = AnimationDirection.Out;
                last_t = t;
            }
        }
        //have we changed direction?
        if (direction == AnimationDirection.In && last_t > t) {
            // console.log("animation changed direction (In -> Out)", t, node);
            direction = AnimationDirection.Out;
            cancelNativeAnimation();
            applyAnimAtTime(t);
        }
        if (direction == AnimationDirection.Out && last_t < t) {
            //    console.log("animation changed direction (Out -> In)", t, node);
            direction = AnimationDirection.In;
            cancelNativeAnimation();
            applyAnimAtTime(t);
        }
        last_t = t;
        if (!animation) {
            //create a new animation that will cover us from now to either t=duration or t=0
            let target_t = (direction == AnimationDirection.In) ? 1 : 0;
            let animProps = nativeAnimationProps(target_t);
            let nsAnimation = Object.assign({}, animProps);
            nsAnimation.delay = 0;
            if (direction == AnimationDirection.Out) {
                //we need to play in reverse, and we might not be playing the whole thing
                let forwardCurve = t == 1 ? svelteCurve : partialCurveFrom(svelteCurve, 0, t);
                let finalCurve = normalizeCurve(reverseCurve(forwardCurve));
                nsAnimation.curve = AnimationCurve.cubicBezier(finalCurve.x1, finalCurve.y1, finalCurve.x2, finalCurve.y2);
                nsAnimation.duration = t * duration;
            }
            else {
                //we might be starting from halfway (intro->outro-intro again)
                let forwardCurve = t == 0 ? svelteCurve : partialCurveFrom(svelteCurve, t, 1);
                let finalCurve = normalizeCurve(forwardCurve);
                nsAnimation.curve = AnimationCurve.cubicBezier(finalCurve.x1, finalCurve.y1, finalCurve.x2, finalCurve.y2);
                nsAnimation.duration = (1 - t) * duration;
            }
            //console.log("animation created", t, (direction == AnimationDirection.In) ? "Intro" : "Outro", nsAnimation, node);
            // kick it off
            animation = node.nativeView.createAnimation(nsAnimation);
            animation.play();
        }
    };
    return svelteAnim;
}
/* ported from svelte transitions */
function fade(node, { delay = 0, duration = 400 }) {
    const o = node.nativeView.opacity;
    return asSvelteTransition(node, delay, duration, AnimationCurve.linear, (t) => ({
        opacity: t * o
    }));
}
function fly(node, { delay = 0, duration = 400, easing = AnimationCurve.easeOut, x = 0, y = 0 }) {
    const opacity = node.nativeView.opacity;
    const translateX = node.nativeView.translateX;
    const translateY = node.nativeView.translateY;
    return asSvelteTransition(node, delay, duration, easing, (t) => ({
        opacity: t * opacity,
        translate: {
            x: translateX + (1 - t) * x,
            y: translateY + (1 - t) * y
        }
    }));
}
function slide(node, { delay = 0, duration = 400, easing = AnimationCurve.easeOut }) {
    const height = node.nativeView.effectiveHeight;
    const scaleX = node.nativeView.scaleX;
    const scaleY = node.nativeView.scaleY;
    const translateX = node.nativeView.translateX;
    const translateY = node.nativeView.translateY;
    return asSvelteTransition(node, delay, duration, easing, t => ({
        scale: {
            x: scaleX,
            y: (1 - t) * scaleY
        },
        translate: {
            x: translateX,
            y: translateY - t * 0.05 * height
        }
    }));
}

export { asSvelteTransition, fade, fly, slide, easing as easings };
