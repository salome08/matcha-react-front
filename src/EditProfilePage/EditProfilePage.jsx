import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Col, FormGroup, Checkbox, Radio, ControlLabel,
  FormControl, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { TagsInput } from '../_components';
import '../styles/inputTags.css';

import { userActions } from '../_actions';

class EditProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    const user = this.props.user.user;

    this.state = {
      gender: [],
      affinity: '',
      bio: '',
      tags: [],
      submitted: false,
      isLoading: false,
      name: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password
    };

    this.handleToUpdate = this.handleToUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleToUpdate(tags){
    this.setState({tags:tags});
  }

  handleChange(e) {
      const { name, value } = e.target;
      // name = e.target.name;
      // console.log(e.target);
      this.setState({ [name]: value });
  }

  handleSubmit(e) {
      e.preventDefault();

      this.setState({ submitted: true });
      const { username, password, tags } = this.state;
      const { dispatch } = this.props;
      if (username && password) {
          dispatch(userActions.editProfile(gender, affinity,
            bio, tags, name, lastname, email, password));
      }
      console.log('parents tags : ', tags);
  }

  render() {
    const { gender, affinity, bio, tags, name, lastname,
      email, password, submitted } = this.state;
    const user = this.props.user.user;
    let handleToUpdate  =  this.handleToUpdate;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Edit your profile</h1>


        <FormGroup>
      <ControlLabel>Gender</ControlLabel>{' '}
        <ToggleButtonGroup type="radio" name="gender" >
           <ToggleButton name="male" value={1} onChange={this.handleChange}>Male</ToggleButton>
           <ToggleButton name="female" value={2} onChange={this.handleChange}>Female</ToggleButton>
         </ToggleButtonGroup>
         </FormGroup>

         <FormGroup>
         <ControlLabel>Affinity</ControlLabel>{' '}
           <ToggleButtonGroup type="radio" name="affinity" >
              <ToggleButton name="male" value={1} onChange={this.handleChange}>Male</ToggleButton>
              <ToggleButton name="female" value={2} onChange={this.handleChange}>Female</ToggleButton>
              <ToggleButton name="both" value={3} onChange={this.handleChange}>Both</ToggleButton>
            </ToggleButtonGroup>
            </FormGroup>

        <FormGroup controlId="bio">
          <ControlLabel>Bio</ControlLabel>
          <FormControl name="bio" value={bio} onChange={this.handleChange} componentClass="textarea" placeholder="Write here a short bio..." />
        </FormGroup>

        <FormGroup>
        <ControlLabel name="tags">Tags</ControlLabel>{' '}
        <TagsInput handleToUpdate={this.handleToUpdate} ></TagsInput>
        </FormGroup>
        <hr></hr>

        <FormGroup controlId="name"
          validationState={(submitted && !name ? 'error' : 'success')}>
          <ControlLabel>Name</ControlLabel>
          <FormControl  type="text"
            name="name"
            value={name}
            placeholder={user.firstname}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="lastname"
          validationState={(submitted && !lastname ? 'error' : 'success')}>
          <ControlLabel>Last name</ControlLabel>
          <FormControl type="text"
           name="lastname"
           value={lastname}
           placeholder={user.lastname}
           onChange={this.handleChange}
           />
           <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="email"
          validationState={(submitted && !email ? 'error' : 'success')}>
          <ControlLabel>Email address</ControlLabel>
          <FormControl type="email"
          name="email"
          value={email}
          placeholder={user.email}
          onChange={this.handleChange}
          />
          <FormControl.Feedback />
        </FormGroup>

        <FormGroup controlId="password"
          validationState={(submitted && !password ? 'error' : 'success')}>
          <ControlLabel>Password</ControlLabel>
          <FormControl type="password"
          value={password}
          name="password" placeholder="000000"
          onChange={this.handleChange}
          />
          <FormControl.Feedback />
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
