import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

import { userActions } from '../_actions';

class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      submitted: false,
      isLoading: false
    };
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <div className="input-group">
          <div className="input-group-prepend">
            <div className="input-group-text"> Gender
              <input type="radio" aria-label="Checkbox for following text input"></input>
              M<input type="radio" aria-label="Checkbox for following text input"></input>
              F
            </div>
          </div>
        </div>



        <div className="container">
          <button type="button" className="btn btn-success">Save</button>
          <Link to="/" className="btn btn-link">Cancel</Link>
        </div>
      </div>
    )
  }
}


function mapStateToProps(state) {
  const { isLoading , user} = state.users;
  return {
    isLoading,
    user
  };
}

const connectedEditProfilePage = connect(mapStateToProps)(EditProfilePage);
export { connectedEditProfilePage as EditProfilePage} ;
