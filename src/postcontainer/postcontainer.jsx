import React, {useState} from "react"
import IndividualPost from "./individualpost/individualpost"



const PostContainer = (props) =>{
    console.log(props.geoPosts)
    return(
        <div>
            
        {props.geoPosts.length > 0 
            ?
            props.geoPosts.map((post)=>{
                return(
                <IndividualPost post={post} deletePost={props.deletePost} updatePost={props.updatePost} user={props.user}></IndividualPost>
                 
                )
            })
            :
            <h2>There Aren't Any Posts To Share</h2>
            }
        </div>
         
        
    )

}

export default PostContainer