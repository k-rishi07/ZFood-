import React, {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import NavBar from '../components/NavBar'
export default function Login() {

  const [credentials, setcredentials] = useState({email:"",password:""})
  let navigate = useNavigate()
    const handleSubmit = async(e)=>{
        e.preventDefault();
        console.log(JSON.stringify({email:credentials.email, password:credentials.password}))
        const response = await fetch("https://folapooo.onrender.com/api/loginuser",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:credentials.email, password:credentials.password})
        });
        const json = await response.json()
        console.log(json);

        if(!json.success){
            alert("Enter Valid Credentials")
        }
        if(json.success){
          localStorage.setItem("userEmail",credentials.email);
          localStorage.setItem("authToken",json.authToken);
          console.log(localStorage.getItem("authToken"))
          navigate("/")
      }
      else{
        alert("Enter Valid Credentials")
      }
        
    }

    const onChange=(event)=>{
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

  return (
    
    <div style={{backgroundImage: 'url("https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?cs=srgb&dl=pexels-ella-olsson-1640774.jpg&fm=jpg")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <NavBar />
      </div>
      <div className='container'>

<form className='w-50 m-auto mt-5 border bg-dark border-success rounded' onSubmit={handleSubmit}>

<div className="mb-3 mt-2 mx-3">
<label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
<input type="email" className="form-control" name='email' value= {credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
<div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
</div>
<div className="mb-3 mt-2 mx-3">
<label htmlFor="exampleInputPassword1" className="form-label">Password</label>
<input type="password" className="form-control" name='password' value= {credentials.password} onChange={onChange} id="exampleInputPassword1" />
</div>

<button type="submit" className="m-3 btn btn-success mt-2">Submit</button>
<Link to="/createuser" className="m-3 btn btn-danger mt-2">I'm a new user</Link>
</form>
</div>
    </div>
  )
}
