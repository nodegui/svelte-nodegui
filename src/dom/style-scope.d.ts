
declare module "tns-core-modules/ui/styling/style-scope" {
    export class StyleScope {
        _keyframes: { [index: string]: any }
        _css: string
    }

}

declare module "tns-core-modules/ui/styling/css-animation-parser" {
    import { KeyframeDeclaration, KeyframeAnimationInfo } from "tns-core-modules/ui/animation/keyframe-animation";

    export class CssAnimationParser {
        public static keyframeAnimationsFromCSSDeclarations(declarations: Array<KeyframeDeclaration>): Array<KeyframeAnimationInfo>
    }
}