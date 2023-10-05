import React, { useState } from 'react';
import Select from 'react-select';
import CheckboxOption from './CheckboxOption'

const options = [
  {
    label: 'Fruits',
    value:'chek1',
    options: [
      { value: 'apple', label: 'Apple' },
      { value: 'banana', label: 'Banana' },
      { value: 'cherry', label: 'Cherry' },
    ],
  },
  {
    label: 'Vegetables',
    value:'chek2',
    options: [
      { value: 'carrot', label: 'Carrot' },
      { value: 'broccoli', label: 'Broccoli' },
      { value: 'spinach', label: 'Spinach' },
    ],
  },
  // Add more categories and options as needed
];

const NestedSelectWithSearch = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = (selectedValues) => {
    setSelectedOptions(selectedValues);
  };

  const customFilterOption = (option, rawInput) => {
    const inputValue = rawInput.trim().toLowerCase();
    const label = option.label.toLowerCase();

    return label.includes(inputValue);
  };

  return (
    <div>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={handleChange}
        filterOption={customFilterOption}
        placeholder="Search and select..."
        isSearchable
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}

        closeMenuOnSelect={false}
        components={{ Option: CheckboxOption }}
      />
      <div>
   
        <ul>
          {selectedOptions.map((option) => (
            <li key={option.value}>{option.label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NestedSelectWithSearch;
