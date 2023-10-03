import React, { useState,useEffect } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import axios from 'axios'

function Home(){
   
    const [auth, setAuth] = useState(false);
    const [message, setMessage] = useState('');
    const [user_name , setUser_Name ] = useState('')
    axios.defaults.withCredentials = true;

    const navigate = useNavigate()

    
    let fetchdata = async ()=>{
        let res = await  axios.get("http://localhost:7700")
        console.log("res",res.data.user_name)
if(res.data.Status==="Success"){
    setUser_Name(res.data.user_name)
    setAuth(true)
    //   navigate('/')
}
    }
    useEffect(()=>{
        fetchdata()
    },[])
    // useEffect(()=>{
    //     axios.get('http://localhost:8082')
    //     .then(res => {
    //      if(res.data.Status === "Success"){
    //         setAuth(true)
    //         setName(res.data.name)
    //          navigate('/login')
    //      }
    //      else{
    //         setAuth(false)
    //         setMessage(res.data.Error)
    //      }
    //     })
    //     .then(err => console.log(err));
    //     },[])
     
    

    return(
       <div className='container mt-4'>
        {
            auth ?
            <div>
                <h3>You are Authorized ---{user_name}</h3>
                <button className='btn btn-danger'>Logout</button>
       </div>
       :
       <div>
        <h3>{message}</h3>
        <h3>Login now</h3>
        <Link to = "/" className='btn btn-primary'>Login</Link>
       </div>
}
</div>
    )
}
export default Home;