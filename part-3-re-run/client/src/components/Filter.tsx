type FilterProps = {
  filter: string;
  setFilter: (filter: string) => void;
};

const Filter = ({ filter, setFilter }: FilterProps) => (
  <div>
    filter shown with{" "}
    <input value={filter} onChange={(event) => setFilter(event.target.value)} />
  </div>
);

export default Filter;
