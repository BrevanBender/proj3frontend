
import Edit from './edit/edit'
import React, {useEffect, useState} from "react";
import './individualpost.css'
import PostButton from './buttons/buttons';
import OwnerControls from './ownercontrolls/ownercontrols';
import apiUrl from '../../apiconfig';

const IndividualPost = (props) =>{
    const[showFollow, setShowFollow] = useState(false)
    const[showForm, setShowForm]= useState(false)
    const[postOwner, setPostOwner] = useState([])
    const[userLiked, setUserLike] = useState({
        username: props.user.username,
        email: props.user.email,
        password: props.user.password,
        likes: props.user.likes,
        following: props.user.following
    })
    const handleFollow = (id)=>{
        setUserLike({
            ...userLiked,
            following: [...userLiked.following, id]
        })
        console.log(userLiked)
    }
    const toggleModal =()=>{
        setShowFollow(!showFollow)
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
    // React.useEffect(() => {
    //     fetch(`${apiUrl}profile/${props.post.user}`)
    //       .then(results => results.json())
    //       .then(data => {
    //         setPostOwner(data.data.user);
    //     });
    //   }, []);
    console.log(props.user.following)
    console.log(props.post.user.id)
    return (
        <div id="indiCont" style={{backgroundImage: `url(${props.post.image})`}}
        onMouseEnter={showCaption}
        onMouseLeave={dontShowCaption}>
            <div id="titles">
            <div id="info">
            <h3>{props.post.location}</h3>
            <h5>{props.post.nearest}</h5>
            </div>
            { props.user._id == props.post.user.id?
            <OwnerControls id="ownerName" user={props.user} post={props.post} updatePost={props.updatePost} deletePost={props.deletePost}></OwnerControls>
        :   <div id='ifnotown'>
            <h4 id="ownerName" onClick={toggleModal}>{postOwner.username}</h4>
                <div id="useroptions">
                    <button id='gotouser' onClick={()=>{props.changeViews([props.post.user.id])}}>View {props.post.user.username}'s Page</button>
                    {props.user.following.includes(props.post.user.id)?
                    <button id='followuser' onClick={()=>{alert("You already Follow Them")}}>Following {postOwner.username}</button>
                    :
                    <button id='followuser' onClick={()=>{handleFollow(props.post.user.id); props.followUser(props.user._id, userLiked)}}>Follow {postOwner.username}</button>
                    }
                </div>
                </div>
        } 
            </div>
            <p id="caption">{props.post.caption}</p>
            <PostButton id="buttons"likePost={props.likePost} post={props.post} user={props.user} updatePost={props.updatePost}></PostButton>
        
        </div>
    )
}

export default IndividualPost