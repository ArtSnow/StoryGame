import { LoginEndpoint, LoginRequest, LoginResponse } from './login';

type EndpointsList = {
    [LoginEndpoint]: {
        reqest: LoginRequest
        response: LoginResponse
    }
};

class APIService {
    private BASE_URL = 'localhost:8000/api';

    async makeRequest<E extends keyof EndpointsList>(
        endpoint: E,
        payload: EndpointsList[E]['reqest'],
    ): Promise<EndpointsList[E]['response'] | null> {
        try {
            const headers = new Headers();
            headers.append('Accept', 'application/json');
            headers.append('Content-Type', 'application/json');

            const rawResponse = await fetch(`${this.BASE_URL}${endpoint}`, {
                method: 'POST',
                headers,
                body: JSON.stringify(payload),
            });

            const response = rawResponse.json();

            return response as EndpointsList[E]['response'];
        } catch (err) {
            return null;
        }
    }
}

export default new APIService();