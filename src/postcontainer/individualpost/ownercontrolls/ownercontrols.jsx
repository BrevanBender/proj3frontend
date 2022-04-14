import Edit from "../edit/edit"
import '../individualpost'
import { useState } from "react"
const OwnerControls = (props)=>{

    
    
    return(
    <div>
        <Edit updatePost={props.updatePost} post={props.post}></Edit>
        { props.user._id == props.post.user.id?
            
        <div id='postOwner'>
            <button onClick={()=>{
                props.deletePost(props.post._id)}
            }>Delete this</button>
        
        </div>
        
            : null
        } 
    </div>
    )
}
export default OwnerControls