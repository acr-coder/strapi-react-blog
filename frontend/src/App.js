import { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import axios from "axios";
import Details from "./pages/details";
import Category from "./pages/category";
import AddBlog from "./pages/addBlog";
import Header from "./components/header";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const result = await axios.get("http://localhost:1337/blogs");
        //console.log(result);
        setBlogs(result.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
      
    }
    fetchData();
    
  }, []);

  const addNewBlog = async (newBlog) => {
    console.log(newBlog)
    try {
      const result = await axios.post("http://localhost:1337/blogs", 
        newBlog
      )
      setBlogs([result.data, ...blogs])
      alert("New Blog is added")

    } catch (error) {
      console.log(error);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <h1>Blogs</h1>
            {blogs
              .sort((a, b) => b.created_at.localeCompare(a.created_at))
              .map((blog) => {
                return (
                  <div
                    style={{
                      width: "60%",
                      margin: "auto",
                      padding: "20px",
                      marginBottom: "15px",
                      border: "1px solid coral",
                      borderRadius: "10px",
                    }}
                    key={blog.id}
                  >
                    <h3>{blog.title}</h3>
                    <span>({blog.created_at.substring(0, 10)})</span>
                    <h5>{blog.author}</h5>
                    <p>{blog.body.substring(0, 70)}...</p>
                    <Link to={`/details/${blog.id}`}>
                      <button>View</button>
                    </Link>
                    <button>Edit</button>
                    <button>Delete</button>
                  </div>
                );
              })}
          </Route>
          <Route path="/details/:id">
            <Details />
          </Route>
          <Route path="/addblog">
            <AddBlog addNewBlog={addNewBlog} />
          </Route>
          <Route path="/category/:id">
            <Category />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
