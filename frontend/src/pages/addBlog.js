import React, { useState} from "react";


const AddBlog = ({ addNewBlog }) => {

    const [newBlog, setNewBlog ] = useState({
        title: "",
        body: "",
        author: "",
        category:""
        
        
    })

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setNewBlog(prevInput => {
            return(
                {
                    ...prevInput,
                    [name]:value
                }
            )
        })
    }

  return (
    <div className="container mt-3 p-5">
      <form>
        <div className="form-floating mb-3">
          <input
          onChange={changeHandler}
          value={newBlog.title}
            type="text"
            name="title"
            className="form-control"
            autoComplete="off"
            id="title"
            placeholder="name@example.com"
          />
          <label htmlFor="title">Title</label>
        </div>
        <div className="form-floating mb-3">
          <input
          onChange={changeHandler}
          value={newBlog.author}
            type="text"
            name="author"
            className="form-control"
            autoComplete="off"
            id="author"
            placeholder="Password"
          />
          <label htmlFor="author">Author</label>
        </div>
        <div className="form-floating mb-3">
          <textarea
          onChange={changeHandler}
          value={newBlog.body}
            type="text"
            name="body"
            className="form-control"
            autoComplete="off"
            id="body"
            placeholder="Password"
          />
          <label htmlFor="body">Body</label>
        </div>
        <div className="form-floating">
          <select
          onChange={changeHandler}
          value={newBlog.categories}
            className="form-select"
            name="category"
            id="category"
            autoComplete="off"
            aria-label="Floating label select example"
          >
            <option defaultValue="default">Open this select menu</option>
            <option value="Frontend">Frontend</option>
            <option value="Backend">Backend</option>
            <option value="FullStack">FullStack</option>
            <option value="Database">Database</option>
            <option value="Mobile">Mobile</option>
          </select>
          <label htmlFor="floatingSelect">Works with selects</label>
        </div>
        <button type="button" 

        onClick={() => (
          addNewBlog(newBlog),
          setNewBlog({
            title:"",
            author:"",
            body:"",
            category:""

          })
        )}
        
        className="btn btn-primary mt-3 w-50">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddBlog;
