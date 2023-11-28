import React, { useState, useEffect } from "react";
import { useFetchClient } from "@strapi/helper-plugin";
import "./MultiLevelDropdown.css"; // Import your CSS file for styling

function MultiLevelDropdown() {
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [states, setStates] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { get } = useFetchClient();

  useEffect(() => {
    fetchStateData();
  }, []);

  const fetchStateData = async () => {
    const requestedData = await get(`/npistrapi/getstates/`);
    console.log("RequestedData::", JSON.stringify(requestedData.data));
    setStates(requestedData.data);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (value) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((val) => val !== value));
    } else {
      setSelectedValues([...selectedValues, value]);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const selectChildren = (parentValue, isSelected) => {
    const updatedSelectedValues = [...selectedValues];

    if (isSelected) {
      // Add parent and children to selected values
      updatedSelectedValues.push(parentValue);
      states
        .find((group) => group.title === parentValue)
        .districts.forEach((option) =>
          updatedSelectedValues.push(option.title)
        );
    } else {
      // Remove parent and children from selected values
      updatedSelectedValues.splice(
        updatedSelectedValues.indexOf(parentValue),
        1
      );
      states
        .find((group) => group.title === parentValue)
        .districts.forEach((option) =>
          updatedSelectedValues.splice(
            updatedSelectedValues.indexOf(option.title),
            1
          )
        );
    }

    setSelectedValues(updatedSelectedValues);
  };

  return (
    <div>
      {states.length > 0 && (
        <div className="multi-dropdown">
          <h1 onClick={toggleDropdown}>Toggle Dropdown</h1>
          {isDropdownOpen && (
            <div className="dropdown-content">
              <input
                type="text"
                placeholder="Search options"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {states.map((group) => (
                <div key={group.id}>
                  <label>
                    <input
                      type="checkbox"
                      value={group.title}
                      checked={selectedValues.includes(group.title)}
                      onChange={(e) =>
                        selectChildren(group.title, e.target.checked)
                      }
                    />
                    {group.title}
                  </label>
                  {group.districts.map((option) => (
                    <label key={option.id}>
                      <input
                        type="checkbox"
                        value={option.title}
                        checked={selectedValues.includes(
                          option.title
                        )}
                        onChange={() =>
                          handleOptionClick(option.title)
                        }
                      />
                      {option.title}
                    </label>
                  ))}
                </div>
              ))}
            </div>
          )}
          <div className="selected-values">
            <h3>Selected Values:</h3>
            {selectedValues.map((value) => (
              <div key={value}>{value}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MultiLevelDropdown;

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
