
import Edit from './edit/edit'
import React, {useEffect, useState} from "react";
import './individualpost.css'
import PostButton from './buttons/buttons';
import OwnerControls from './ownercontrolls/ownercontrols';
import apiUrl from '../../apiconfig';

const IndividualPost = (props) =>{
    const[showCap, setShowCap] = useState(false)
    const[showForm, setShowForm]= useState(false)
    const[postOwner, setPostOwner] = useState([])
    const findCreator= async(userId)=>{
        const apiResponse = await fetch(`${apiUrl}profile/${userId}`)
        const parsedResponse = await apiResponse.json()
        console.log(parsedResponse.data.user)
        setPostOwner([parsedResponse.data.user])
        console.log(postOwner)
      }
    
    const showCaption = (e)=>{
        e.target.classList.toggle('show-caption')
    }
    const dontShowCaption = (e)=>{
        e.target.classList.remove('show-caption')
    }
    const toggleForm = ()=>{
        setShowForm(!showForm)
      }
    const[updatePost, setUpdatePost] = useState({
        location: props.post.location,
        shotwith: props.post.shotwith,
        caption: props.post.caption,
        image: props.post.image,
        _id: props.post._id,
        user: props.post.user
    })
    const handleInputChange = (e)=>{
        setUpdatePost({
            ...updatePost,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdatePost = (e)=>{
        e.preventDefault()
        props.updatePost(props.post._id, updatePost)
        //setshowing false and add ternary to update
    }
    React.useEffect(() => {
        fetch(`${apiUrl}profile/${props.post.user}`)
          .then(results => results.json())
          .then(data => {
            setPostOwner(data.data.user);
        });
      }, []);
    return (
        <div id="indiCont" style={{backgroundImage: `url(${props.post.image})`}}
        onMouseEnter={showCaption}
        onMouseLeave={dontShowCaption}>
            <div id="titles">
            <div id="info">
            <h3>{props.post.location}</h3>
            <h5>{props.post.nearest}</h5>
            </div>
            { props.user._id == props.post.user?
            <OwnerControls id="ownerName" user={props.user} post={props.post} updatePost={props.updatePost} deletePost={props.deletePost}></OwnerControls>
        : <h4 id="ownerName">{postOwner.username}</h4>
        } 
            </div>
            <p id="caption">{props.post.caption}</p>
            <PostButton id="buttons"likePost={props.likePost} post={props.post} user={props.user} updatePost={props.updatePost}></PostButton>
        
        </div>
    )
}

export default IndividualPost