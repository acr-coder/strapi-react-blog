import React, { useState, useEffect } from 'react'
import axios from "axios";
import { Link } from 'react-router-dom'

const Header = () => {
    const [categories, setCategories] = useState([])
    const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect( () => {
      async function fetchData(){
        setLoading(true);
        try {
          const result = await axios.get("http://localhost:1337/categories");
        //console.log(result.data);
        setCategories(result.data)
        setLoading(false);
          
        } catch (error) {
          setError(error);
      setLoading(false);
        }
      }
      fetchData()
        
    }, [])

    return (
        
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to="/" className="nav-link active" aria-current="page" >ALL BLOGS</Link>
        </li>
        <li className="nav-item">
        <Link to="/addblog" className="nav-link active" aria-current="page" >ADD BLOG</Link>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Category
          </a>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
              {
                 categories.map(category => {
                     return(
                        <li key={category.id} >
                            <Link to={`/category/${category.id}`} className="dropdown-item" >{category.name}</Link>
                            <hr className="dropdown-divider"></hr>
                            </li>
                     )
                    

                 }) 
              }
            
          </ul>
        </li>
        
      </ul>
      
    </div>
  </div>
</nav>

        // <nav style={{backgroundColor:"beige", padding:"10px",display:"flex", justifyContent:"space-around"}}>
        //     <Link to="/" ><span>All Blogs</span></Link>
        //     {categories.map(category => {
        //         return(
                    
        //                     <span key={category.id} >{category.name}</span>
                    
                    
        //         )
        //     })}
        // </nav>
    )
}

export default Header;
