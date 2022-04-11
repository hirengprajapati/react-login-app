import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { accountsActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.dispatch(accountsActions.getAll());
    }

    render() {
        const { account, accounts } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {account.firstName}!</h1>
                <p>You're logged in with React & JWT!!</p>
                <h3>Users from secure api end point:</h3>
                {accounts.loading && <em>Loading users...</em>}
                {accounts.error && <span className="text-danger">ERROR: {accounts.error}</span>}
                {accounts.items &&
                    <ul>
                        {accounts.items.map((account, index) =>
                            <li key={account.id}>
                                {account.firstName + ' ' + account.lastName}
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { accounts, authentication } = state;
    const { account } = authentication;
    return {
        account,
        accounts
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };