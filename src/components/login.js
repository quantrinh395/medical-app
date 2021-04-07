import React, {useState } from 'react'
import { FormControl, InputGroup, Button } from 'react-bootstrap'
import './login.css'
import { login } from '../services/loginService'
import { Redirect } from 'react-router'

export const LoginBoard = (props) =>{
    const [userCreds, setUserCreds] = useState({username: null, password: null})
    const [isPristine, setIsPristine] = useState(true)

    const handleOnChange = (e) => {
        switch(e.target.id) {
            case "username": setUserCreds({username: e.target.value, password : userCreds["password"]}); break;
            case "password" : setUserCreds({username : userCreds["username"], password: e.target.value}); break;
            default: break;
        }
    }

    const handleLogin = (e) => {
        setIsPristine(false)

        const {username, password} = userCreds
        const loginRef = login(username, password)

        loginRef
            .then(res => {
                if(res.data.token) {
                    localStorage.setItem("sessionToken", res.data.token)
                    //Lift state up here
                    props.onSessionTokenChange(res.data.token)
                }})
            .catch(err => console.log(err))

    }

    return(
        !props.userData ? 
        (<div className="Input-Center">
            <div className="Input-Form">
                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    id="username"
                    placeholder="Username"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onKeyUp={handleOnChange}
                    />
                </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                    <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                    id="password"
                    placeholder="Password"
                    aria-label="Password"
                    aria-describedby="basic-addon1"
                    type="password"
                    onKeyUp={handleOnChange}
                    />
                </InputGroup>
                <p className="p-invalid">{!isPristine ? "Invalid username or password" : ""}</p>
                <div className="Button-Group">
                    <Button variant="primary" onClick={handleLogin} >Login</Button>
                    <Button variant="success">Sign Up</Button>
                </div>
                <br/>
                <p>Version 1.0</p>
            </div>
        </div>
    )  : (<Redirect to={{pathname: "/dashboard"}}/>)
    )
}