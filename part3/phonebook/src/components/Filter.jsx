import React from "react";

const Filter = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="query"
      value={value}
      onChange={onChange}
      placeholder="Search..."
    />
  );
};

export default Filter;
