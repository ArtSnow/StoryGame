import { observable, action, makeObservable } from 'mobx';
import { WSManager } from '../../ws';
import { MessageBody } from '../../ws/message';
import { Monster, Player } from '../../service/state';
import APIService from '../../service';

type MasterStoreProps = {
    getId(): string
    getPassword(): string
};

export class MasterStore {
    private id: string;
    private password: string;
    private wsManager: WSManager;

    @observable
    private loading: boolean;

    @observable
    private error: string | null;

    @observable
    private messages: MessageBody[];

    @observable
    private players: Player[];

    @observable
    private monster: Monster | null;

    constructor (props: MasterStoreProps) {
        this.id = props.getId();
        this.password = props.getPassword();
        this.loading = true;
        this.error = null;
        this.messages = [];
        this.players = [];
        this.monster = null;
        this.wsManager = new WSManager({ id: this.id, password: this.password });

        this.wsManager.addListener('msg', (body) => {
            this.addMessage(body);
        });
        this.wsManager.addListener('player', (body) => {
            this.addPlayer(body);
        });

        this.init();

        makeObservable(this);
    }

    private init = async () => {
        this.setLoading(true);
        const response = await APIService.makeRequest('/state', { password: this.password });

        if ('error' in response) {
            this.setError(response.error);
        } else {
            this.setPlayers(response.players);
            this.setMonster(response.monster);
            this.setError(null);
        }

        this.setLoading(false);
    };

    @action
    private setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    @action
    private setError = (error: string | null) => {
        this.error = error;
    };

    @action
    private addMessage = (message: MessageBody) => this.messages.push(message);

    @action
    private addPlayer = (player: Player) => this.players.push(player);

    @action
    private setPlayers = (players: Player[]) => {
        this.players = players;
    };

    @action
    private setMonster = (monster: Monster | null) => {
        this.monster = monster;
    };

    sendNewMessage = (message: string) => this.wsManager.sendMessage('add-msg', { msg: message });

    sendNewPlayer = (message: string) => this.wsManager.sendMessage('add-msg', { msg: message });

    getMessages = () => this.messages;

    getPlayers = () => this.players;

    getLoading = () => this.loading;

    getError = () => this.error;

    getMonster = () => this.monster;
}
