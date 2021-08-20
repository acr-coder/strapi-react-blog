import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:1337/blogs/${id}`);
      setResult(res.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <div>
      <div
        style={{
          width: "60%",
          margin: "70px auto auto auto",
          padding: "20px",
          marginBottom: "15px",
          border: "1px solid coral",
          borderRadius: "10px",
        }}
        key={result.id}
      >
        <h3>{result.title}</h3>

        <h5>{result.author}</h5>
        <p>{result.body}</p>

        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default Details;
