import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from 'axios';
import CommentsList from "./CommentsList";
import AddCommentForm from "./AddCommentForm";
import NotFound from "./NotFound";
import articles from '../article-content'
import useUser from "../hooks/UseUser";

const Article = () => {
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [], canUpvote: false });
    const { canUpvote } = articleInfo;
    const { articleId } = useParams();
    const { user, isLoading } = useUser();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const token = user && await user.getIdToken();
            const headers = token ? { authtoken: token } : {};
            const res = await axios.get(`/api/articles/${articleId}`, { headers });
            const newArticleInfo = res.data;
            setArticleInfo(newArticleInfo);
        }

        if (!isLoading) {
            loadArticleInfo();
        }
    }, [isLoading, user])


    const article = articles.find(article => article.name === articleId);

    const addUpvote = async () => {
        const token = user && await user.getIdToken();
        const headers = token ? { authtoken: token } : {};
        const res = await axios.put(`/api/articles/${articleId}/upvote`, null, { headers });
        const updatedArticle = res.data;
        setArticleInfo(updatedArticle);
    }

    if (!article)
    {
        return <NotFound />
    }

    return (
        <>
            <h1>{article.title}</h1>
            <div className="button-text-container">
                {user 
                    ? <button onClick={addUpvote}>{canUpvote ? "Upvote" : "Already Upvoted" }</button> 
                    : <Link to="/login"><button >Log in to upvote</button></Link>
                }
                <p>This article has {articleInfo.upvotes} upvotes(s)</p>
            </div>
            {article.content.map((paragraph, index) => {
                return <p key={index}>{paragraph}</p>
            })}
            
            {user  
                ? <AddCommentForm
                    articleName={articleId}  
                    onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)}
                /> 
                : <Link to="/login"><button>Log in to add a comment</button></Link>}
            <CommentsList comments={articleInfo.comments} />
        </>
    )
}

 export default Article;