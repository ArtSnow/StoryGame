export const LoginEndpoint = '/login';

export type Role = 'master' | 'player';

export type LoginRequest = {
    name: string
    password: string
    image: string
};

export type LoginResponse = {
    id: string
    role: Role
};
