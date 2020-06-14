import React, { Component } from 'react';
import Validator from 'validator';
import { Alert, Button, Container, Form, FormGroup, Input, FormFeedback } from 'reactstrap';
import "../../styles/signup.css";

class Login extends Component {
  state = {
    data:{
      email:'',
      password:'',
    },
    errors:{}
  };
  // Receives user input
  onChange = e =>
    this.setState({
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
 // Send user input to server
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
        <Container>
        {errors.global && <Alert color="danger">{errors.global}</Alert>}  
          <Form className="form-wrapper" onSubmit={this.onSubmit}>
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
              <Button color="primary" size="lg" className="submit-btn" >Submit</Button>
            </FormGroup>  
          </Form>
        </Container>
      </section>
    )
  }
}

export default Login;