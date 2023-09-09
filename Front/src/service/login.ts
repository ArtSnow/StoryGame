export const LoginEndpoint = '/login';

export type LoginRequest = {
    name: string
    password: string
    image: string
};

export type LoginResponse = {};
