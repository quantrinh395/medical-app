import React from 'react'
import './dashboard.css'

import { Table} from 'react-bootstrap';
import { Redirect } from 'react-router';
import { getGraph } from '../services/grafanaService';

export const Dashboard = (props) => {
    getGraph("Ed-xapDGk", null, null)

    return props.userData ? (
        <div>
            <DashBoardHeader firstName={props.userData["firstName"]} lastName={props.userData["lastName"]} role={props.userData["role"]}/>
            {
            props.userData["role"] === "patient" ?
            <PatientInfoTable
                data = {props.userData["userData"]}
            />
            :
            <DoctorInfoTable  data = {props.userData["userData"]}/>
            }
        </div>
        ) : (<Redirect to={{pathname: "/login"}}/>)
}

export const DashBoardHeader = (props) => {
    return (
        <div className="Dashboard-Header">
            <h5>Welcome to dashboard, <b>{props.firstName + " " + props.lastName}</b></h5>
        </div>
    )
}

export const PatientInfoTable = (props) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Comments & Messages</th>
                <th>Graphic Display</th>
                <th>Date of Upload</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data && props.data.map((u, i) => {
                        return (<tr key={i}>
                            <td>{i+1}</td>
                            <td>{u["comments"]}</td>
                            <td>{u["graphic_display"] || "Unavailable"} </td>
                            <td>{u["date_of_upload"]}</td>
                        </tr>)
                    })
                }
            </tbody>
        </Table>
    )
}

export const DoctorInfoTable = (props) => {
    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>#</th>
                <th>Patient's Name</th>
                <th>Comments & Message</th>
                <th>Graphic Display</th>
                <th>Date of Upload</th>
                </tr>
            </thead>
            <tbody>
                {
                    props.data && props.data.map((u, i) => {
                        return (<tr key={i}>
                            <td>{i+1}</td>
                            <td>{u["fullname"]}</td>
                            <td>{u["comments"]}</td>
                            <td>{u["graphic_display"] || "Unavailable"} </td>
                            <td>{u["date_of_upload"]}</td>
                        </tr>)
                    })
                }
            </tbody>
        </Table>
    )
}