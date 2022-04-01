
import Edit from './edit/edit'
import react, {useState} from "react";
import './individualpost.css'
import PostButton from './buttons/buttons';
import OwnerControls from './ownercontrolls/ownercontrols';

const IndividualPost = (props) =>{
    const[showCap, setShowCap] = useState(false)
    const[showForm, setShowForm]= useState(false)
    const showCaption = (e)=>{
        e.target.classList.toggle('show-caption')
    }
    const dontShowCaption = (e)=>{
        e.target.classList.remove('show-caption')
    }
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
        <div id="indiCont" style={{backgroundImage: `url(${props.post.image})`}}
        onMouseEnter={showCaption}
        onMouseLeave={dontShowCaption}>
            <div id="titles">
            <h3>{props.post.location}</h3>
            <h5>{props.post.shotwith}</h5>
            { props.user._id == props.post.user?
            <OwnerControls user={props.user} post={props.post} updatePost={props.updatePost} deletePost={props.deletePost}></OwnerControls>
        : null
        } 
            </div>
            <p id="caption">{props.post.caption}</p>
            <PostButton id="buttons"likePost={props.likePost} post={props.post} user={props.user}></PostButton>
        
        </div>
    )
}

export default IndividualPost