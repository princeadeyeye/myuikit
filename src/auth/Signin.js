import React, { useState, useEffect} from "react";
import {signin} from './api-auth.js';
import auth from './api-helper.js'
import {Redirect, Link} from 'react-router-dom'


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
  Col
} from "reactstrap";

// core components

function Signin() {
  const {from} =  {pathname: '/'}
  

  const [email, setEmail] = useState(''); 
  const [hashed_password, setHashedPassword] = useState(''); 
  const [error, setError] = useState(''); 
  const [reToRef, setReToRef] = useState(false); 
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


  function clickSubmit() {
    const user = {
      email: email || undefined,
      hashed_password: hashed_password || undefined
    }

    signin(user).then((data) => {
      if(data.error) {
        setError('Unable to sign in ')
      } else {
        auth.autheniticate(data, () => {
          setReToRef(true)
        })
      }
    })
  }

  if(reToRef) {
    return(<Redirect to={from} />)
  }
function onEmailChange(event) {
      setEmail(event.target.value)
    } 
function onPasswordChange(event) {
      setHashedPassword(event.target.value)
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
                        placeholder="Email..."
                        type="text"
                        value={email}
                        onFocus={() => setFirstFocus(true)}
                        onBlur={() => setFirstFocus(false)}
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
                        onChange = {(e) => onPasswordChange(e)}
                      ></Input>
                    </InputGroup>
                    {error}
                  </CardBody>
                  <CardFooter className="text-center">
                    <Button
                      block
                      className="btn-round"
                      color="info"
                      onClick={e => clickSubmit()}
                      size="lg"
                    >
                     Login
                    </Button>
                    <div className="pull-left">
                      <h6>
                        <Link
                          className="link"
                          exact to='/signup'
                        >
                          Create Account
                        </Link>
                      </h6>
                    </div>
                    <div className="pull-right">
                      <h6>
                        <Link
                          className="link"
                          exact to ='/home-page'
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

export default Signin;
