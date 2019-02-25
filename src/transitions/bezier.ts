
export interface CubicBezier {
	x0: number
	y0: number
	x1: number
	y1: number
	x2: number
	y2: number
	x3: number
	y3: number
}

// turns an intro curve into an outro curve by mirroring and flipping
// that is a curve that starts slow from 0 then accelerates as it gets to 1
// will become a curve that starts fast and decelerates as it gets to 1
// eg an animation that takes 1 second to get to half opacity but only .5 to get to full opacity
// we could create a reverse animation from full opacity to zero which would only take 0.5 seconds to get to half opacity
// by reversing the curve used for the fade in.
export function reverseCurve(curve: CubicBezier): CubicBezier {
	let {
		x0, y0, x1, y1, x2, y2, x3, y3
	} = curve;

	return {
		x3: x3 - x0, x2: x3 - x1, x1: x3 - x2, x0: x3 - x3,
		y3: y3 - y0, y2: y3 - y1, y1: y3 - y2, y0: y3 - y3
	}
}

//scales a curve so that the start point is at 0,0 and the end point is at 1,1
export function normalizeCurve(curve: CubicBezier): CubicBezier {
	let {
		x0, y0, x1, y1, x2, y2, x3, y3
	} = curve;

	//move x0,y0 to origin
	let tx = x0;
	let ty = Math.min(y0, y3);

	let scale = Math.abs(x3 - x0);
	let scaley = Math.abs(y3 - y0);
	return {
		x0: (x0 - tx) / scale, x1: (x1 - tx) / scale, x2: (x2 - tx) / scale, x3: (x3 - tx) / scale,
		y0: (y0 - ty) / scaley, y1: (y1 - ty) / scaley, y2: (y2 - ty) / scaley, y3: (y3 - ty) / scaley
	}
}
// this uses the bezier equation to return the value for x at t (not to be confused with time, in animations time is x, t is more like distance along the curve )
// x(t)= x0(1−t)^3 + 3*x1*t*(1−t)^2+ 3*x2*t^2*(1−t) + x3*t^3
function bezierXatT(curve: CubicBezier, t: number): number {
	return curve.x0 * Math.pow(1 - t, 3) + 3 * curve.x1 * t * Math.pow(1 - t, 2) + 3 * curve.x2 * Math.pow(t, 2) * (1 - t) + curve.x3 * Math.pow(t, 3);
}

// Find with t applied to the bezier equation gives us the supplied X 
// the same way chrome does it: iterative bisection!
function tValueForX(curve: CubicBezier, x: number): number {
	let t0 = 0.0;
	let t1 = 1.0;
	let t2 = x;
	const epsilon = 0.0001
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
export function partialCurveFrom(curve: CubicBezier, xstart: number, xend: number) {
	//Using https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm
	let t0 = xstart ? tValueForX(curve, xstart) : 0;
	let t1 = xend != 1 ? tValueForX(curve, xend) : 1;

	let u0 = 1 - t0;
	let u1 = 1 - t1;

	let r: CubicBezier = {} as CubicBezier;
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

export function animation_curve(cpx1: number, cpy1: number, cpx2: number, cpy2: number): CubicBezier {
	return {
		x0: 0, y0: 0,
		x1: cpx1, y1: cpy1,
		x2: cpx2, y2: cpy2,
		x3: 1, y3: 1
	}
}

export let ease_in = animation_curve(0.42, 0, 1, 1);
export let ease_out = animation_curve(0, 0, 0.58, 1);
export let ease_in_out = animation_curve(0.42, 0, 0.58, 1);
export let ease = animation_curve(0.25, 0.1, 0.25, 1);
export let linear = animation_curve(0.5, 0.5, 0.5, 0.5);
