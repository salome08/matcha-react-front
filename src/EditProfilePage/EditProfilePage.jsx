import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Col, FormGroup, Checkbox, Radio, ControlLabel,
  FormControl, Button } from 'react-bootstrap';
import { TagsInput } from '../_components';
import '../styles/inputTags.css';

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
      isLoading: false,
      name: 'lola'
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
      <h1>Edit your profile</h1>
        <FormGroup>
          Genre {'.............'}     <Radio name="radioGroup" inline>
             M
           </Radio>{' '}
           <Radio name="radioGroup" inline>
             F
           </Radio>{' '}
         </FormGroup>

         <FormGroup>
         Affinity {'.............'}
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

         <hr></hr>

         <FormGroup>
           <ControlLabel>Name</ControlLabel>
           <FormControl type="text" placeholder={this.props.name} />
         </FormGroup>

         <FormGroup>
           <ControlLabel>Last name</ControlLabel>
           <FormControl type="email" placeholder="Enter email" />
         </FormGroup>

         <FormGroup controlId="formBasicEmail">
           <ControlLabel>Email address</ControlLabel>
           <FormControl type="email" placeholder="Enter email" />
         </FormGroup>

         <FormGroup>
           <ControlLabel>Password</ControlLabel>
           <FormControl type="email" placeholder="Enter email" />
         </FormGroup>

         <button className="btn btn-success">Save</button>
         <Link to="/" className="btn btn-link">Cancel</Link>

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
