declare module 'turtlequeue' {

    type Location = { lat: number; lon: number };

    type Status =
        //
        | "disconnected"

        // the server answered and the handshake happened
        | "connected"

        // the server rejected the credentials
        | "authError"

        // the server authorised the credentials
        | "ready";


    type Message = {
        channel?: string
        payload: any
        location: Location
    }

    interface MakeParams {
        host?: string,
        type?: string,
        protocol?: string
    }

    export namespace create {
        export function make(MakeParams): any;
    }


    interface SubscribeOptions {
        id?: string,
        channel: string,
        location?: Location
    }

    interface PublishOptions {
        channel: string,
        location?: Location,
        payload?: any
    }

    interface TurtleQueue {
        create: function
        connect: function
        publish: function
        subscribe: function
        unsubscribe: function

        on: function
    }


    interface callback {
        (
            err: Error | null,
            data: any,
            meta, any
        )
    }

    interface SubscribeCallback {
        err: Error | null,
        data: any,
        meta, any
    }

    interface PublishCallback {
        err: Map,
        data: any,
        metadata, any
    }
}
