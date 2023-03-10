import articles from "../article-content";
import ArticlesList from "./ArticlesList";

const Articles = () => {
    return (
        <>
            <h1>Articles</h1>
            <ArticlesList articles={articles}/>
        </>

    )
}

 export default Articles;