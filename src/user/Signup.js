import React, {useState, useEffect} from "react";
import { create } from './api-user.js';
import { Link } from "react-router-dom";


// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Alert,
  Col
} from "reactstrap";

// core components

function Signup() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hashed_password, setHashedPassword] = useState('');
  const [email, setEmail] = useState('');
  const [open, setOpen] = useState(false);
  const [error, setError] = useState('');
  const [firstFocus, setFirstFocus] = useState(false);
  const [lastFocus, setLastFocus] = useState(false);
  
  useEffect(() => {
    document.body.classList.add("login-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
    return function cleanup() {
      document.body.classList.remove("login-page");
      document.body.classList.remove("sidebar-collapse");
    };
  });
  function onEmailChange(event) {
      setEmail(event.target.value)
    } 
  function onFirstNameChange(event) {
      setName(event.target.value)
    } 
  function onLastNameChange(event) {
      setLastName(event.target.value)
    } 
  function onPasswordChange(event) {
      setHashedPassword(event.target.value)
    } 
  function clickSubmit() {
    const user = {
      name: name || undefined,
      lastName: lastName || undefined,
      email: email || undefined,
      hashed_password: hashed_password || undefined
    }
    create(user).then((data) => {
      if(data.error) {
        setError(data.error)
        setName('')
        setHashedPassword('')
        setLastName('')
        setEmail('')
      } else {
        setError('')
        setOpen(true)
        
      }
    })
  }


  return (
    <>
      
      <div className="page-header clear-filter" filter-color="blue">
        <div
          className="page-header-image"
          style={{
            backgroundImage: "url(" + require("assets/img/login.jpg") + ")"
          }}
        ></div>
        <div className="content">
          <Container>
            <Col className="ml-auto mr-auto" md="4">
              <Card className="card-login card-plain">
                <Form action="" className="form" method="">
                  <CardHeader className="text-center">
                    <div className="logo-container">
                      <img
                        alt="..."
                        src={require("assets/img/now-logo.png")}
                      ></img>
                    </div>
                  </CardHeader>
                  <CardBody>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder=" First Name..."
                        type="text"
                        value={name}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                        onChange={(e) => onFirstNameChange(e)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (firstFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons users_circle-08"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder=" Last Name..."
                        type="text"
                        value={lastName}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
                        onChange={(e) => onLastNameChange(e)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Email..."
                        type="text"
                        value={email}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                        onChange={(e) => onEmailChange(e)}
                      ></Input>
                    </InputGroup>
                    <InputGroup
                      className={
                        "no-border input-lg" +
                        (lastFocus ? " input-group-focus" : "")
                      }
                    >
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="now-ui-icons text_caps-small"></i>
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        placeholder="Password..."
                        type="password"
                        value={hashed_password}
                        onFocus={() => setLastFocus(true)}
                        onBlur={() => setLastFocus(false)}
                        onChange={(e) => onPasswordChange(e)}
                      ></Input>
                      <br/>
                      {error && <h6>{error}</h6> }
                    </InputGroup>
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      onClick={clickSubmit}
                      size="lg"
                    >
                      Register
                    </Button>
                    <Alert color="success" isOpen={open}>
                      <Container>
                        <div className="alert-icon">
                          <i className="now-ui-icons ui-2_like"></i>
                        </div>
                        <strong>Well done!</strong> You have successfully register your account.
                        <button
                          type="button"
                          className="close"
                          onClick={() => setOpen(false)}
                        >
                          <span aria-hidden="true">
                            <i className="now-ui-icons ui-1_simple-remove"></i>
                          </span>
                        </button>
                      </Container>
                    </Alert>
                    <div className="pull-left">
                      <h6>
                        <Link
                          className="link"
                          exact to="/signin/"
                        >
                          Create Account
                        </Link>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <Link
                          className="link"
                          exact to="/home-page"
                        >
                          Need Help?
                        </Link>
                      </h6>
                    </div>
                  </CardFooter>
                </Form>
              </Card>
            </Col>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Signup;
