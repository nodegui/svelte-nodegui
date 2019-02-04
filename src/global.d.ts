import ViewNode from "./dom/ViewNode";

declare module "tns-core-modules/ui/core/view/view" {
    interface View {
        __SvelteNativeElement__: ViewNode;
    }
}

declare class SvelteComponent {
    constructor(options: { target?: ViewNode, props?: any });
}
