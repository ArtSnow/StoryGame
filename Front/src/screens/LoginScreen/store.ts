import { observable, action, makeObservable } from 'mobx';

export class LoginStore {
    @observable
    name: string

    @observable
    password: string

    constructor () {
        this.name = '';
        this.password = '';

        makeObservable(this);
    }

    @action
    setName(name: string) {
        this.name = name;
    }

    @action
    setPassword(password: string) {
        this.password = password;
    }

    getName = () => this.name;

    getPassword = () => this.password;
}
