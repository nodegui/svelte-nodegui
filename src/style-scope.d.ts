
declare module "tns-core-modules/ui/styling/style-scope" {
    export function addTaggedAdditionalCSS(cssText: string, tag?: string | Number | Symbol): Boolean;
    export function removeTaggedAdditionalCSS(tag: String | Number | Symbol): Boolean;
}