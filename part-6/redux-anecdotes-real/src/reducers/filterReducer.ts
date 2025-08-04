import type { Action } from "redux";

export type FilterAction = {
  filter: string;
} & Action<"SET_FILTER">;

export function setFilterAction(filter: string): FilterAction {
  return {
    type: "SET_FILTER",
    filter,
  };
}

const filterReducer = (state = "", action: FilterAction) => {
  switch (action.type) {
    case "SET_FILTER":
      return action.filter;
    default:
      return state;
  }
};

export default filterReducer;
