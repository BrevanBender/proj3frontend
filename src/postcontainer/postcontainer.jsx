import React, {useState} from "react"
import IndividualPost from "./individualpost/individualpost"



const PostContainer = (props) =>{
    const[desiredPosts, setDesiredPosts]= useState([])
    console.log(desiredPosts)
    const changeViews = (desiredArray)=>{
        const filteredArr= props.geoPosts.filter(post=> desiredArray.includes(post.user.id))
        setDesiredPosts(filteredArr)
        console.log(filteredArr)
        }
    const clearViews = ()=>{
        setDesiredPosts([])
    }
    return(
        
        <div>
          
        {desiredPosts.length 
            ?
            <div>
            <h2>{desiredPosts[0].user.username}'s Posts</h2>
            <button onClick={()=>{clearViews()}}>Back to all Posts</button>
            {desiredPosts.map((post)=>{
                return(
                <IndividualPost followUser={props.followUser} post={post} deletePost={props.deletePost} updatePost={props.updatePost} user={props.user} likePost={props.likePost} changeViews={changeViews}></IndividualPost>
                 
                )
            })}
            </div>
            :
            
            <div>
                <h1>All Posts!</h1>
                {props.geoPosts.map((post)=>{
                return(
                <IndividualPost followUser={props.followUser} post={post} deletePost={props.deletePost} updatePost={props.updatePost} user={props.user} likePost={props.likePost} changeViews={changeViews}></IndividualPost>
                 
                )
            })
        }
            </div>
        
        }
        </div>
         
        
    )

}

export default PostContainer