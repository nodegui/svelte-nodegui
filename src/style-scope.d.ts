
declare module "tns-core-modules/ui/styling/style-scope" {
    export function addTaggedAdditionalCSS(cssText: string, tag?: string | Number | Symbol): Boolean;
    export function removeTaggedAdditionalCSS(tag: String | Number | Symbol): Boolean;
}

declare module "tns-core-modules/ui/styling/css-animation-parser" {
    import { KeyframeDeclaration, KeyframeAnimationInfo } from "tns-core-modules/ui/animation/keyframe-animation";

    export class CssAnimationParser {
        public static keyframeAnimationsFromCSSDeclarations(declarations: Array<KeyframeDeclaration>): Array<KeyframeAnimationInfo>
    }
}