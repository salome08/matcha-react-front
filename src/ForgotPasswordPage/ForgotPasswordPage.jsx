import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ForgotPasswordPage extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

handleChange(e) {
  const { name, value } = e.target;
  this.setState({[name]: value});
}

handleSubmit(e) {
  e.preventDefault();

  this.setState({ submitted: true });
  const { email } = this.state;
  const { dispatch } = this.props;
  if (email) {
    dispatch(userActions.resetPassword(email));
  }
}

  render() {
    const { sendingForgetPass } = this.props;
    const { email, submitted } = this.state;
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Find your account</h2>
          <form name="form" onSubmit={this.handleSubmit} >
            <div className={'form-group' + (submitted && !email ? 'has-error' : '')}>
              <label htmlFor="email">Please enter your email or phone number to search for your account.</label>
              <input type="text" className="form-control" name="email" value={email} onChange={this.handleChange} />
              {submitted && !email &&
                <div className="help-block">Email is required</div>
              }
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Send</button>
              {sendingForgetPass &&
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }
              <Link to="/login" className="btn btn-link">Cancel</Link>
            </div>
          </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { sendingForgetPass } = state.authentication;
  return {
    sendingForgetPass
  };
}

const connectedForgotPasswordPage = connect(mapStateToProps)(ForgotPasswordPage);
export { connectedForgotPasswordPage as ForgotPasswordPage };
