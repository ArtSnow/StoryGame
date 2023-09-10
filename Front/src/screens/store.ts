import { observable, action, makeObservable } from 'mobx';
import { Role } from '../service/login';

export class GeneralStore {
    @observable
    private id: string

    @observable
    private role: Role | null

    @observable
    private password: string

    constructor () {
        this.id = '';
        this.role = null;
        this.password = '';

        makeObservable(this);

    }

    getId = () => this.id;

    getRole = () => this.role;

    getPassword = () => this.password;

    @action
    setId = (id: string) => {
        this.id = id;
    }

    @action
    setRole = (role: Role) => {
        this.role = role;
    }

    @action
    setPassword = (password: string) => {
        this.password = password;
    }

    @action
    join = (props: { id: string, password: string, role: Role }) => {
        const { id, password, role } = props;

        this.setId(id);
        this.setRole(role);
        this.setPassword(password);
    };
}
