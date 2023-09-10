import { observable, action, makeObservable } from 'mobx';
import APIService from '../../service';
import { Role } from '../../service/login';

export class LoginStore {
    @observable
    private name: string

    @observable
    private password: string

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

    login = async (image: string): Promise<{ id: string, role: Role, password: string } | { error: string }> => {
        const password = this.password;

        const response = await APIService.makeRequest('/login', {
            name: this.name,
            password,
            image,
        });

        if ('error' in response) {
            return { error: response.error };
        }

        return {
            id: response.id,
            role: response.role,
            password,
        };
    }
}
