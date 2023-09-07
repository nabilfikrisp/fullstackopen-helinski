import React from "react";

const PersonForm = ({ onSubmit, onChange, newPerson }) => {
  return (
    <form onSubmit={onSubmit}>
      <h2>add a new</h2>
      <div>
        name:
        <input name="name" value={newPerson.name} onChange={onChange} />
        <br></br>
        number:
        <input name="number" value={newPerson.number} onChange={onChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
