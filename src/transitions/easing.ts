import { CubicBezierAnimationCurve } from "tns-core-modules/ui/animation";
//similar set to svelte ported to cubic bezier thanks to https://matthewlein.com/tools/ceaser

export const easeInQuad = new CubicBezierAnimationCurve(0.550, 0.085, 0.680, 0.530)
export const easeInCubic = new CubicBezierAnimationCurve(0.550, 0.055, 0.675, 0.190)
export const easeInQuart = new CubicBezierAnimationCurve(0.895, 0.030, 0.685, 0.220)
export const easeInQuint = new CubicBezierAnimationCurve(0.755, 0.050, 0.855, 0.060)
export const easeInSine = new CubicBezierAnimationCurve(0.470, 0.000, 0.745, 0.715)
export const easeInExpo = new CubicBezierAnimationCurve(0.950, 0.050, 0.795, 0.035)
export const easeInCirc = new CubicBezierAnimationCurve(0.600, 0.040, 0.980, 0.335)
export const easeInBack = new CubicBezierAnimationCurve(0.600, -0.280, 0.735, 0.045)

export const easeOutQuad = new CubicBezierAnimationCurve(0.250, 0.460, 0.450, 0.940)
export const easeOutCubic = new CubicBezierAnimationCurve(0.215, 0.610, 0.355, 1.000)
export const easeOutQuart = new CubicBezierAnimationCurve(0.165, 0.840, 0.440, 1.000)
export const easeOutQuint = new CubicBezierAnimationCurve(0.230, 1.000, 0.320, 1.000)
export const easeOutSine = new CubicBezierAnimationCurve(0.390, 0.575, 0.565, 1.000)
export const easeOutExpo = new CubicBezierAnimationCurve(0.190, 1.000, 0.220, 1.000)
export const easeOutCirc = new CubicBezierAnimationCurve(0.075, 0.820, 0.165, 1.000)
export const easeOutBack = new CubicBezierAnimationCurve(0.175, 0.885, 0.320, 1.275)

export const easeInOutQuad = new CubicBezierAnimationCurve(0.455, 0.030, 0.515, 0.955)
export const easeInOutCubic = new CubicBezierAnimationCurve(0.645, 0.045, 0.355, 1.000)
export const easeInOutQuart = new CubicBezierAnimationCurve(0.770, 0.000, 0.175, 1.000)
export const easeInOutQuint = new CubicBezierAnimationCurve(0.860, 0.000, 0.070, 1.000)
export const easeInOutSine = new CubicBezierAnimationCurve(0.445, 0.050, 0.550, 0.950)
export const easeInOutExpo = new CubicBezierAnimationCurve(1.000, 0.000, 0.000, 1.000)
export const easeInOutCirc = new CubicBezierAnimationCurve(0.785, 0.135, 0.150, 0.860)
export const easeInOutBack = new CubicBezierAnimationCurve(0.680, -0.550, 0.265, 1.550)