import React, { useState } from 'react';  

function Counter() {  
  const [count, setCount] = useState(0);  

  return (  
    <div >  
        <br /><br />
        <hr /><hr />
        <div class="cont">
      <div class="row">
      <p>Count: {count}</p>  
      <button class="btn1" onClick={() => setCount(count + 1)}>Increment</button>  
      <button class="btn2" onClick={() => setCount(count - 1)}>Decrement</button>  
      </div>
      </div>
    </div>  
  );  
}  

export default Counter;