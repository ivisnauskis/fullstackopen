import React from "react";

const PersonForm = ({
  newName,
  number,
  handleNameChange,
  handleNumberChange,
  handleAddClick,
}) => {
  return (
    <div>
      <h3>add new</h3>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={number} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={handleAddClick}>
            add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
