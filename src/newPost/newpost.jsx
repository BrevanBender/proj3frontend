import react, {useState} from "react";
import FileBase64 from 'react-file-base64'
import './newpost.css'
const NewPost = (props)=>{
    const [showNew, setShowNew] = useState(false)
    const toggleNew = ()=>{
      setShowNew(!showNew)
    }
   
    const[newPost, setNewPost] = useState({
        location: '',
        nearest: '',
        shotwith: '',
        caption: '',
        image: '',
        user: {id:`${props.user._id}`, username: `${props.user.username}`}
    })
    const handleInputChange = (e)=>{
        setNewPost({
            ...newPost,
            [e.target.name]: e.target.value
        })
    }
    return(
    <div className="newpost">
        {!showNew ?
        <button id="newButton" onClick={toggleNew}>+</button>
        :
        <div id="newform">
        <button id="closeNew" onClick={toggleNew}>X</button>
        <form onSubmit={(e)=>{
            e.preventDefault()
            props.createNewPost(newPost)
            setNewPost({
                location: '',
                nearest: '',
                shotwith: '',
                caption: '',
                image: '',
                user: {id:`${props.user._id}`, username: `${props.user.username}`}
            })
            }}>
            Location: <input type='text'  name='location'onChange={handleInputChange} value={newPost.location}></input>
            <br />
            Nearest City: <input type='text'  name='nearest'onChange={handleInputChange} value={newPost.nearest}></input>
            <br />
            Shot With: <input type='text'  name='shotwith'onChange={handleInputChange} value={newPost.shotwith}></input>
            <br />
            Caption: <input type='text' name='caption' onChange={handleInputChange} value={newPost.caption}></input>
            <br />
            Image: <FileBase64 multiple={false} onDone={({base64})=>setNewPost({...newPost, image: base64})} />
            <br />
            <button type="submit">Post!</button>
        </form>
        </div>
        }   
    </div>
    )
}
export default NewPost