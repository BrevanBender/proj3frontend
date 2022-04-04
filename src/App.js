import PostContainer from './postcontainer/postcontainer';
import './App.css';
import Followcontainer from './following/following';
import React, {useState, useEffect} from 'react';
import SearchContainer from './areas/areas';
import NewPost from './newPost/newpost';
// import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { ListItem } from '@mui/material';
import apiUrl from './apiconfig';
import ReqLogin from './login/login';
import { ConstructionOutlined } from '@mui/icons-material';
import axios from 'axios';
import Profile from './yourpage/profile';


function App() {
  
  const [geoPosts, setPosts] = useState([])
  const [user, setUser] = useState({})
  const [auto, setAuto] = useState([])
  
  const reqSignUp = async (newLogin)=>{
    const apiResponse = await fetch(`${apiUrl}profile/signup`, {
        method: 'POST',
        body: JSON.stringify(newLogin),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const parsedResponse = await apiResponse.json()
    console.log(parsedResponse)
    setUser(parsedResponse.data)
    alert(`Logged in as new user ${parsedResponse.data.username}`)
}
  const reqLogin = async (newLogin) =>{
    const apiResponse = await fetch(`${apiUrl}profile/login`, {
        method: 'POST',
        body: JSON.stringify(newLogin),
        headers: {
          "Content-Type": "application/json"
        }
  })
  const parsedResponse = await apiResponse.json()
  console.log(parsedResponse)
  setUser(parsedResponse.data)
}
  const followUser = async(userId, followingId)=>{
    const newFollowing ={
        ...user,
        following: [...user.following, followingId]
      
    }
    const apiResponse = await fetch(`${apiUrl}profile/${userId}`, {
      method: "PUT",
      body: JSON.stringify(newFollowing),
      headers: {
        "Content-Type": "application/json"
      }
      })
      const parsedResponse= await apiResponse.json()
      console.log(parsedResponse.data)
      setUser(parsedResponse.data)

  }
  const getPosts = async () =>{
    const apiResponse = await fetch(`${apiUrl}posts`)
  
    const parsedResponse = await apiResponse.json()
    console.log(parsedResponse.data)
    setPosts(
      parsedResponse.data
    )
  }
  console.log(user)
  const [value, setValue] = React.useState("1");
  const [showNew, setShowNew] = useState(false)
  const toggleNew = ()=>{
    setShowNew(!showNew)
  }
  const handleChange = (event, newValue) => {
      setValue(newValue);
  }
  const createNewPost= async (newPost)=>{
    try {
      console.log(newPost)
      const apiResponse = await fetch(`${apiUrl}posts`, {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
          "Content-Type": "application/json"
        }
      })
      await getPosts()
      // const parsedResponse = await apiResponse.json()
      // console.log(`response:${parsedResponse.data}`)
      // setPosts([...geoPosts, parsedResponse.data])
      console.log(apiResponse)
    } catch (err) {
      console.log(err)
    }
  }
  const deletePost = async (postId)=>{
    try{
    console.log(postId)
    const apiResponse = await fetch(`${apiUrl}posts/${postId}`,{
    method: "DELETE",
  })
  const parsedResponse = await apiResponse.json()

  console.log(parsedResponse)
  if(parsedResponse.success === true){
    const newPosts = geoPosts.filter(post=>post._id !== postId)
    console.log(newPosts)
    getPosts()
  }
  }catch(err){
    console.log(err)
  }}
  const updatePost = async(idToUpdate, postToUpdate)=>{
    console.log(postToUpdate)
    const apiResponse = await fetch(`${apiUrl}posts/${idToUpdate}`,{
      method: "PUT",
      body: JSON.stringify(postToUpdate),
      headers:{
        "Content-Type": "application/json"
      }
    })
    
    const parsedResponse = await apiResponse.json()
    const newPosts = geoPosts.map(post =>post._id===idToUpdate ? postToUpdate : post)
    await getPosts()
  }

  const likePost = async(idToLike, postToLike, userId, userLiked)=>{
    const apiResponse = await fetch(`${apiUrl}posts/${idToLike}`,{
      method: "PUT",
      body: JSON.stringify(postToLike),
      headers:{
        "Content-Type": "application/json"
      }
    
    })
    const newPosts = geoPosts.map(post =>post._id===idToLike ? postToLike : post)
    setPosts(newPosts)
    const updatedLikes = {
      ...user,
      likes: [...user.likes, idToLike]
    }
    const apiResponseUser = await fetch(`${apiUrl}profile/${userId}`,{
      method: "PUT",
      body: JSON.stringify(updatedLikes),
      headers:{
        "Content-Type": "application/json"
      }
    })
    setUser({
      ...user,
      likes: [...user.likes, idToLike]
    })
    console.log("user\n", user)
  }


  useEffect(getPosts, [])
  return (
    
    <div className="App">

      {
      !user._id ?
      <ReqLogin reqSignUp={reqSignUp} reqLogin={reqLogin}></ReqLogin>
      :
      
      <TabContext value={value}>
        <Box sx={{ width: '100%', bgcolor: 'black' }}>
          <TabList value={value} onChange={handleChange} centered>
            <Tab label="Popular" style={{color: 'Magenta'}}value="1"/>
            <Tab label="Following" style={{color: 'Magenta'}} value="2"/>
            <Tab label="Search" style={{color: 'Magenta'}}  value="3"/>
            <Tab label="Profile" style={{color: 'Magenta'}} value="4"/>
          </TabList>
        </Box>

      
        <TabPanel value='1'><PostContainer followUser={followUser} geoPosts={geoPosts} deletePost={deletePost} updatePost={updatePost} user={user} likePost={likePost}></PostContainer></TabPanel>
        <TabPanel value='2'><Followcontainer followUser={followUser} geoPosts={geoPosts} deletePost={deletePost} updatePost={updatePost} user={user} likePost={likePost}></Followcontainer></TabPanel>
        <TabPanel value='3'><SearchContainer followUser={followUser} geoPosts={geoPosts} deletePost={deletePost} updatePost={updatePost} user={user} likePost={likePost}></SearchContainer></TabPanel>
        <TabPanel value='4'><Profile followUser={followUser} geoPosts={geoPosts} deletePost={deletePost} updatePost={updatePost} user={user} likePost={likePost}></Profile></TabPanel>
        <NewPost createNewPost={createNewPost} user={user} auto={auto}></NewPost>
          
      </TabContext>

      
    }
    </div>

  );
 
}

export default App;
