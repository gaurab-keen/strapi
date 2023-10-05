import React, { useEffect, useRef, useState } from "react";

const CheckBoxInput =  (props) => {
    const [status,setStatus]=useState(false)
    const [textMessage,setTextMessage]=useState('')
  
      return (
          <div>
          <input type="checkbox" id ={props.data.code} checked={props.data.status} value={props.data.name}/>
        </div>
      )
    
  }
  export default CheckBoxInput;