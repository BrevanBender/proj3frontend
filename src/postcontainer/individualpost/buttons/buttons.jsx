import { useState } from "react"

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
            <section onClick={()=>{
                handleLike()
                props.likedPost(props.post._id, likedPost, props.user._id, userLiked)
            }}>
                Likes
                {props.post.likes}
            </section>
            <section>
                Comments
            </section>
            <section>
                Share
            </section>
            <section>
                ...
            </section>
        </div>
    )
}
export default PostButton