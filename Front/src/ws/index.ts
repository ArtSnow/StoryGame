import { AddMessageName, AddMessageBody } from './add-message';
import { MessageBody, MessageName } from './message';
import { PlayerBody, PlayerName } from './player';
import { UpdatePlayerPropsBody, UpdatePlayerPropsName } from './update-player-props';

type ReceiveMessagesList = {
    [MessageName]: MessageBody
    [PlayerName]: PlayerBody
};

type SendMessagesList = {
    [AddMessageName]: AddMessageBody
    [UpdatePlayerPropsName]: UpdatePlayerPropsBody
};

type Message = {
    name: string
    body: object
};

function isMessage(obj: any): obj is Message {
    return 'name' in obj && 'body' in obj;
}

type WSManagerProps = {
    id: string
    password: string
};

export class WSManager {
    private WS_URL = 'ws://localhost:8000/ws';
    
    private ws: WebSocket

    private credentials: { id: string, password: string }

    private listeners: Record<string, (message: any) => void>

    constructor (props: WSManagerProps) {
        const { id, password } = props;

        this.listeners = {};
        this.credentials = { id, password };
        this.ws = new WebSocket(this.WS_URL);
        this.ws.addEventListener('message', ({ data }) => {
            const message = JSON.parse(data);

            if (isMessage(message) && message.name in this.listeners) {
                this.listeners[message.name](message.body);
            }
        });
    }

    addListener = <N extends keyof ReceiveMessagesList>(name: N, listener: (body: ReceiveMessagesList[N]) => void) => {
        this.listeners[name] = listener;
    };

    sendMessage = <N extends keyof SendMessagesList>(name: N, body: SendMessagesList[N]) => {
        const message: Message = { name, body };
        this.ws.send(JSON.stringify({
            message,
            credentials: this.credentials,
        }));
    };
}
