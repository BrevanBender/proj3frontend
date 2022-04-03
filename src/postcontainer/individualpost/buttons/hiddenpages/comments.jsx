const CommentCont =(props)=>{
    console.log(props.post.comments)
    return(
    <div id="comments">
                {props.post.comments.length === 0?
                    <h2 id="emptyCall">No Comments Yet</h2>
                    :
                <div id="oldcomments">
                    {props.post.comments.map((comment)=>{
                        return(
                            <p>{comment}</p>
                            )
                        })}
                        </div>
                    }
            
                
                <form action="" onSubmit={props.submitCommentPost}>
                    <input type="text" onChange={props.handleCommentChange}/>
                    <button type="submit">Post Comment!</button>
                </form>
    </div>
    )
}
export default CommentCont