import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class HomePage extends React.Component {
    //executed after our rendering occured
    componentDidMount() {
    }



    render() {
        const { user } = this.props.user;
        console.log(user);
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstname}!</h1>
                <p>You're logged in Matcha!!</p>
                <p><Link to="/login">Logout </Link></p>
                <p><Link to="/editProfile">Complete your informations</Link></p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { user } = authentication;
    return {
        user,
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
