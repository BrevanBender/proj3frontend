import react, {useState} from "react";
import FileBase64 from 'react-file-base64'
const NewPost = (props)=>{
    const [showNew, setShowNew] = useState(false)
    const toggleNew = ()=>{
      setShowNew(!showNew)
    }
    
    const[newPost, setNewPost] = useState({
        location: '',
        shotwith: '',
        caption: '',
        image: ''
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
        <div id="newForm">
        <button id="closeNew" onClick={toggleNew}>Close</button>
        <form onSubmit={(e)=>{
            e.preventDefault()
            props.createNewPost(newPost)
            setNewPost({
                location: '',
                shotwith: '',
                caption: '',
                image: ''
            })
            }}>
            Location: <input type='text'  name='location'onChange={handleInputChange} value={newPost.location}></input>
            Shot With: <input type='text'  name='shotwith'onChange={handleInputChange} value={newPost.shotwith}></input>
            Caption: <input type='text' name='caption' onChange={handleInputChange} value={newPost.caption}></input>
            Image: <FileBase64 multiple={false} onDone={({base64})=>setNewPost({...newPost, image: base64})} />
            <button type="submit">Post!</button>
        </form>
        </div>
        }   
    </div>
    )
}
export default NewPost