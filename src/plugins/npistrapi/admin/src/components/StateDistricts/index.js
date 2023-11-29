import React, { useState, useEffect } from "react";
import { useFetchClient } from "@strapi/helper-plugin";
import "./MultiLevelDropdown.css"; // Import your CSS file for styling

// function MultiLevelDropdown() {
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [states, setStates] = useState([]);
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const { get } = useFetchClient();

//   useEffect(() => {
//     fetchStateData();
//   }, []);

//   const fetchStateData = async () => {
//     const requestedData = await get(`/npistrapi/getstates/`);
//     console.log("RequestedData::", JSON.stringify(requestedData.data));
//     setStates(requestedData.data);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleOptionClick = (value) => {
//     if (selectedValues.includes(value)) {
//       setSelectedValues(selectedValues.filter((val) => val !== value));
//     } else {
//       setSelectedValues([...selectedValues, value]);
//     }
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const selectChildren = (parentValue, isSelected) => {
//     const updatedSelectedValues = [...selectedValues];

//     if (isSelected) {
//       // Add parent and children to selected values
//       updatedSelectedValues.push(parentValue);
//       states
//         .find((group) => group.title === parentValue)
//         .districts.forEach((option) =>
//           updatedSelectedValues.push(option.title)
//         );
//     } else {
//       // Remove parent and children from selected values
//       updatedSelectedValues.splice(
//         updatedSelectedValues.indexOf(parentValue),
//         1
//       );
//       states
//         .find((group) => group.title === parentValue)
//         .districts.forEach((option) =>
//           updatedSelectedValues.splice(
//             updatedSelectedValues.indexOf(option.title),
//             1
//           )
//         );
//     }

//     setSelectedValues(updatedSelectedValues);
//   };

//   return (
//     <div>
//       {states.length > 0 && (
//         <div className="multi-dropdown">
//           <h1 onClick={toggleDropdown}>Toggle Dropdown</h1>
//           {isDropdownOpen && (
//             <div className="dropdown-content">
//               <input
//                 type="text"
//                 placeholder="Search options"
//                 value={searchQuery}
//                 onChange={(e) => handleSearch(e.target.value)}
//               />
//               {states.map((group) => (
//                 <div key={group.id}>
//                   <label>
//                     <input
//                       type="checkbox"
//                       value={group.title}
//                       checked={selectedValues.includes(group.title)}
//                       onChange={(e) =>
//                         selectChildren(group.title, e.target.checked)
//                       }
//                     />
//                     {group.title}
//                   </label>
//                   {group.districts.map((option) => (
//                     <label key={option.id}>
//                       <input
//                         type="checkbox"
//                         value={option.title}
//                         checked={selectedValues.includes(
//                           option.title
//                         )}
//                         onChange={() =>
//                           handleOptionClick(option.title)
//                         }
//                       />
//                       {option.title}
//                     </label>
//                   ))}
//                 </div>
//               ))}
//             </div>
//           )}
//           <div className="selected-values">
//             <h3>Selected Values:</h3>
//             {selectedValues.map((value) => (
//               <div key={value}>{value}</div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MultiLevelDropdown;

// function MultiLevelDropdown() {
//   const [selectedValues, setSelectedValues] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleOptionClick = (value) => {
//     if (selectedValues.includes(value)) {
//       setSelectedValues(selectedValues.filter((val) => val !== value));
//     } else {
//       setSelectedValues([...selectedValues, value]);
//     }
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const selectChildren = (parentValue, isSelected) => {
//     const updatedSelectedValues = [...selectedValues];

//     if (isSelected) {
//       // Add parent and children to selected values
//       updatedSelectedValues.push(parentValue);
//       states
//         .find((group) => group.label === parentValue)
//         .options.forEach((option) => updatedSelectedValues.push(option.value));
//     } else {
//       // Remove parent and children from selected values
//       updatedSelectedValues.splice(
//         updatedSelectedValues.indexOf(parentValue),
//         1
//       );
//       states
//         .find((group) => group.label === parentValue)
//         .options.forEach((option) =>
//           updatedSelectedValues.splice(
//             updatedSelectedValues.indexOf(option.value),
//             1
//           )
//         );
//     }

//     setSelectedValues(updatedSelectedValues);
//   };

// import React, { useState,useEffect } from 'react';
// import './MultiLevelDropdown.css'; // Import your CSS file for styling

// const initialOptions = [
//   {
//     id: 2,
//     attributes: {
//       title: "Bihar",
//       districts: {
//         data: [
//           {
//             id: 101,
//             attributes: {
//               title: "Patna",
//             },
//           },
//           {
//             id: 102,
//             attributes: {
//               title: "darbhanga",
//             },
//           },
//           {
//             id: 103,
//             attributes: {
//               title: "Madhubani",
//             },
//           },
//         ],
//       },
//     },
//   },
//   {
//     id: 3,
//     attributes: {
//       title: "Madhya Pradesh",
//       districts: {
//         data: [
//           {
//             id: 201,
//             attributes: {
//               title: "Bhopal",
//             },
//           },
//           {
//             id: 202,
//             attributes: {
//               title: "Gwalior",
//             },
//           },
//         ],
//       },
//     },
//   },
//   {
//     id: 4,
//     attributes: {
//       title: "Haryana",
//       districts: {
//         data: [
//           {
//             id: 301,
//             attributes: {
//               title: "Gurugram",
//             },
//           },
//           {
//             id: 302,
//             attributes: {
//               title: "Chandigarh",
//             },
//           },
//         ],
//       },
//     },
//   },
// ];


function MultiLevelDropdown({
  description,
  disabled,
  error,
  intlLabel,
  name,
  onChange,
  placeholder,
  required,
  value
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [states, setStates] = useState([]);
  const { get } = useFetchClient();
  useEffect(() => {
    if (value!=='null' && value!== undefined) {
      console.log("My value " + value);

      const parsedValue = JSON.parse(value);
      setSelectedValues(parsedValue);
    }
  }, []);
  useEffect(() => {
    fetchStateData();
  }, []);

  const fetchStateData = async () => {
    const requestedData = await get(`/npistrapi/getstates/`);
    console.log("RequestedData::", JSON.stringify(requestedData.data));
    setStates(requestedData.data);
  };

  useEffect(() => {
    if(selectedValues!==null){
      console.log("Use effect call after selection " + JSON.stringify(selectedValues));
      // Additional logic if needed
      // Notify the parent component of the change using the provided 'onChange' function
      onChange({
        target: { name, value: JSON.stringify(selectedValues), type: 'json' }
      });
    }
   
  }, [selectedValues]);


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleOptionClick = (value, stateId) => {
    const updatedSelectedValues = [...selectedValues];
  
    const stateIndex = updatedSelectedValues.findIndex(
      (state) => state.id === stateId
    );
  
    if (stateIndex !== -1) {
      const districtIndex = updatedSelectedValues[stateIndex].districts.findIndex(
        (district) => district.id === value.id
      );
  
      if (districtIndex !== -1) {
        // Remove the district from the selected state if it's present
        updatedSelectedValues[stateIndex].districts.splice(districtIndex, 1);
      } else {
        // Add the district to the selected state
        updatedSelectedValues[stateIndex].districts.push({
          id: value.id,
          // Add other district attributes as needed
        });
      }
    } else {
      // If the parent state is not present, add it along with the selected district
      updatedSelectedValues.push({
        id: stateId,
        districts: [
          {
            id: value.id,
            // Add other district attributes as needed
          },
        ],
      });
    }
  
    setSelectedValues(updatedSelectedValues);
  };
  
  const selectChildren = (parentValue, isSelected) => {
    const updatedSelectedValues = [...selectedValues];
    const stateIndex = updatedSelectedValues.findIndex(
      (state) => state.id === parentValue.id
    );
  
    if (isSelected) {
      // Add the selected state if it's not already present
      if (stateIndex === -1) {
        updatedSelectedValues.push({
          id: parentValue.id,
          districts: parentValue.districts.map((option) => ({
            id: option.id,
            // Add other district attributes as needed
          })),
        });
      } else {
        // Include the previously selected districts from the database
        const selectedDistrictsFromDB = selectedValues[stateIndex].districts;
        const updatedDistricts = parentValue.districts.map(
          (option) => {
            const selectedDistrict = selectedDistrictsFromDB.find(
              (district) => district.id === option.id
            );
            return selectedDistrict || { id: option.id };
          }
        );
        updatedSelectedValues[stateIndex].districts = updatedDistricts;
      }
    } else {
      // Remove the selected state if it's present
      if (stateIndex !== -1) {
        // Clear the selected districts for the unchecking parent
        updatedSelectedValues[stateIndex].districts = [];
        updatedSelectedValues.splice(stateIndex, 1);
      }
    }
  
    setSelectedValues(updatedSelectedValues);
  };
  
  
  
  const filteredOptions = states.filter((group) =>
    group.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    console.log("check 5",JSON.stringify(selectedValues)),
    <div className="multi-dropdown">
      <h1 onClick={toggleDropdown}>Show State</h1>
      {isDropdownOpen && (
        <div className="dropdown-content">
          <input
            type="text"
            placeholder="Search options"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
          />
          {filteredOptions.map((group) => (
            <div key={group.id}>
              <label>
                <input
                  type="checkbox"
                  value={group.title}
                  checked={selectedValues.some((state) => state.id === group.id)}
                  onChange={(e) => selectChildren(group, e.target.checked)}
                />
                {group.title}
              </label>
                  <div style={{ marginLeft: '15px' }}>
                  {group.districts.map((option) => (
                    <label key={option.id}>
                      <input
                        type="checkbox"
                        value={option.title}
                        checked={
                          selectedValues
                            .find((state) => state.id === group.id)
                            ?.districts.some(
                              (district) => district.id === option.id
                            ) || false
                        }
                        onChange={() => handleOptionClick(option, group.id)}
                      />
                {option.title}
              </label>
             ))}

              </div>
            </div>
          ))}
        </div>
      )}
     
    </div>
  );
}

export default MultiLevelDropdown;


