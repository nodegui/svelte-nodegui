// declare let __DEV__: boolean|undefined;

export function log(message?: any, ...optionalParams: any[]): void {
    if (!(global as any).__DEV__) return;
    console.log(message, optionalParams);
}

export function warn(message?: any, ...optionalParams: any[]): void {
    if (!(global as any).__DEV__) return;
    console.warn(message, optionalParams);
}

export function error(message?: any, ...optionalParams: any[]): void {
    // if(!(global as any).__DEV__) return;
    console.error(message, optionalParams);
}
