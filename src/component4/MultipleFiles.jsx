import React, { useState, useEffect } from 'react';  

export default function MultipleFiles() {  
    const [name, setName] = useState("");  
    const [files, setFiles] = useState([]); // Changed to keep multiple files  
   
    const [arr, setArr] = useState(() => {  
        const storedData = localStorage.getItem("Data");  
        return storedData ? JSON.parse(storedData) : [];  
    });  


    const [editIndex, setEditIndex] = useState(null);  

    // Handle file changes  
    const handleFileChange = (e) => {  
        const selectedFiles = Array.from(e.target.files);  
        if (selectedFiles.length > 0) {  
            setFiles(selectedFiles);  
        }  
    }  

    // Handle form submission  
    const handleFormSubmit = (e) => {  
        e.preventDefault();  
        
        // Create URLs for the selected files  
        const fileURLs = files.map(file => URL.createObjectURL(file));  

        const newData = { Name: name, fileURL: fileURLs };  

        if (editIndex === null) {  
            setArr([...arr, newData]);  // spreding opreter no use aatela mte thy che ke data vadhre add krva mate....
        } else {  
            const updatedArr = [...arr];  
            updatedArr[editIndex] = newData;  
            setArr(updatedArr);  
            setEditIndex(null);  
        }  
        setName("");  
        setFiles([]);  
        e.target.reset(); // Reset the form  
    }  

    // Effect to store data in local storage  
    useEffect(() => {  
        localStorage.setItem("Data", JSON.stringify(arr));  
    }, [arr]);  

    // Handle delete action  
    const handleDelete = (arrIndex) => {  
        const updatedData = arr.filter((_, index) => arrIndex !== index);  
        setArr(updatedData);  
    }  

    // Handle edit action  
    const handleEdit = (index) => {  
        setEditIndex(index);  
        setName(arr[index].Name);  
        setFiles([]); // Optionally clear or set selected files here  
    }  

    return (  
        <div>  
            <h1>Multiple Files Upload...!!!</h1>  
            <form onSubmit={handleFormSubmit}>  
                <input   
                    type="text"   
                    placeholder='Enter the Name'   
                    value={name}   
                    onChange={(e) => setName(e.target.value)}  
                />  
                <br /><br />  
                <input type="file" multiple onChange={handleFileChange} />  
                <br /><br />  
               <button type="submit">{editIndex === null ? 'Submit' : 'Update'}</button>   
            </form>  
            <br /><br />  
            <table  style={{
    borderCollapse: "collapse",
    width: "100%",
    border: "2px solid black",
  }} cellPadding={10} cellSpacing={0}>  
                <thead>  
                    <tr>  
                        <th style={{ border: "2px solid black" }}>Sr No</th>  
                        <th style={{ border: "2px solid black" }}>Name</th>  
                        <th style={{ border: "2px solid black" }}>Images</th>  
                        <th style={{ border: "2px solid black" }}>Actions</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {arr.map((ele, index) => (  
                        <tr key={index}>  
                            <td style={{ border: "2px solid black" }}>{index + 1}</td>  
                            <td style={{ border: "2px solid black" }}>{ele.Name}</td>  
                            <td style={{ border: "2px solid black" }}>  
                                {ele.fileURL.map((image, imgIndex) => (  
                                    <li key={imgIndex} style={{ listStyle: "none" }}>  
                                        <img src={image} alt="" width="30%" />  
                                    </li>  
                                ))}  
                            </td>  
                            <td>  
                                <button onClick={() => handleEdit(index)}>Edit</button>  
                                <button onClick={() => handleDelete(index)}>Delete</button>  
                            </td>  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </div>  
    )  
}