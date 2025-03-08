import React from 'react'

const Company = (props) => {
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
                <th>position</th>
                <th>department</th>
                <th>salary</th>
                
            </tr>
        </thead>
        <tbody>
            {props.employee1.map((ele,index)=>(
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.position}</td>
                    <td>{ele.department}</td>
                    <td>{ele.salary}</td>   
                </tr>
            ))}
        </tbody>
      </table>

    </div>
  )
}

export default Company
