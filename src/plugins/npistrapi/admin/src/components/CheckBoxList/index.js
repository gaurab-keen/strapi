
import React, { useEffect, useRef, useState } from "react";
import {Stack} from '@strapi/design-system'
import { NestedSelect } from "multi-nested-select";

let data1=[
  
 ]
 
const data = [
    {
      name: "Delhi",
      code: "d",
      count: 5,
      
      zones: [
        {
          code: "1",
          
          name: "South Delhi"
        },
        {
          code: "2",
       
          name: "North Delhi"
        },
        {
          code: "3",
         
          name: "East Delhi"
        },
        {
          code: "4",
          
          name: "North East Delhi"
        },
        {
          code: "5",
          
          name: "West Delhi"
        }
      ],
     
    },
    {
      name: "Utter Pradesh",
      code: "up",
      count: 5,
     
      zones: [
        {
          code: "6",
        
          name: "Noida"
        },
        {
          code: "7",
         
          name: "Lucknow"
        },
        {
          code: "8",
        
          name: "Varanasi"
        },
        {
          code: "9",
          
          name: "Kanpur"
        },
        {
          code: "10",
         
          name: "Muzaffar Nagar"
        }
      ],
     
    },
    {
      name: "Bihar",
      code: "b",
      count: 5,
     
      zones: [
        {
          code: "11",
        
          name: "Patna"
        },
        {
          code: "12",
         
          name: "Muzaffarpur"
        },
        {
          code: "13",
        
          name: "Darbhanga"
        },
        {
          code: "14",
          
          name: "Madhubani"
        },
        {
          code: "15",
         
          name: "Madhepura"
        }
      ],
     
    },
    {
      name: "Madhya Pradesh",
      code: "mp",
      count: 5,
     
      zones: [
        {
          code: "11",
        
          name: "Bhopal"
        },
        {
          code: "12",
         
          name: "Indore"
        },
        {
          code: "13",
        
          name: "Jabalpur"
        },
        {
          code: "14",
          
          name: "Chatterpur"
        },
        {
          code: "15",
         
          name: "Sagar"
        }
      ],
     
    }
  ];

const NestedList =  ({
    description,
    disabled,
    error,
    intlLabel,
    name,
    onChange,
    placeholder,
    required,
    value
  }) => {

    const ref = useRef();
    const [response, setResponse] = useState([]);
    const [selectvalue, setSelected] = useState(false);
 
    useEffect(()=>{
      data1=[]
     if(value!=undefined)
         {
          console.log("My data will show "+value)
          data1=JSON.parse(value)
          setSelected(true)
          
         }
         console.log("My data will show 11111"+data1)

    },[])
  
    
      const changebackFunction = (val) => {
        data1=val
        console.log(val);
        setResponse(val);
        createProps()

      };
      const createProps=(  ()=> {   
        console.log("check value of response from create"+response)
      //  try{
        description='';
        disabled=false;
        error='';
        intlLabel='';
        name=name;
        placeholder='';
        required=required;
        onChange=onChange({target: {name, value: JSON.stringify(response), type: 'json' }})
        value=response
      //  }catch(err){
      //   console.log("error of st value "+err)
      //  }
        
      })
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (ref.current && !ref.current.contains(event.target)) {
            // alert("sving fat");
          }
        };
        document.addEventListener("click", handleClickOutside, true);
        return () => {
          document.removeEventListener("click", handleClickOutside, true);
        };
      });
    
  return (
    console.log("on Return method "+JSON.stringify(data1)),
     <Stack horizontal spacing={4}>
     
     <NestedSelect
          enableButton={false}
          width={450}
          height={200}
          leading={true}
          placeholderCtx={true}
          trailing={true}
          trailingIcon={true}
          inputClass="myCustom_text"
          continent={false}
          selectAllOption={false}
          showCustomList={data}
          chip={false}
          dropDownClass="myCustom_dropbox"
          selectedValue={data1}
          onChange={(v) => changebackFunction( v)}
        />
     </Stack> 
  );
};
//For help to get data from Input
 
export default NestedList;

