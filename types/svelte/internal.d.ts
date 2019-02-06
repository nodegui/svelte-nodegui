declare module "svelte/internal" {
    interface ComponentInternals {
        callbacks: { [index: string]: ((event: any) => void)[] }
    }
    interface ExposedSvelteComponent {
        $$: ComponentInternals
    }
    
    export let current_component: ExposedSvelteComponent;
    export function flush(): void;
}
