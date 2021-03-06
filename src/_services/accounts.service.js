import config from 'config';
import { authHeader } from '../_helpers';

export const accountsService = {
    login,
    logout,
    getAll
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/accounts/authenticate`, requestOptions)
        .then(handleResponse)
        .then(account => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('account', JSON.stringify(account));

            return account;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('account');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/accounts`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}