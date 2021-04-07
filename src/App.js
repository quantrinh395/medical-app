import {LoginBoard} from './components/login'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { HomePage } from './components/home';
import { Form, Nav, Navbar, Button} from 'react-bootstrap';
import { Dashboard } from './components/dashboard';
import { getUserData, validateSessionToken, logout } from './services/loginService'
import { Inbox } from './components/inbox';
import { useEffect, useState } from 'react';

function App() {

  const [initalState, setInitState] = useState({
    isSessionValid: false,
    userData: null,
    sessionToken: null
  })


  //Fetch user data for the first time, keep current session if exists and not expired
  useEffect(() => {
    const sessionToken = localStorage.getItem("sessionToken")
    const tokenStatusRef = validateSessionToken(sessionToken)

    tokenStatusRef.then(res => {
      const isTokenValid = res.data.isTokenValid
      setInitState({...initalState, isSessionValid: isTokenValid})
    })

    if(initalState.isSessionValid) {
      const userDataRef = getUserData(sessionToken)

      userDataRef.then(res => {
        setInitState({...initalState, userData: res.data})
      })
    }

  }, [initalState.isSessionValid])

  const onSessionTokenChange = (token) => {
    setInitState({...initalState, sessionToken: token, isSessionValid: true})
  }


  return (
    <Router>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Medical App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/dashboard">Home</Nav.Link>
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
        <Form inline>
          {initalState.isSessionValid === false? 
            (<Link to="/login"><Button variant="outline-success">Login</Button></Link>) : 
            (
              <>
              <Inbox userData={initalState.userData}/>
              <Button variant="outline-success" onClick={logout}>Logout</Button>
              </>
            )
          }
        </Form>
      </Navbar.Collapse>
    </Navbar>

      <Switch>
        <Route path="/dashboard">
          <Dashboard userData={initalState.userData}/>
        </Route>
        <Route path="/login">
          <LoginBoard onSessionTokenChange={onSessionTokenChange} userData={initalState.userData}/>
        </Route>

        <Route path="/">
          <HomePage/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
