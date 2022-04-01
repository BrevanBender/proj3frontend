import { useState } from "react"
import './buttons.css'

const PostButton = (props)=>{
    const[likedPost, setLikedPost] = useState({
        location: props.post.location,
        shotwith: props.post.shotwith,
        caption: props.post.caption,
        image: props.post.image,
        _id: props.post._id,
        likes: props.post.likes
    })
    const[userLiked, setUserLike] = useState({
        username: props.user.username,
        email: props.user.email,
        password: props.user.password,
        likes: props.user.likes
    })
    const handleLike = (e)=>{
        e.preventDefault()
        setLikedPost({
            ...likedPost,
            likes: likedPost.likes++
        })
        setUserLike({
            ...userLiked,
            likes: [...userLiked.likes, props.post._id]
        })
    }
    return(
        <div id="buttons">

            <form onSubmit={(e)=>{
                e.preventDefault()
                handleLike(e)
                props.likePost(e, props.post._id, likedPost, props.user._id, userLiked)
                console.log(props.user)
                return false
                }
                 } className='formStyling'>
                <button type="submit" className="formButtons">Likes <br />{props.post.likes}</button>
                </form>
            <form className='formStyling'>
                <button className="formButtons">Comment <br /> {props.post.comments.length}</button>
            </form>
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