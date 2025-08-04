import { useDispatch, useSelector } from "react-redux";
import { setFilterAction } from "../reducers/filterReducer";
import type { RootState } from "../store";

export default function Filter() {
  const dispatch = useDispatch();
  const filter = useSelector((state: RootState) => state.filter);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setFilterAction(event.target.value));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input value={filter} onChange={handleChange} />
    </div>
  );
}
