import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

function Login(){

    const [values, setValues]  = useState({
        user_id: '',
        password: ''
       })
       const [loginid, setLoginid] = useState("");
        const navigate = useNavigate()
        axios.defaults.withCredentials = true;
       const handleSubmit = async (event) => {
        event.preventDefault();
        const postdata = await axios.post('http://13.126.160.240:7700/loginUser', values )
console.log("postdata", postdata)
console.log("myvalues", values.user_id)
setLoginid(values.user_id);
if(postdata.data.Status==="Success"){
    navigate('/task')
}
    //    .then(res => {
    //     if(res.data.Status === "Success"){
    //         navigate('/')
    //     }
    //     else{
    //         alert(res.data.Error);
    //     }
    //    })
    //    .catch(err){ console.log(err)};
    //    }
       }
    return(
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
       <h2>Sign In</h2>
     <form onSubmit={handleSubmit}>
    
        <div className='mb-3'>
            <label htmlFor='user_id'><strong>User ID</strong></label>
            <input type="text" placeholder='Enter user id' name='user_id' onChange={e => setValues({...values, user_id: e.target.value})} className='form-control rounded-0'/>
        </div>

        <div className='mb-3'>
            <label htmlFor='password'><strong>Password</strong></label>
            <input type="password" placeholder='Enter password' name='password' onChange={e => setValues({...values, password: e.target.value})} className='form-control rounded-0'/>
        </div>
        <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
        <Link to='/register' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>Create an account</Link>
     </form>
     </div>
        </div>
    )
}

export default Login