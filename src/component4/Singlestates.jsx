import React ,{useEffect, useState} from 'react'


export default function Singlestates() {
    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
  
    
    const [arr, setArr] = useState(() => {
      let storedData = localStorage.getItem('user_data');
      return storedData ? JSON.parse(storedData) : [];
    });
  
    useEffect(() => {
      localStorage.setItem('user_data', JSON.stringify(arr));
    }, [arr]);
  
    const [editIndex, setEditIndex] = useState(null);
  
    const handleForm = (e) => {
      e.preventDefault();
      
      if (editIndex !== null) {
        // Edit mode update kare
        const updatedData = [...arr];
        updatedData[editIndex] = { Name, Email, Password };
        setArr(updatedData);
        setEditIndex(null);
      } else {
        // New data add kare
        setArr([...arr, { Name, Email, Password }]);
      }
      
      setName('');
      setEmail('');
      setPassword('');
    };
  
    const handleDelete = (index) => {
      const updatedData = arr.filter((_, i) => i !== index);
      setArr(updatedData);
    };
  
    const handleEdit = (index) => {
      setEditIndex(index);
      setName(arr[index].Name);
      setEmail(arr[index].Email);
      setPassword(arr[index].Password);
    };
  
  return (
    <div>
       <h1>SingleStates Form...!!!</h1>
      <form onSubmit={handleForm}>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />
        <input
          type="email"
          placeholder="Enter Your Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <input
          type="password"
          placeholder="Enter your Password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <br />
        <button type="submit">{editIndex === null ? 'Submit' : 'Update'}</button>
      </form>

      <br />
      <br />

      <table border={2} cellSpacing={0}>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {arr.map((ele, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{ele.Name}</td>
              <td>{ele.Email}</td>
              <td>{ele.Password}</td>
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
