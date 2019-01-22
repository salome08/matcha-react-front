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
        <h1>Hi, edit your profile here!</h1>
      <p><Link to="/" className="btn btn-link">Cancel</Link></p>
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
