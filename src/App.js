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


function App() {
  const [geoPosts, setPosts] = useState([])
  const getPosts = async () =>{
    const apiResponse = await fetch(apiUrl)
  
    const parsedResponse = await apiResponse.json()
    console.log(parsedResponse.data)
    setPosts(
      parsedResponse.data
    )
  }
  const [value, setValue] = React.useState("1");
  const [showNew, setShowNew] = useState(false)
  const toggleNew = ()=>{
    setShowNew(!showNew)
  }
  const handleChange = (event, newValue) => {
      setValue(newValue);
  }
  const createNewPost= async (newPost)=>{
    console.log(newPost)
    setPosts([newPost, ...geoPosts])
    console.log(geoPosts)
    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json"
      }

    })
    const parsedResponse = await apiResponse.json()
    console.log(parsedResponse)
  }
  const deletePost = async (postId)=>{
    try{
    const apiResponse = await fetch(`${apiUrl}${postId}`,{
    method: "DELETE",
  })
  const parsedResponse = await apiResponse.json()

  console.log(parsedResponse)
  if(parsedResponse.success === true){
    const newPosts = geoPosts.filter(post=>post._id !== postId)
    console.log(newPosts)
    setPosts(newPosts)
  }
  }catch(err){
    console.log(err)
  }}
  const updatePost = async(idToUpdate, postToUpdate)=>{
    const apiResponse = await fetch(`${apiUrl}${idToUpdate}`,{
      method: "PUT",
      body: JSON.stringify(postToUpdate),
      headers:{
        "Content-Type": "application/json"
      }
    })
    const parsedResponse = await apiResponse.json()
    const newPosts = geoPosts.map(post =>post._id===idToUpdate ? postToUpdate : post)
    setPosts(newPosts)
  }
  useEffect(getPosts, [])
  
  return (
  
    <div className="App">
      <TabContext value={value}>
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <TabList value={value} onChange={handleChange} centered>
            <Tab label="Popular" value="1"/>
            <Tab label="Following" value="2"/>
            <Tab label="Search" value="3"/>
          </TabList>
        </Box>
      
        <TabPanel value='1'><span>hey</span><PostContainer geoPosts={geoPosts} deletePost={deletePost} updatePost={updatePost}></PostContainer></TabPanel>
        <TabPanel value='2'><Followcontainer geoPosts={geoPosts}></Followcontainer></TabPanel>
        <TabPanel value='3'><SearchContainer geoPosts={geoPosts}></SearchContainer></TabPanel>
        

      </TabContext>

      {
        !showNew ?
        <button id="newButton" onClick={toggleNew}>+</button>
        :
        <div id="newPostForm">
          <NewPost createNewPost={createNewPost}></NewPost>
          <button id="closeNew" onClick={toggleNew}>Close</button>
        </div>
      }
    </div>
  );
}

export default App;
