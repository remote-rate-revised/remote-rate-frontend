import React from "react";
import Footer from "../Footer/Footer.js";
import Profile from "../Profile/Profile.js";
import Compare from "../Compare.js";
import About from "../About/AboutUs.js";
import Landing from "../Landing.js";
import Container from "react-bootstrap/Container";
import { withAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "../Nav/Navbar";
import Alert from "react-bootstrap/Alert";


function Main(props) {
  const { user, isAuthenticated } = props.auth0;

  return (
    <Container>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} />
        <Switch>
          <Route exact path="/">
            <Landing />
          </Route>
          <Route exact path="/landing">
            <Landing />
          </Route>
          <Route exact path="/profile">
            {isAuthenticated ? (
              <>
                <Profile email={user.email} name={user.name} />
              </>
            ) : (
              <>
                <Alert variant="danger">
                  <Alert.Heading>
                    Oh snap! You are not logged in!!
                  </Alert.Heading>
                  <p>
                    Please Log in to access the contents of this page and start
                    saving money!
                  </p>
                </Alert>
                <Landing />
              </>
            )}
          </Route>
          <Route exact path="/compare">
            {isAuthenticated ? (
              <>
                <Compare email={user.email} />
              </>
            ) : (
              <>
                <Alert variant="danger">
                  <Alert.Heading>
                    Oh snap! You are not logged in!!
                  </Alert.Heading>
                  <p>
                    Please Log in to access the contents of this page and start
                    saving money!
                  </p>
                </Alert>
                <Landing />
              </>
            )}
          </Route>
          <Route exact path="/aboutUs">
            <About />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </Container>
  );
}

export default withAuth0(Main);
