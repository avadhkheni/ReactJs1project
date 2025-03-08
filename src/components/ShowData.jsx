import React from 'react'

const ShowData = (props) => {
    console.log(props)
  return (
    <div>
        <hr /><hr />
        <br /><br />
      <table border={2} cellSpacing={0} width="100%">
        <thead>
            <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Age</th>
                <th>City</th>
                <th>arr</th>
            </tr>
        </thead>
        <tbody>
            {props.obj1.map((ele,index)=>(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.age}</td>
                    <td>{ele.city}</td>
                    <td>{ele.aa}</td>   
                </tr>
            ))}
        </tbody>
      </table>
      
    </div>
  )
}

export default ShowData
