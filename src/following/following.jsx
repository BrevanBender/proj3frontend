import react, {useEffect, useState} from "react";
import IndividualPost from "../postcontainer/individualpost/individualpost";

const Followcontainer = (props)=>{


    const[followResult, setResult]= useState(props.geoPosts)
    const filterPosts = ()=>{
    const followedArr = props.geoPosts.filter(post=>props.user.following.includes(post.user.id))
        setResult(followedArr)
console.log(followResult)
    }


    useEffect(filterPosts , [])
    return(
        <div>
        <h2>Posts from Accounts You Follow!</h2>
        {followResult.length > 0 
            ?
            followResult.map((post)=>{
                return(
                <IndividualPost post={post} deletePost={props.deletePost} updatePost={props.updatePost} user={props.user} likePost={props.likePost}></IndividualPost>
                 
                )
            })
            :
            <></>
            }
        </div>
    )
}

export default Followcontainer