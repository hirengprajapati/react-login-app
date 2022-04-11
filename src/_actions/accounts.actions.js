import { accountsConstants } from '../_constants';
import { accountsService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const accountsActions = {
    login,
    logout,
    getAll
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        accountsService.login(email, password)
            .then(
                account => {
                    dispatch(success(account));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(account) { return { type: accountsConstants.LOGIN_REQUEST, account } }
    function success(account) { return { type: accountsConstants.LOGIN_SUCCESS, account } }
    function failure(error) { return { type: accountsConstants.LOGIN_FAILURE, error } }
}

function logout() {
    accountsService.logout();
    return { type: accountsConstants.LOGOUT };
}

function getAll() {
    return dispatch => {
        dispatch(request());

        accountsService.getAll()
            .then(
                account => dispatch(success(account)),
                error => dispatch(failure(error))
            );
    };

    function request() { return { type: accountsConstants.GETALL_REQUEST } }
    function success(account) { return { type: accountsConstants.GETALL_SUCCESS, account } }
    function failure(error) { return { type: accountsConstants.GETALL_FAILURE, error } }
}