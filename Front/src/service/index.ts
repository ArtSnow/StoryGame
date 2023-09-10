import { LoginEndpoint, LoginRequest, LoginResponse } from './login';
import { StateEndpoint, StateRequest, StateResponse } from './state';

type EndpointsList = {
    [LoginEndpoint]: {
        request: LoginRequest
        response: LoginResponse
    },
    [StateEndpoint]: {
        request: StateRequest,
        response: StateResponse,
    },
};

class APIService {
    private BASE_URL = 'localhost:8000/api';

    async makeRequest<E extends keyof EndpointsList>(
        endpoint: E,
        payload: EndpointsList[E]['request'],
    ): Promise<EndpointsList[E]['response'] | { error: string }> {
        try {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');

            const rawResponse = await fetch(`${this.BASE_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload),
            });

            const response = await rawResponse.json();

            if ('error' in response && typeof response.error === 'string') {
                return { error: response.error };
            }

            return response as EndpointsList[E]['response'];
        } catch (err) {
            return { error: 'Запрос поломался' };
        }
    }
}

export default new APIService();