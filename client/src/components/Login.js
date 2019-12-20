import React, {useState} from "react";
import {axiosWithAuth} from './utils/axiosWithAuth'

const Login = (props) => {

  const [credentials, setCredentials] = useState({
    username: 'Lambda School',
    password: 'i<3Lambd4'
 });

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }
  const login = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.payload);
        props.history.push('/BubblePage')
        })
      .catch(err=> console.log(err))
  }

  return (
    <>
      <h1>Welcome to the Bubble App!</h1>
      
        <form onSubmit={login}>
        <div className="form-group row">
          <label for="username" className="col-sm-2 col-form-label">Username</label>
          <input
            className="form-control"
            id="username"
            type="text"
            name="username"
            label="Username"
            value={credentials.username}
            onChange={handleChange}
            />
          </div>
          <div className="form-group row">
            <label for="password" className="col-sm-2 col-form-label">Password</label>
            <input
            className="form-control"
            id="password"
            type="password"
            name="password"
            label="Password"
            value={credentials.password}
            onChange={handleChange}
            />  
          </div>
          <div className="form-group row"><button className="btn btn-info">Login</button></div>
        </form>
        
      
    </>
  );
};

export default Login;
