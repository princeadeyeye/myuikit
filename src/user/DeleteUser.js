import React, {useState} from "react";
import auth from 'auth/api-helper.js';
import {remove} from './api-user.js';
import {Redirect} from 'react-router-dom';
// reactstrap components
import { Alert, Container, Button } from "reactstrap";

// core components

function DeleteUser() {
  const [alert4, setAlert4] = useState(true);
  const [redirect, setRedirect] = useState(false)

  function clickButton() {
    setAlert4(true)
  }

  function handleRequest() {
      setAlert4(false)
    }

   function deleteAccount(userId) {
      const jwt = auth.isAuthenticated()
      remove({
        userId: userId
      }, {t: jwt.token}).then((data) => {
        if(data.error) {
          console.log(data.error)
        } else {
          auth.signout(() => console.log('deleted'))
          setRedirect(true)
        }
      })
    }
    if(redirect) {
      return <Redirect to='/' />
    }
  return (
    <>
      <div className="section section-notifications">
        <Alert color="danger" isOpen={alert4}>
          <Container>
            <div className="alert-icon">
              <i className="now-ui-icons objects_support-17"></i>
            </div>
             DELETE ACCOUNT
            <button
              type="button"
              className="close"
              onClick={() => clickButton()}
            >

              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
            <button
              type="button"
              className="close"
              onClick={() => handleRequest()}
            >

              <span aria-hidden="true">
                <i className="now-ui-icons ui-1_simple-remove"></i>
              </span>
            </button>
            <Button
              onClick={() => deleteAccount()}
            >DELETE</Button>
          </Container>
        </Alert>
      </div>
    </>
  );
}

export default DeleteUser;
