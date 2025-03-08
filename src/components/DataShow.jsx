import React from 'react'

const DataShow = (props) => {
    console.log(props)
  return (
    <div>
      <h2>{props.name1}</h2>
      {props.arr1.map((ele,index)=>(
          <li key={index}>{ele}</li>
      ))}
    </div>
  )
}

export default DataShow
