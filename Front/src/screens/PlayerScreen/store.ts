import { makeObservable } from 'mobx';
import { BaseStore } from '../base-store';

type PlayerStoreProps = {
    getId(): string
    getPassword(): string
};

export class PlayerStore extends BaseStore {
    constructor (props: PlayerStoreProps) {
        super(props);

        makeObservable(this);
    }
}
