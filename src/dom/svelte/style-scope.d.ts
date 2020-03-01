
declare module "@nativescript/core/ui/styling/style-scope" {
    export class StyleScope {
        _keyframes: { [index: string]: any }
        _css: string
    }

}

declare module "@nativescript/core/ui/styling/css-animation-parser" {
    import { KeyframeDeclaration, KeyframeAnimationInfo } from "@nativescript/core/ui/animation/keyframe-animation";

    export class CssAnimationParser {
        public static keyframeAnimationsFromCSSDeclarations(declarations: Array<KeyframeDeclaration>): Array<KeyframeAnimationInfo>
    }
}