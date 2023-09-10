export const StateEndpoint = '/state';

export type Property = {
    id: string
    content: string
};

export type Player = {
    id: string
    name: string
    img: string
    hp: number
    properties: Property[]
};

export type Monster = {
    img: string
};

export type StateRequest = {
    password: string
};

export type StateResponse = {
    players: Player[]
    monster: Monster | null
};
