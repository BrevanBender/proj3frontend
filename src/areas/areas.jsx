import react, {useState} from "react";
import IndividualPost from "../postcontainer/individualpost/individualpost";

import './areas.css'
const SearchContainer = (props)=>{
    const[searchResult, setResult]= useState(props.geoPosts)
    const filteredArr=(e)=>{
        const searchedArr = props.geoPosts.filter(post=>post.location.toLowerCase().includes(e.target.value.toLowerCase()))
        setResult(searchedArr)
    }

    return(
        <div>
        <form action="" >
            <input type="text" placeholder="Search Locations" onChange={filteredArr} />
        </form>
        {searchResult.length > 0 
            ?
            searchResult.map((post)=>{
                return(
                <IndividualPost post={post} deletePost={props.deletePost} updatePost={props.updatePost} user={props.user} likePost={props.likePost}></IndividualPost>
                 
                )
            })
            :
            <h2>There Aren't Any Posts To Share</h2>
            }
        </div>
    )
}
export default SearchContainer