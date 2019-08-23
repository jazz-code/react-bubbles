import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Login = ({history}) => {
 
  const  [credentials, setCredentials] = useState({username: "", password: ""});

  const handleChange = e => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    })
  }

  const login = e => {
    e.preventDefault();
    axios
    .post('http://localhost:5000/api/login', credentials)
    .then(res => {
      console.log(res)
      localStorage.setItem('token', res.data.payload);
      history.push('/bubble-page')
    })
    .catch(err => console.log(err.response));
  }


    return (
      <div>
         <h1>Welcome to the Bubble App!</h1>
      {/* <p>Build a login page here</p> */}
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
          <button>Log in</button>
        </form>
      </div>
    );
  }

export default Login;

 // state = {
  //   credentials: {
  //     username: '',
  //     password: ''
  //   }
  // };

    // handleChange = e => {
  //   this.setState({
  //     credentials: {
  //       ...this.state.credentials,
  //       [e.target.name]: e.target.value
  //     }
  //   });
  // };
  
  // login = e => {
  //   e.preventDefault();
  //   axios
  //     .post('http://localhost:5000/api/login', this.state.credentials)
  //     .then(res => {
  //       localStorage.setItem('token', res.data.payload);
  //     })
  //     .catch(err => console.log(err.response));
  // };
