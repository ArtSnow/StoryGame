import { makeObservable } from 'mobx';
import { Property } from '../../service/state';
import { BaseStore } from '../base-store';

type MasterStoreProps = {
    getId(): string
    getPassword(): string
};

export class MasterStore extends BaseStore {
    constructor (props: MasterStoreProps) {
        super(props);

        makeObservable(this);
    }

    createNewMessage = (message: string) => this.wsManager.sendMessage('add-msg', { msg: message });

    savePlayerProps = (playerId: string, props: Property[]) => {
        this.wsManager.sendMessage('update-player-props', { id: playerId, properties: props });
    };
}
