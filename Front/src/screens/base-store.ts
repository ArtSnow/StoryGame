import { observable, action, makeObservable } from 'mobx';
import { WSManager } from '../ws';
import { MessageBody } from '../ws/message';
import { Monster, Player } from '../service/state';
import APIService from '../service';

type BaseStoreProps = {
    getId(): string
    getPassword(): string
};

export abstract class BaseStore {
    protected id: string;
    protected password: string;
    protected wsManager!: WSManager;

    @observable
    protected loading: boolean;

    @observable
    protected error: string | null;

    @observable
    protected messages: MessageBody[];

    @observable
    protected players: Player[];

    @observable
    protected monster: Monster | null;

    constructor (props: BaseStoreProps) {
        this.id = props.getId();
        this.password = props.getPassword();
        this.loading = true;
        this.error = null;
        this.messages = [];
        this.players = [];
        this.monster = null;

        this.init();

        makeObservable(this);
    }

    protected init = async () => {
        this.setLoading(true);
        const response = await APIService.makeRequest('/state', { password: this.password });

        if ('error' in response) {
            this.setError(response.error);
        } else {
            this.setPlayers(response.players);
            this.setMonster(response.monster);
            this.setError(null);
            this.initWS();
        }

        this.setLoading(false);
    };

    protected initWS = () => {
        this.wsManager = new WSManager({ id: this.id, password: this.password });

        this.wsManager.addListener('msg', (body) => {
            this.addMessage(body);
        });

        this.wsManager.addListener('player', (body) => {
            if (!this.players.find((el) => el.id === body.id)) {
                this.addPlayer(body);
                return;
            }

            this.players = this.players.map((el) => {
                if (el.id === body.id) {
                    return el;
                }

                return body;
            });
        });
    };

    @action
    protected setLoading = (loading: boolean) => {
        this.loading = loading;
    };

    @action
    protected setError = (error: string | null) => {
        this.error = error;
    };

    @action
    protected addMessage = (message: MessageBody) => this.messages.push(message);

    @action
    protected addPlayer = (player: Player) => this.players.push(player);

    @action
    protected setPlayers = (players: Player[]) => {
        this.players = players;
    };

    @action
    protected setMonster = (monster: Monster | null) => {
        this.monster = monster;
    };

    getMessages = () => this.messages;

    getPlayers = () => this.players;

    getLoading = () => this.loading;

    getError = () => this.error;

    getMonster = () => this.monster;
}
