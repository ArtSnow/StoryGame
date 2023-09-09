import { observable, action, makeObservable } from 'mobx';

export class LoginStore {
    @observable
    password: string

    constructor () {
        this.password = '';

        makeObservable(this);
    }

    @action
    setPassword(password: string) {
        this.password = password;
    }

    getPassword = () => this.password;
}
