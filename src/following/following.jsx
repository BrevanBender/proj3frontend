import react, {useState} from "react";
import IndividualPost from "../postcontainer/individualpost/individualpost";

const Followcontainer = (props)=>{


    const[followResult, setResult]= useState(props.geoPosts)
    const filteredArr=(e)=>{
        const followedArr = props.geoPosts.filter(post=>props.user.following.includes(post.location.toLowerCase()))
        setResult(followedArr)
    }




    return(
        <div>
        {followResult.length > 0 
            ?
            followResult.map((post)=>{
                return(
                <IndividualPost post={post} deletePost={props.deletePost} updatePost={props.updatePost} user={props.user} likePost={props.likePost}></IndividualPost>
                 
                )
            })
            :
            <h2>No Posts from</h2>
            }
        </div>
    )
}

export default Followcontainer