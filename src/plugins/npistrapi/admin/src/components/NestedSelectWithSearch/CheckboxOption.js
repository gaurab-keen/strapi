import React from 'react';
const CheckboxOption = (props) => {
    const { children, isSelected, isFocused } = props;
    return (
      <div>
        <label>
          <input type="checkbox" checked={isSelected} onChange={() => null} />
          {children}
        </label>
      </div>
    );
  };
  
  export default CheckboxOption;