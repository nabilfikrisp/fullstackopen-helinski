type PersonFormProps = {
  newName: string;
  newNumber: string;
  onAddNew: (event: React.FormEvent) => void;
  setNewName: (name: string) => void;
  setNewNumber: (number: string) => void;
};

const PersonForm = ({
  newName,
  newNumber,
  onAddNew,
  setNewName,
  setNewNumber,
}: PersonFormProps) => (
  <form onSubmit={onAddNew}>
    <div>
      name:{" "}
      <input
        value={newName}
        onChange={(event) => setNewName(event.target.value)}
      />
    </div>
    <div>
      number:{" "}
      <input
        value={newNumber}
        onChange={(event) => setNewNumber(event.target.value)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);

export default PersonForm;
