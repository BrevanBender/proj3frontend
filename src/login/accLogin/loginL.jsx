import { useState } from "react";
import'./log.css'
const LoginForm= (props)=>{
    const[newLogin, setNewLogin] = useState({
        username: '',
        email: '',
        password: ''
    })
    const handleInputChange = (e)=>{
        setNewLogin({
            ...newLogin,
            [e.target.name]: e.target.value
        })
    }


    return(

        <div className="newLogin">
        <form onSubmit={(e)=>{
            e.preventDefault()
            props.reqLogin(newLogin)
            setNewLogin({
                username: '',
                email: '',
                password: ''
                 })
            }} id="signForm">
                Username: <input type='text'  name='username'onChange={handleInputChange} value={newLogin.username}></input>
                Password: <input type='password' name='password' onChange={handleInputChange} value={newLogin.password}></input>
                <button type="submit">Login</button>
            </form>
            </div>
      
)
        }

export default LoginForm
