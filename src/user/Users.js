import React, { useEffect, useState } from 'react';
import {list} from './api-user.js';
import {Link} from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col
} from "reactstrap";

function Users() {
  const [users, setUsers] = useState([]);
  const [iconPills, setIconPills] = useState("1");

  useEffect(()=> {
    list()
    .then((data) => {
      if(data.error){
        console.log('unable to get data')
      } else {
        setUsers(data)
      }
    })
  })
  return (
        <div className="section section-tabs">
        <Container>
          <Row>
            <Col className="ml-auto mr-auto" md="10" xl="6">
              <Card>
                <CardHeader>
                  <Nav className=" justify-content-center" 
                  data-background-color="blue"
                  role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={iconPills === "1" ? "active" : ""}
                        href="#muiz"
                        onClick={e => {
                          e.preventDefault();
                          setIconPills("1");
                        }}
                      >
                        <i className="now-ui-icons objects_umbrella-13"></i>
                        All Users
                      </NavLink>
                    </NavItem>
                  </Nav>
                </CardHeader>
                <CardBody>
                  <TabContent
                    className="text-center"
                    activeTab={"iconPills" + iconPills}
                  >
                    <TabPane tabId="iconPills1">
                      {users.map((item, i) => {
                        return <Link 
                          to={"/user/" + item._id} 
                          key={i}>
                          {item.name}
                          <br />
                        </Link>
                        }
                      )}
                    </TabPane>
                  </TabContent>
                </CardBody>
              </Card>
            </Col>
           </Row>
         </Container>
       
        </div>
        );
    }

export default Users;
