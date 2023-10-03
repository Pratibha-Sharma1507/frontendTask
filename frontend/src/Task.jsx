import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { Button, Modal, Form } from "react-bootstrap";
import TopNavbar from "./Navbar";
import moment from 'moment';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from 'react-bootstrap/Table';
function Task() {
    const [student, setStudent] = useState([])
    const [task, setTask] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseAdd = () => setShow1(false);
    const handleShowAdd = () => setShow1(true);


    const [task_id, setTask_Id] = useState('')
    const [user_id, setUser_Id] = useState('');
    const [task_description, setTask_Description] = useState('')
    const [assign_date, setAssign_Date] = useState('')
    const [due_date, setDue_Date] = useState('')
    const [selectedStatus, setSelectedStatus] = useState(''); // State for selected status

    async function updateTask(taskid) {
        let response1 = await axios.patch(`http://13.126.160.240:7700/updateTask?task_id=${taskid}`, {
            "task_id": taskid,
            "task_description": desc,
            "assign_date": assigndate,
            "due_date": duedate,
            "status": status
        })
        getData()
        handleClose()

    }
    const [taskid, setTaskId] = useState("");
    const [desc, setDesc] = useState("");
    const [assigndate, setAssigndate] = useState("");
    const [duedate, setDuedate] = useState("");
    const [status, setStatus] = useState("");

    async function openmodel(tid, desc, assigndate, duedate, status) {
        console.log("tid", tid);
        setTaskId(tid);
        setDesc(desc);
        setAssigndate(moment(assigndate).format('YYYY-MM-DD'));
        //  console.log("assigndate", assigndate);
        setDuedate(moment(duedate).format('YYYY-DD-MM'));
        setStatus(status);
        handleShow();
    }

    const handleStatusSelect = (status) => {
        setSelectedStatus(status); // Update the selected status
    }

    const [uid, setUid] = useState("");

    const getData = async () => {
        let response = await axios.get('http://13.126.160.240:7700/viewuser', {
            withCredentials: true,
            credentials: 'include'
        })
        setStudent(response.data);
        //   console.log("my data", response.data )
    //   setUser_Id(response.data[0].user_id)
        //    console.log("my uid", user_id); 
    }
    useEffect(() => {
        getData()
    }, [])

    async function handleSubmit1() {
        handleSubmit();
    }

    async function handleSubmit() {
        // event.preventDefault();
        await axios.post('http://13.126.160.240:7700/addTask', { user_id, task_id, task_description, assign_date, due_date })
            .then(res => {
                getData()
                handleCloseAdd()
                // console.log(res);
                console.log("task_id", task_id, user_id, task_description, assign_date, due_date)

            }).catch(err => console.log(err));
    }

    const handleDelete = async (task_id) => {
        try {
            await axios.delete(`http://13.126.160.240:7700/deleteTask?task_id=${task_id}`)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <TopNavbar />
            <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
                <div className="w-75 bg-white rounded p-3">
                    <button onClick={handleShowAdd} className="btn btn-success">Add +</button>
                    <Table responsive>
                        <thead>
                            <tr>
                                {/* <th>User_id</th>  */}
                                <th style={{ color: 'brown' }}>Task_id</th>
                                <th>Task_Description</th>
                                <th>Assign_Date</th>
                                <th>Due_Date</th>
                                <th>Days Left</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                student.map((data, i) => (
                                    <tr>
                                        {/* <td>{data.user_id}</td>  */}
                                        <td>{data.task_id}</td>

                                        <td>{data.task_description}</td>
                                        <td>{(moment(data.assign_date).format('DD-MM-YYYY'))}</td>
                                        <td>{moment(data.due_date).format('DD-MM-YYYY')}</td>
                                        {
                                            (data.days_left > 0) &&
                                            <td style={{ color: 'green' }}>{data.days_left}</td>
                                            ||
                                            <td style={{ color: 'red' }}>{data.days_left}</td>
                                        }
                                        {
                                            (data.status === 'pending') &&
                                            <td><span style={{ color: 'red', fontWeight: 'bold' }}>{data.status}</span></td>
                                        }
                                        {
                                            (data.status === 'In Progress') &&
                                            <td><span style={{ color: 'blue', fontWeight: 'bold' }}>{data.status}</span></td>
                                        }
                                        {
                                            (data.status === 'Completed') &&
                                            <td><span style={{ color: 'green', fontWeight: 'bold' }}>{data.status}</span></td>
                                        }
                                        <td>
                                            <button onClick={(e) => openmodel(data.task_id, data.task_description, data.assign_date, data.due_date, data.status)} className="btn btn-primary" style={{ marginRight: "10px" }}><EditIcon style={{ color: 'white' }}></EditIcon></button>
                                            <button className="btn btn-danger" onClick={(e) => handleDelete(data.task_id)}><DeleteIcon style={{ color: 'white' }}></DeleteIcon></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>

            </div>

            <Modal show={show1} onHide={handleCloseAdd}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Add Task</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label column sm="4">User ID</Form.Label>
                    <Form.Control type="text" disabled placeholder="enter user id"
                        value={user_id}
                    />

                    <Form.Label column sm="4">Task ID</Form.Label>
                    <Form.Control type="text" placeholder="enter task id"
                        value={task_id} onChange={e => setTask_Id(e.target.value)}
                    />


                    <Form.Label column sm="4">Task Name</Form.Label>
                    <Form.Control type="text" placeholder="enter task description"
                        value={task_description} onChange={e => setTask_Description(e.target.value)}
                    />
                    <Form.Label column sm="4">Assign Date</Form.Label>
                    <Form.Control type="date" placeholder=""
                        value={assign_date} onChange={e => setAssign_Date(e.target.value)}
                    />
                    <Form.Label column sm="2">Due Date</Form.Label>
                    <Form.Control type="date" placeholder=""
                        value={due_date} onChange={e => setDue_Date(e.target.value)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdd}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit1}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title><b>Update Task</b></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label column sm="4"><b style={{ color: 'brown' }}>Task ID</b></Form.Label>
                    <Form.Control type="text" disabled value={taskid} placeholder="Normal text"
                        onChange={(e) => setTaskId(e.target.value)}
                    />
                    <Form.Label column sm="4"><b style={{ color: 'brown' }}>Task Name</b></Form.Label>
                    <Form.Control type="text" value={desc} placeholder="Normal text"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <Form.Label column sm="4"><b style={{ color: 'brown' }}>Assign date</b></Form.Label>
                    <Form.Control type="date" value={assigndate} placeholder="Normal text"
                        onChange={(e) => setAssigndate(e.target.value)}
                    />
                    <Form.Label column sm="4"><b style={{ color: 'brown' }}>Due Date</b></Form.Label>
                    <Form.Control type="date" value={duedate} placeholder="Normal text"
                        onChange={(e) => setDuedate(e.target.value)}
                    />
                    <Form.Label column sm="4"><b style={{ color: 'brown' }}>Status</b></Form.Label>
                    <Form.Select aria-label="Default select example"
                        onChange={(e) => setStatus(e.target.value)}
                        value={status}
                    >
                        <option disabled selected>Select status</option>
                        <option value="pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                    </Form.Select>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={(e) => updateTask(taskid)}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default Task;