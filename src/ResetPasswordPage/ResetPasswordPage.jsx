import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      user: [],
      update: false,
      isLoading: true,
      error: false,
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
    const { password } = this.state;
    const { dispatch, user } = this.props;
    if (password) {
      dispatch(userActions.updatePassword(password, user.id));
    }
  }

   componentDidMount() {

      const params = new URLSearchParams(this.props.location.search);
      const token = params.get('token');
      const id = params.get('id');
      const { dispatch } = this.props;

      if (id && token) {
        dispatch(userActions.resetPassword(id, token));
      }
  }

  render() {
    const { isLoading } = this.props;


    const { password, submitted } = this.state;

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Find your account</h2>
          <form name="form" onSubmit={this.handleSubmit} >
            <div className={'form-group' + (submitted && !password ? 'has-error' : '')}>
              <label htmlFor="password">Please enter your new password.</label>
              <input type="password" className="form-control" name="password" value={password} onChange={this.handleChange} />
              {submitted && !password &&
                <div className="help-block">New password is required</div>
              }
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Send</button>
              {isLoading &&
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
              }

              <Link to="/login" className="btn btn-link">Login Page</Link>
            </div>
          </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { isLoading, user } = state.users;
  return {
    isLoading,
    user
  };
}

const connectedResetPasswordPage = connect(mapStateToProps)(ResetPasswordPage);
export { connectedResetPasswordPage as ResetPasswordPage} ;
