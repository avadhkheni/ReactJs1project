import React, { useEffect, useState } from 'react';  

// ...Spreeding operator-used to manage and manipulate props, arrays, and states

// Define Component and State Variables


export default function MultipleField() {  
    const [inputValue, setInputValue] = useState({  
        Name: "",  
        Email: "",  
        Password: "",  
        Country: "",  
        Gender: ""  
    });  

    const [file, setFile] = useState(null);  

      // arr: Stores submitted form data.
    const [arr, setArr] = useState(() => {  
        const storeData = localStorage.getItem("Data");  
        return storeData ? JSON.parse(storeData) : [];  
    });  

    // Edit States ///
    const [editIndex, setEditIndex] = useState(null);  

    //  handle file- Saves the selected file to state.
    const handleFileChange = (e) => {  
        const selectedFile = e.target.files[0];  
        if (selectedFile) {  
            setFile(selectedFile);  
        }  
    };  

        // handle Form Submission
//     Validates that all fields are filled.
// Uses URL.createObjectURL(file) to generate a temporary file URL.
// Appends new entry to arr using the spread operator.
// Resets form fields after submission


    const handleFileSubmit = (e) => {  
        e.preventDefault();  
        if (inputValue.Name && inputValue.Email && inputValue.Password && inputValue.Country && inputValue.Gender) {  
            const fileURL = file ? URL.createObjectURL(file) : null;  
            const newData = { ...inputValue, file: fileURL };  

            if (editIndex === null) {  
                setArr([...arr, newData]);  
            } else {  
                const updatedArr = [...arr];  
                updatedArr[editIndex] = newData;  
                setArr(updatedArr);  
                setEditIndex(null);  
            }  

            // Reset fields  
            setInputValue({  
                Name: "",  
                Email: "",  
                Password: "",  
                Country: "",  
                Gender: ""  
            });  
            setFile(null);  
        } else {  
            alert("Please fill all input fields");  
        }  
    };  


    // handle data delete -Uses filter() to remove an entry by index
   const handleDelete = (arrIndex) => {  
        const updatedData = arr.filter((_, index) => arrIndex !== index);  
        setArr(updatedData);  
    };  

    // handle Edit mate
    const handleEdit = (index) => {  
        setEditIndex(index);  
        setInputValue(arr[index]);  
    };  

        // Store Data in Local Storage-arr to localStorage 
    useEffect(() => {  
        localStorage.setItem("Data", JSON.stringify(arr));  
    }, [arr]);  

    return (  
        <div>  
            <h1>Multiple Field...!!!</h1>  
            {/* Create Form */}  
            <form onSubmit={handleFileSubmit}>  
                <input type="text" placeholder='Enter Your Name:' value={inputValue.Name} onChange={(e) => setInputValue({ ...inputValue, Name: e.target.value })} />  
                <br />  
                <br />  
                <input type="email" placeholder='Enter Your Email:' value={inputValue.Email} onChange={(e) => setInputValue({ ...inputValue, Email: e.target.value })} />  
                <br />  
                <br />  
                <input type="password" placeholder='Enter Your Password' value={inputValue.Password} onChange={(e) => setInputValue({ ...inputValue, Password: e.target.value })} />  
                <br />  
                <br />  
                <input type="file" onChange={handleFileChange} />  
                <br />  
                <br />  
                {/* Dropdown for Country Selection */}  
                <label htmlFor="">Country</label>  
                <select value={inputValue.Country} onChange={(e) => setInputValue({ ...inputValue, Country: e.target.value })}>  
                    <option value="">----Select----</option>  
                    <option value="India">INDIA</option>  
                    <option value="UK">UK</option>  
                    <option value="AUS">AUS</option>  
                    <option value="China">CHINA</option>  
                    <option value="Chicago">CHICAGO</option>  
                </select>  
                <br />  
                <br />  
                {/* Gender Radio Buttons */}  
                <label htmlFor="">Gender:</label>  
                <input type="radio" id='Male' name='Gender' value="Male" checked={inputValue.Gender === "Male"} onChange={(e) => setInputValue({ ...inputValue, Gender: e.target.value })} />  
                <label htmlFor="Male">Male</label>  
                <input type="radio" id="Female" name='Gender' value="Female" checked={inputValue.Gender === "Female"} onChange={(e) => setInputValue({ ...inputValue, Gender: e.target.value })} />  
                <label htmlFor="Female">Female</label>  
                <input type="radio" id='Other' name='Gender' value="Other" checked={inputValue.Gender === "Other"} onChange={(e) => setInputValue({ ...inputValue, Gender: e.target.value })} />  
                <label htmlFor="Other">Other</label>  
                <br />  
                <br />  
                <button type="submit">{editIndex === null ? 'Submit' : 'Update'}</button>  
            </form>  
            <hr />  
            <table border={2} cellSpacing={0} cellPadding={10}>  
                <thead>  
                    <tr>  
                        <th style={{ border: "2px solid black" }}>Sr No</th>  
                        <th style={{ border: "2px solid black" }}>Name</th>  
                        <th style={{ border: "2px solid black" }}>Email</th>  
                        <th style={{ border: "2px solid black" }}>Password</th>  
                        <th style={{ border: "2px solid black" }}>File</th>  
                        <th style={{ border: "2px solid black" }}>Country</th>  
                        <th style={{ border: "2px solid black" }}>Gender</th>  
                        <th style={{ border: "2px solid black" }}>Action</th>  
                    </tr>  
                </thead>  
                <tbody>  
                    {arr.map((ele, index) => (  
                        <tr key={index}>  
                            <td style={{ border: "2px solid black" }}>{index + 1}</td>  
                            <td style={{ border: "2px solid black" }}>{ele.Name}</td>  
                            <td style={{ border: "2px solid black" }}>{ele.Email}</td>  
                            <td style={{ border: "2px solid black" }}>{ele.Password}</td>  
                            <td style={{ border: "2px solid black" }}>  
                                <img src={ele.file} alt="" width="50px" />  
                            </td>  
                            <td style={{ border: "2px solid black" }}>{ele.Country}</td>  
                            <td style={{ border: "2px solid black" }}>{ele.Gender}</td>  
                            <td>  
                                <button onClick={() => handleEdit(index)}>Edit</button>  
                                <button onClick={() => handleDelete(index)}>Delete</button>  
                            </td>  
                        </tr>  
                    ))}  
                </tbody>  
            </table>  
        </div>  
    );  
}