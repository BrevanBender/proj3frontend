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
            <form className='formStyling' onSubmit={(e)=>{
                e.preventDefault()
                if(props.user.likes.includes(props.post._id)){
                    console.log("you have liked this post")
                }
            }}>
                <button className="formButtons">Comment <br /> <span></span></button>
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