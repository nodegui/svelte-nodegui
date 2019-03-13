interface registeredEvent {
    type: string
    handler: ((event: any) => void)
}

export default function proxyEvents(node: any, events: { [index: string]: ((event: any) => void)[] }) {
    console.warn("proxyEvents is deprecated");
    let registeredEvents: registeredEvent[] = [];

    for (let type of Object.keys(events)) {
        let thisType = type;
        let handler = (ev: any) => {
            (events[thisType] || []).forEach(fn => fn(ev));
        }
        node.addEventListener(type, handler);
        registeredEvents.push({ type, handler });
    }

    return {
        destroy() {
            for (let { type, handler } of registeredEvents) {
                node.removeEventListener(type, handler);
            }
        }
    }
}