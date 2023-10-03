import Container from 'react-bootstrap/Container';
import { NavDropdown } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie';

function TopNavbar() {

  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
  const [user_name, setUser_Name] = useState('')
  axios.defaults.withCredentials = true;

  const navigate = useNavigate()

  // const handleLogout = () => {
  //   // Clear the authentication cookie
  //   Cookies.remove('token');

  //   // Redirect the user to the login page or any other appropriate page
  //   window.location.href = '/'; // You can use React Router for client-side routing if you prefer
  // };

  let fetchdata = async () => {
    let res = await axios.get("http://localhost:7700")
    console.log("res", res.data.user_name)
    if (res.data.Status === "Success") {
      setUser_Name(res.data.user_name)
      setAuth(true)
      // navigate('/')
    }
  }
  useEffect(() => {
    fetchdata()
  }, [])

  const handleDelete = () => {
    axios.get('http://localhost:7700/logout')
      .then(res => {
        // window.location.reload(true);
        navigate('/');

      }).catch(err => console.log(err))
  }
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">To Do List</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {
              auth ?
                <div>
                  Signed in as: {user_name}
                  <button className='btn btn-danger' onClick={handleDelete} style={{ marginLeft: "40px" }}>Logout</button>
                </div>
                :
                <div>
                  <h3>{message}</h3>
                  <h3>Login now</h3>
                  <Link to="/" className='btn btn-primary'>login</Link>
                </div>
            }
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default TopNavbar;