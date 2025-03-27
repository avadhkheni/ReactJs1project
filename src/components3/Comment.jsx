import React, { useState } from "react";

export default function Comment() {
  const [input, setInput] = useState({
    Name: "",
    Comment: "",
  });

  const [arr, setArr] = useState(() => {
    let storedData = localStorage.getItem("User_data");
    return storedData ? JSON.parse(storedData) : [];
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = [...arr, input];
    localStorage.setItem("User_data", JSON.stringify(newData));
    setArr(newData);
    setInput({ Name: "", Comment: "" });
  };

  return (
    <div style={{ width: "400px", margin: "auto", padding: "20px", borderRadius: "10px", boxShadow: "0px 0px 10px rgba(0,0,0,0.1)", background: "white" }}>
      <h1 style={{ textAlign: "center", fontSize: "30px" }}>Name & Comments</h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter Name"
          value={input.Name}
          onChange={(e) => setInput({ ...input, Name: e.target.value })}
          style={{ padding: "10px", border: "1px solid gray", borderRadius: "5px" }}
        />
        <textarea
          value={input.Comment}
          onChange={(e) => setInput({ ...input, Comment: e.target.value })}
          placeholder="Enter Comment"
          style={{ padding: "10px", border: "1px solid gray", borderRadius: "5px", resize: "none", height: "80px" }}
        />
        <button type="submit" style={{ padding: "10px", background: "black", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
          Submit
        </button>
      </form>

      <h2 style={{ marginTop: "20px", fontSize: "18px" }}>Comments</h2>

      <div style={{ marginTop: "10px" }}>
        {arr.map((ele, index) => (
          <div key={index} style={{ display: "flex", alignItems: "flex-start", padding: "10px", border: "1px solid #ddd", borderRadius: "5px", marginBottom: "10px", position: "relative" }}>
            <div style={{ background: "#ccc", borderRadius: "50%", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "bold", marginRight: "10px" }}>
              {ele.Name.charAt(0).toUpperCase()}
            </div>

            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: "bold", margin: 0 }}>{ele.Name}</p>
              <p style={{ margin: "5px 0" }}>{ele.Comment}</p>
              <div style={{ display: "flex", gap: "10px", color: "gray", fontSize: "14px", cursor: "pointer" }}>
                <span>👍 Like</span>
                <span>💬 Reply</span>
              </div>
            </div>
            <div style={{ cursor: "pointer", fontSize: "20px", marginLeft: "10px" }}>
               ⋮
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}