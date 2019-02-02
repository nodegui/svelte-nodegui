import ViewNode from "./dom/ViewNode";

declare module "tns-core-modules/ui/core/view/view" {
    interface View {
        __SvelteNativeElement__: ViewNode;
    }
}