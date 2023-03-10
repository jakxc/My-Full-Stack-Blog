import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/UseUser";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [formData, setFormData] = useState(
        {
            comment: ""
        }
    )
    const { user } = useUser();

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData(prevData => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    const addComment = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const res = await axios.post(`/api/articles/${articleName}/comments`, {
            text: formData.comment
        }, { headers });

        const updatedArticle = res.data;
        onArticleUpdated(updatedArticle);
        setFormData({
            comment: ""
        })
    }

    return (
        <div id="add-comment-form">
            <h3>Add A Comment</h3>
            {user && <p>You are commenting as {user.email}</p>}
            <textarea 
                rows="4" 
                cols="50"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
            />
            <button onClick={addComment}>Add Comment</button>
        </div>
    )
}

export default AddCommentForm;