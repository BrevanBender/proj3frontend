
import { useState } from "react"
import'./signup.css'

const ReqSignUp= (props)=>{
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
                props.reqSignUp(newLogin)
                setNewLogin({
                    username: '',
                    email: '',
                    password: ''
                })
                }} id="signForm">
                Username: <input type='text'  name='username'onChange={handleInputChange} value={newLogin.username}></input>
                Email: <input type='email'  name='email'onChange={handleInputChange} value={newLogin.email}></input>
                Password: <input type='password' name='password' onChange={handleInputChange} value={newLogin.password}></input>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )}
    export default ReqSignUp