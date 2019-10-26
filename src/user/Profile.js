import React, {useState, useEffect} from "react";
import auth from 'auth/api-helper.js';
import { read } from './api-user'
import { Redirect, Link } from 'react-router-dom'
import DeleteUser from 'user/DeleteUser.js';

// reactstrap components
import {
  Button,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col,
  UncontrolledTooltip
} from "reactstrap";

// core components

function Profile(match) {
  const[user, setUser] =useState('');
  const[reToSign, setReToSignin] =useState(false)
  const [pills, setPills] = useState("2");
  useEffect(() => {
    document.body.classList.add("profile-page");
    document.body.classList.add("sidebar-collapse");
    document.documentElement.classList.remove("nav-open");
    return function cleanup() {
      document.body.classList.remove("profile-page");
      document.body.classList.remove("sidebar-collapse");
    };


    profile(match.params.userId)
  });

  let pageHeader = React.createRef();

  useEffect(() => {
    if (window.innerWidth > 991) {
      const updateScroll = () => {
        let windowScrollTop = window.pageYOffset / 3;
        pageHeader.current.style.transform =
          "translate3d(0," + windowScrollTop + "px,0)";
      };
      window.addEventListener("scroll", updateScroll);
      return function cleanup() {
        window.removeEventListener("scroll", updateScroll);
      };
    }
  });

  function profile(userId) {
    const jwt = auth.isAuthenticated()
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if(data.error) {
        setReToSignin(true)
      } else {
        setUser(data)
      }
    })
  }

  if(reToSign) {
    return <Redirect to ='/signin' />
  }
  return (
    <>
      <div className="wrapper">
          <div
            className="page-header clear-filter page-header-small"
            filter-color="blue"
          >
            <div
              className="page-header-image"
              style={{
                backgroundImage: "url(" + require("assets/img/bg5.jpg") + ")"
              }}
              ref={pageHeader}
            ></div>
            <Container>
              <div className="photo-container">
                <img alt="..." src={require("assets/img/ryan.jpg")}></img>
              </div>
              <h3 className="title">{user.firstName}</h3>
              <p className="category">{user.lastName}</p>
              <p className="category">{user.email}</p>
              <div className="content">
                <div className="social-description">
                  <p>{'Joined:' + (new Date(user.created)).toDateString()}</p>
                </div>
              </div>
                { auth.isAuthenticated().user && auth.isAuthenticated().user._id === user._id &&
                  (<Button>
                       <Link to={"/user/edit/" + user._id}>
                        <i className="now-ui-icons ui-1_settings-gear-63"></i>
                      </Link>
                </Button>)}
                <DeleteUser userId={user._id}/>
            </Container>
        </div>
      </div>
    </>
  );
}

export default Profile;
