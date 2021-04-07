import React, { useEffect, useState } from 'react';
import { Button, Card, Dropdown, DropdownButton, FormControl, InputGroup, Modal } from 'react-bootstrap';
import { sendMessage, fetchMessageHistory } from '../services/liveChatService';
import socketIOClient from "socket.io-client";
import './inbox.css'

export const Inbox = (props) => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [selectedUser, setSelectedUser] = useState("User")
    const [selectedUserName, setSelectedUserName] = useState("user")
    const [msgHistory, setMsgHistory] = useState({})
    const [inputMsg, setInputMsg] = useState("")
    const [triggerRender, setTriggerRender] = useState(0)
  
    const onSendMessage = () => {
      sendMessage(props && props.userData.username, selectedUserName, inputMsg)
      setInputMsg("")
      setTriggerRender(triggerRender+1)
    }

    const handleOnChange = (e) => {
      switch(e.target.id) {
          case "msg": setInputMsg(e.target.value); break;
          default: break;
      }
  }
    // const socket = socketIOClient('http://localhost:3001') 
    useEffect(() => {
      setInterval(() => {
      if(props && props.userData) {
        const fetchMessageHistoryRef = fetchMessageHistory(props.userData.username)

        fetchMessageHistoryRef.then(res => setMsgHistory(res.data.msg_history))
      }
    }, 500)
    }, [triggerRender])


    return (
      <>
        <Button className="right-area" variant="outline-primary" onClick={handleShow}>
          Inbox
        </Button>
  
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Message Box</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card style={{ width: '100%' }}>
                <Card.Body>
                    <Card.Title>Inbox History</Card.Title>
                        {
                            msgHistory && selectedUserName !== "user" &&
                            msgHistory[selectedUserName] &&
                            msgHistory[selectedUserName].map((data, i) => {
                                return (<Card.Text className="CardText" key={i}><b>{data["from"]}:</b><p>{data["content"]}</p></Card.Text>)
                            })
                        }
                </Card.Body>
            </Card>
            <InputGroup className="mb-3">
                <DropdownButton
                as={InputGroup.Prepend}
                variant="outline-secondary"
                title={`To ${selectedUser}`}
                id="input-group-dropdown-1"
                >
                {
                    props.userData && props.userData["userData"]? props.userData["userData"].map((data, i) => {
                        return (<Dropdown.Item key={i} onClick={() => {
                          setSelectedUser(data["fullname"]);
                          setSelectedUserName(data["username"]);
                          setTriggerRender(triggerRender+1)
                        }}>{data["fullname"]}</Dropdown.Item>)
                    }) : null
                }
                </DropdownButton>
                <FormControl aria-describedby="basic-addon1" id="msg" onChange={handleOnChange}/>
            </InputGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={onSendMessage}>Send Message</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }