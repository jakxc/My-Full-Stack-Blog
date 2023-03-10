import { nanoid } from 'nanoid'

const CommentsList = ({ comments }) => {
    return (
        <>
            <h3>Comments</h3>
            {comments.map((comment) => {
                return (
                    <div className="comment" key={nanoid()}>
                        <h4>{comment.postedBy}</h4>
                        <p>{comment.text}</p>
                    </div>
                )
            })}
        </>
    )
}

export default CommentsList;