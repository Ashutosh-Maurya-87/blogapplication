import  {React, useState, useEffect} from 'react'
import  axios  from "axios";
import { useSelector, useDispatch } from "react-redux";
import { selectUserInput, setBlogData } from '../UserSlice';
import '../component/blog.css';

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const blog_url=`https://gnews.io/api/v4/search?q=${searchInput}&
  token=93649b7d70d8c8c1467c8f07360be51c`;
 const dispatch = useDispatch();
 const [blogs, setBlogs] = useState();

 const [loading, setLoading]= useState(true);

 useEffect(() => {
     axios
     .get(blog_url)
     .then((response)=>{
         dispatch(setBlogData(response.data))
         setBlogs(response.data);
         setLoading(false);
     })
     .catch((error)=>{
         console.log(error);
     });
     
 }, [searchInput])
    return (
        <div className="blog-page">
            <h1 className="blog-page-header"> Blogs </h1>
            {
                loading ? <h1 className="loading">Loading...</h1> : ""
            }
            <div className = "blogs">
                {blogs?.articles?.map(blog=>(
                    <a className="blog" target="_blank" href={blog.url}>
                        <img src={blog.image} />
                        <div>
                            <h3 className="sourceName">
                                <span>{blog.source.name }</span>
                                <span>{blog.publishedAt}</span>
                            </h3>
                            <h1>{blog.title}</h1>
                            <p>{blog.description}</p>
                        </div>
                    </a>
                ))}
                { blogs?.totalArticles == 0  && (
                    <h1 className="no-blogs">
                        No blogs Available of this article .
                    </h1>
                ) }
            </div>
        </div>
    );
}

export default Blogs;
