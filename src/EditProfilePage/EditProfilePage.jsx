import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Col, FormGroup, Checkbox, Radio, ControlLabel, FormControl, Button } from 'react-bootstrap';
import { TagsInput } from '../_components'

import { userActions } from '../_actions';

class EditProfilePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      genre: '',
      affinity: '',
      bio: '',
      tags: '',
      submitted: false,
      isLoading: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit(e) {
      e.preventDefault();

      this.setState({ submitted: true });
      const { username, password } = this.state;
      const { dispatch } = this.props;
      if (username && password) {
          dispatch(userActions.login(username, password));
      }
  }

  render() {
    return (
      <form>
        <FormGroup>
           <Radio name="radioGroup" inline>
             M
           </Radio>{' '}
           <Radio name="radioGroup" inline>
             F
           </Radio>{' '}
         </FormGroup>

         <FormGroup>
          <Checkbox inline>
            M
          </Checkbox>
          <Checkbox inline>
            F
          </Checkbox>{' '}
         </FormGroup>

         <FormGroup controlId="formControlsTextarea">
            <ControlLabel>Bio</ControlLabel>
            <FormControl componentClass="textarea" placeholder="Write here a short bio..." />
         </FormGroup>

         <TagsInput></TagsInput>
        </form>


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

const connectedEditProfilePage = connect(mapStateToProps)(EditProfilePage);
export { connectedEditProfilePage as EditProfilePage} ;
