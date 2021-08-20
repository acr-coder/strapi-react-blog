import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios';

const Category = () => {
    const { id } = useParams()
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ res, setRes ] = useState({})
    

    useEffect( () => {
      async function fetchData(){
        setLoading(true)
        try {
          const result = await axios.get(`http://localhost:1337/categories/${id}`);
          setRes(result.data)
          setLoading(false)
        } catch (error) {
          setError(error)
          setLoading(false);
        }

      }
      fetchData()
       
    }, [id])

    if(loading) return <p>Loading...</p>
    if(error) return <p>Error</p>
    
    
    return (
        <div>
            <h1>{res.name}</h1>
        {
        res.blogs.map(blog => {
          return(
            <div style={{width:"60%", margin:"auto",padding:"20px", marginBottom:"15px", border:"1px solid coral", borderRadius:"10px"}} key={blog.id} >
              <h3>{blog.title}</h3>
              <span>({blog.created_at.substring(0,10)})</span>
              <h5>{blog.author}</h5>
              <p>{blog.body.substring(0,70)}...</p>
              <Link to={`/details/${blog.id}`}><button>View</button></Link>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )
        })
      }    
        </div>
    )
}

export default Category
