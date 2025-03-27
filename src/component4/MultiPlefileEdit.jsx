import React, { useState, useEffect } from 'react'

export default function Practices() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [file, setFile] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

  const [arr, setArr] = useState(() => {
    const storedData = localStorage.getItem("Data");
    return storedData ? JSON.parse(storedData) : [];
  });

  // const [arr, setArr] = useState([]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    // selectedFile ? setFile(selectedFile) : "";
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && pass && file) {
      if (editIndex === null) {
        const fileURL = URL.createObjectURL(file);
        setArr([...arr, { name, pass, fileURL }]);
        console.log(arr);
      } else {
        const updatedData = [...arr];
        updatedData[editIndex] = {
          name: name,
          pass: pass,
          fileURL: file ? URL.createObjectURL(file) : arr[editIndex].file
        };

           setArr(updatedData);
      }
    } else {
      alert("Enter a Valid Values");
    }
    setName("");
    setPass("");
    setFile(null);
  };

  const handleDelete = (i) => {
    // console.log(i);
    const updatedData = [...arr];
    // console.log(updatedData);
    updatedData.splice(i, 1);
    setArr(updatedData);
  };

  const handleEdit = (i) => {
    // console.log(i);
    setEditIndex(i);
    setName(arr[i].name);
    setPass(arr[i].pass);
    setFile(arr[i].fileURL);
  };

  useEffect(() => {
    // console.log(arr);
    localStorage.setItem("Data", JSON.stringify(arr));
  }, [arr]);

  return (
    <div>
       <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Enter Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        <br />
        <br />
        <input type="file" onChange={handleFileChange} />
        <br />
        <br />
        <button type="submit">
          {editIndex === null ? "Submit" : "Update"}
        </button>
      </form>
      <br />
      <br />

 <table border={2} cellPadding={10} cellSpacing={0} width="100%">
        <thead>
          <tr>
            <th>Sr No</th>
            <th>Name</th>
            <th>Password</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {arr.map((ele, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{ele.name}</td>
              <td>{ele.pass}</td>
              <td>
                <img src={ele.fileURL} alt="" width="50%" />
              </td>
              <td>
                <button onClick={() => handleEdit(i)}>Edit</button>
                <button onClick={() => handleDelete(i)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}