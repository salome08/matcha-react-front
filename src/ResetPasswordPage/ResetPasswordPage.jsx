import config from 'config';
import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { userActions } from '../_actions';

class ResetPasswordPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newPassword: '',
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
    const { newPassword } = this.state;
    // const { dispatch } = this.props;
    // if (newPassword) {
    //   dispatch(userActions.resetPassword(newPassword));
    // }
  }

   componentDidMount() {

      // console.log('conponentDidMount : ',this.props.location);
      const params = new URLSearchParams(this.props.location.search);
      const token = params.get('token');
      const id = params.get('id');

      axios
      .post(`${config.apiUrl}/mails/resetPassword`, {id: id, token: token})
      .then((response) => {
        console.log('ok');
      })
      .catch((error) => {
        console.log('ko');
      });
  }

  render() {
    // const { resetingPass } = this.props;


    const { newPassword, submitted } = this.state;

    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Find your account</h2>
          <form name="form" onSubmit={this.handleSubmit} >
            <div className={'form-group' + (submitted && !newPassword ? 'has-error' : '')}>
              <label htmlFor="newPassword">Please enter your new password.</label>
              <input type="password" className="form-control" name="newPassword" value={newPassword} onChange={this.handleChange} />
              {submitted && !newPassword &&
                <div className="help-block">New password is required</div>
              }
            </div>
            <div className="form-group">
              <button className="btn btn-primary">Send</button>

            </div>
          </form>
      </div>
    )
  }
}
//
// function mapStateToProps(state) {
//   const { resetingPass } = state.authentication;
//   return {
//     resetingPass
//   };
// }
//
// const connectedResetPasswordPage = connect(mapStateToProps)(ResetPasswordPage);
// export { connectedResetPasswordPage as ResetPasswordPage} ;
export { ResetPasswordPage} ;
