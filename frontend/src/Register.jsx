import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Register() {

    const [values, setValues] = useState({
        user_id: '',
        user_name: '',
        password: ''
    })
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://13.126.160.240:7700/registerUser', values)
            .then(res => {
                if (res.data.Status == "Success") {
                    console.log("status", res.data.Status)
                    navigate('/')

                }
                // console.log("status2", res.data.Status)
            })
            .then(err => console.log(err));
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>Sign-Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'><strong>User ID</strong></label>
                        <input type="text" placeholder='Enter Name' name='user_id' onChange={e => setValues({ ...values, user_id: e.target.value })} className='form-control rounded-0' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='user_id'><strong>User Name</strong></label>
                        <input type="text" placeholder='Enter user id' name='user_name' onChange={e => setValues({ ...values, user_name: e.target.value })} className='form-control rounded-0' />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='password'><strong>Password</strong></label>
                        <input type="password" placeholder='Enter password' name='password' onChange={e => setValues({ ...values, password: e.target.value })} className='form-control rounded-0' />
                    </div>
                  <button type='submit' className='btn btn-success w-100 rounded-0'>Sign up</button>
                    <Link to='/' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Login</Link>

                </form>

            </div>

        </div>
    )
}

export default Register