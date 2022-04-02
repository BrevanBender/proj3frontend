import { useState } from "react"
import './buttons.css'

const PostButton = (props)=>{
    const[likedPost, setLikedPost] = useState({
        location: props.post.location,
        shotwith: props.post.shotwith,
        caption: props.post.caption,
        image: props.post.image,
        _id: props.post._id,
        likes: props.post.likes,
        comments: props.post.comments
    })
    const[userLiked, setUserLike] = useState({
        username: props.user.username,
        email: props.user.email,
        password: props.user.password,
        likes: props.user.likes,
        following: props.user.following
    })
    const[showComment, setShowComment]= useState(false)
    const toggleComments =(e)=>{
        e.preventDefault()
        setShowComment(!showComment)
    }
    const handleCommentChange = (e)=>{
        
        setLikedPost({
            ...likedPost,
            comments: [e.target.value, ...props.post.comments]
        })
        console.log(likedPost.comments)
    }
    const handleLike = ()=>{
        console.log(`before ${likedPost.likes}`)
        setLikedPost({
            ...likedPost,
            likes: likedPost.likes++
        })
        setUserLike({
            ...userLiked,
            likes: [...userLiked.likes, props.post._id]
        
        })
        console.log(`liked post ${likedPost.likes}`)
    }

    const submitCommentPost = (e)=>{
        e.preventDefault()
        props.updatePost(props.post._id, likedPost)
        setShowComment(false)
        //setshowing false and add ternary to update
    }

    return(
        <div id="buttons">
            <form onSubmit={(e)=>{
                if(props.user.likes.includes(props.post._id)){
                    alert('You have already Liked this post')
                
                }else{
                   handleLike()
                props.likePost(props.post._id, likedPost, props.user._id, userLiked)

                }
                e.preventDefault()
            }} className='formStyling'>
                <button type="submit" className="formButtons">Likes <br />{props.post.likes}</button>
                </form>
            <form className='formStyling'>
                <button className="formButtons" onClick={toggleComments}>Comment <br /> <span></span></button>
            </form>
            {showComment?
            <div id="comments">
                {props.post.comments.map((comment)=>{
                    return(
                        <p>{comment}</p>
                    )
                })}
                <form action="" onSubmit={submitCommentPost}>
                    <input type="text" onChange={handleCommentChange}/>
                    <button type="submit"></button>
                </form>
            </div>
            :
            <></>
            }
            <form className='formStyling'>
                <button className="formButtons">Share <br /><span></span></button>
            </form>
            <form className='formStyling'>
                <button className="formButtons">... <br /><span></span></button>
            </form>
        </div>
    )
}
export default PostButton