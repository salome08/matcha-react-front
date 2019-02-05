import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { Form, Col, FormGroup, Checkbox, Radio, ControlLabel,
  FormControl, Button, ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { TagsInput } from '../_components';
import '../styles/inputTags.css';
import  diff  from 'object-diff';
import  isEmptyObject from 'is-empty-object';

import { userActions } from '../_actions';

class EditProfilePage extends React.Component {
  constructor(props, context) {
    super(props, context);
    const user = this.props.user.user;

    this.state = {
      gender: user.gender,
      affinity: user.affinity,
      bio: user.bio,
      tags: user.tags,
      submitted: false,
      name: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: user.password,
    };

    this.initState = this.state;

    this.handleToUpdate = this.handleToUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleToUpdate(tags){
    this.setState({tags:tags});
  }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  handleSubmit(e) {
      e.preventDefault();
      const { username, password, tags } = this.state;
      const { dispatch } = this.props;
      const toEdit = diff(this.initState, this.state);
      const user = this.props.user.user;

      this.setState({ submitted: true });
      this.initState.submitted = true;
      this.initState = this.state;
      if (!isEmptyObject(toEdit)) {
        dispatch(userActions.editProfile(toEdit, user));
      }
  }

  render() {
    const { gender, affinity, bio, tags, name, lastname,
      email, password, submitted } = this.state;
    const { isLoading } = this.props;
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
        {isLoading &&
            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
        }
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
