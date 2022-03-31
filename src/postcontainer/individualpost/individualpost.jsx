import react, {useState} from "react";
import './individualpost.css'

const IndividualPost = (props) =>{
    console.log(`this is picture ${props.post}`)
    const[showForm, setShowForm]= useState(false)
    const toggleForm = ()=>{
        setShowForm(!showForm)
      }
    const[updatePost, setUpdatePost] = useState({
        location: props.post.location,
        shotwith: props.post.shotwith,
        caption: props.post.caption,
        image: props.post.image,
        _id: props.post._id
    })
    const handleInputChange = (e)=>{
        setUpdatePost({
            ...updatePost,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdatePost = (e)=>{
        e.preventDefault()
        props.updatePost(props.post._id, updatePost)
        //setshowing false and add ternary to update
    }
    return (
        <div id="indiCont" style={{backgroundImage: `url(${props.post.image})`}}>
            <h3>{props.post.location}</h3>
            <h5>{props.post.shotwith}</h5>
            <button onClick={()=>{
                console.log(props.post)
                props.deletePost(props.post._id)}
            }>Delete this</button>
        {
        !showForm ?
        
        <button onClick={toggleForm}>Update Post</button>
        :
        <form onSubmit={submitUpdatePost}>
            Location: <input type='text'  name='location'onChange={handleInputChange} value={updatePost.location}></input>
            Shot With: <input type='text'  name='shotwith'onChange={handleInputChange} value={updatePost.shotwith}></input>
            Caption: <input type='text' name='caption' onChange={handleInputChange} value={updatePost.caption}></input>
            
            <button type="submit">Update Post!</button>
            <button onClick={toggleForm}>x</button>
        </form>
        }
        </div>
    )
}

export default IndividualPost