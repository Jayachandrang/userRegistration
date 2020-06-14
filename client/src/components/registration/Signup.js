import React, { Component } from 'react';
import Validator from 'validator';
import { Button, Form, Label, FormGroup, Input, FormFeedback, Alert } from 'reactstrap';
import countries from '../../assets/countries.json';
import "../../styles/signup.css";

class Signup extends Component {
  state = {
    data: {
      firstname: '',
      lastname: '',
      username: '',
      gender: '',
      country: 'India',
      email: '',
      password: '',
    },
    errors: {}
  };
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });

  onSubmit = e => {
    e.preventDefault();
    const errors = this.validate(this.state.data);
    this.setState({ errors });
    if (Object.keys(errors).length === 0) {
      this.setState({ loading: true });
      this.props
        .submit(this.state.data)
        .catch(err =>
          this.setState({ errors: err.response.data.errors, loading: false })
        );
    }
  };

  validate = data => {
    const errors = {};
    for (let field in data) {
      if (!data[field]) errors[field] = `${field} is required`;
    }
    if (!Validator.isEmpty(data.email)) {
      if (!Validator.isEmail(data.email)) errors.email = "Invalid email";
    }
    return errors;
  };
  render() {
    const { data, errors } = this.state;

    return (
      <section className="signup-container">
          {errors && errors.global && <Alert color="danger">{errors.global}</Alert>}
          <Form className="form-wrapper" onSubmit={this.onSubmit}>
            <FormGroup>
            <label className="label-session">First Name</label>
              <div className="field-session">
                <Input
                  type="text"
                  name="firstname"
                  id="firstname"
                  bsSize="lg"
                  value={data.firstname}
                  onChange={this.onChange}
                  invalid={!!errors.firstname && !data.firstname}
                />
                {!data.firstname && <FormFeedback>{errors.firstname}</FormFeedback>}
              </div>
            </FormGroup>
            <FormGroup>
            <label className="label-session">Last Name</label>
              <div className="field-session">
                <Input
                  type="text"
                  name="lastname"
                  id="lastname"
                  bsSize="lg"
                  value={data.lastname}
                  onChange={this.onChange}
                  invalid={!!errors.lastname && !data.lastname}
                />
                {!data.lastname && <FormFeedback>{errors.lastname}</FormFeedback>}
              </div>
            </FormGroup>
            <FormGroup>
            <label className="label-session">User Name</label>
              <div className="field-session">
                <Input
                  type="text"
                  name="username"
                  id="username"
                  bsSize="lg"
                  value={data.username}
                  onChange={this.onChange}
                  invalid={!!errors.username && !data.username}
                />
                {!data.username && <FormFeedback>{errors.username}</FormFeedback>}
              </div>
            </FormGroup>
            <FormGroup>
            <label className="label-session">Email</label>
              <div className="field-session">
                <Input
                  type="email"
                  name="email"
                  id="email"
                  bsSize="lg"
                  value={data.email}
                  onChange={this.onChange}
                  invalid={!!errors.email && !data.email}
                />
                {!data.email && <FormFeedback>{errors.email}</FormFeedback>}
              </div>
            </FormGroup>
            <FormGroup>
            <label className="label-session">Password</label>
              <div className="field-session">
                <Input
                  type="password"
                  name="password"
                  id="password"
                  bsSize="lg"
                  value={data.password}
                  onChange={this.onChange}
                  invalid={!!errors.password && !data.password}
                />
                {!data.password && <FormFeedback>{errors.password}</FormFeedback>}
              </div>
            </FormGroup>
            <FormGroup>
              <label className="radio-label-session">Gender</label>
              <div className="radio-field-session">
                <Label check className="radio-field">
                  <Input type="radio" name="gender" value='male' onChange={this.onChange} />
                  Male
                </Label>
                <Label check className="radio-field">
                  <Input type="radio" value='female' name="gender" onChange={this.onChange} />
                  Female
                </Label>
                {!data.gender && <FormFeedback>{errors.gender}</FormFeedback>}
              </div>

              
              
            </FormGroup>
            <FormGroup>
            <label className="label-session">Country</label>
              <div className="field-session">
                <Input type="select" name="country" id="country" className="select-box" onChange={this.onChange} value={data.country.name}>
                  {countries.map((country, idx) => (
                    <option key={country.code}>
                      {country.name}</option>
                  ))}
                </Input>
              </div>
            </FormGroup>
            <FormGroup>
              <Button color="primary" size="lg" className="submit-btn" >Submit</Button>
            </FormGroup>
          </Form>
      </section>
    )
  }
}

export default Signup;