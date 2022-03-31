import React,{ useState } from "react"
import LoginForm from "./accLogin/loginL"
import ReqSignUp from './signUp/SignUp'
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ListItem } from '@mui/material';


const ReqLogin= (props)=>{
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
    const handleChange = (event, newValue) => {
        setValue(newValue);
    }
    const [value, setValue] = React.useState("2");

    return(
        <>
        <TabContext value={value}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <TabList value={value} onChange={handleChange} centered>
            <Tab label="Sign Up" value="1"/>
            <Tab label="Login" value="2"/>
            
          </TabList>
        </Box>

      
        <TabPanel value='1'><ReqSignUp reqSignUp={props.reqSignUp}></ReqSignUp></TabPanel>
        <TabPanel value='2'><LoginForm reqLogin={props.reqLogin}></LoginForm></TabPanel>
        
    
        

      </TabContext>
        

        </>
)
        }

export default ReqLogin