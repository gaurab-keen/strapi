
import React, { useEffect, useState } from "react";
import {Stack,MultiSelectNested} from '@strapi/design-system'

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

    const options = [{
      id:1,
      label: 'Banana',
      value: 'banana'
    }, {
      id:2,
      label: 'Green fruits',
      children: [{
        id:1,
        label: 'Apple',
        value: 'apple'
      }, {
        id:2,
        label: 'Avocado',
        value: 'avocado'
      }, {
        id:3,
        label: 'Kiwi',
        value: 'kiwi'
      }]
    }, {
      id:3,
      label: 'Orange fruits',
      children: [{
        id:4,
        label: 'Mango',
        value: 'mango'
      }, {
        id:5,
        label: 'Orange',
        value: 'orange'
      }]
    }, {
      id:4,
      label: 'Strawberry',
      value: 'strawberry'
    }];

    const [values, setValues] = useState([]);
    useEffect(()=>{
     
     if(value!=undefined)
         {
          console.log("My data will show "+value)
          setValues(value)
          
         }
         console.log("My data will show 11111"+value)

    },[])


    const createProps=(  ()=> {   
      console.log("check value of response from create"+values)
    //  try{
      description='';
      disabled=false;
      error='';
      intlLabel='';
      name=name;
      placeholder='';
      required=required;
      onChange=onChange({target: {name, value: JSON.stringify(values), type: 'json' }})
      value=values
    //  }catch(err){
    //   console.log("error of st value "+err)
    //  }
      
    })


    function handleOnChange(val){
      console.log("on Change value data will "+values)
      setValues(val)
      createProps()
    }

  return (
   // console.log("on Return method "+JSON.stringify(values)),
     <Stack horizontal spacing={4}>
       <MultiSelectNested label="Fruits" 
       required placeholder="My favourite fruit is..." 
       onClear={() => {
            setValues([]);
           }}
        value={values} 
        onChange={(v) => handleOnChange( v)}
        options={options} />
     </Stack> 
  );
};
//For help to get data from Input
 
export default NestedList;