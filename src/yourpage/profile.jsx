import { useEffect, useState } from "react"
import IndividualPost from "../postcontainer/individualpost/individualpost"

const Profile=(props)=>{
    const[showingState, setShowingState] = useState(false)
    const[yourResult, setResult]= useState(props.geoPosts)
    const toggleShow = (change) =>{
        setShowingState(change)
    }
    const filterYourPosts = ()=>{
    const yourPostArr = props.geoPosts.filter(post=>props.user._id === post.user.id)
        setResult(yourPostArr)
    console.log(yourResult)
    }
    const[likedPosts, setLiked]= useState(props.geoPosts)
    const filterLikedPosts = ()=>{
    const likedArr = props.geoPosts.filter(post=>props.user.likes.includes(post._id))
        setLiked(likedArr)
    }   
    useEffect(filterYourPosts, [])
    useEffect(filterLikedPosts, [])
    return(
        <div>
            <h2>Welcome {props.user.username}!</h2>

            <button onClick={()=>{toggleShow(false)}}>Your Posts</button><button onClick={()=>{toggleShow(true)}}>Posts You Liked</button>
            {!showingState
                ?
                yourResult.map((post)=>{
                    return(
                        <IndividualPost followUser={props.followUser} post={post} deletePost={props.deletePost} updatePost={props.updatePost} user={props.user} likePost={props.likePost}></IndividualPost>
                        )
                })
            :
                likedPosts.map((post)=>{
                    return(
                    <IndividualPost followUser={props.followUser} post={post} deletePost={props.deletePost} updatePost={props.updatePost} user={props.user} likePost={props.likePost} ></IndividualPost>
                    )
                })
            }


        </div>
    )
}
export default Profile