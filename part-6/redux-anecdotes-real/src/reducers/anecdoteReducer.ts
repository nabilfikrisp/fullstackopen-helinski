import type { Action } from "redux";
import type { Anecdote } from "../types/anecdote.type";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote: string) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

export type AnecdoteAction = {
  data: Partial<Anecdote>;
} & Action<"VOTE" | "NEW_ANECDOTE">;

export function voteAction(id: Anecdote["id"]): AnecdoteAction {
  return {
    type: "VOTE",
    data: { id },
  };
}

export function newAnecdoteAction(content: string): AnecdoteAction {
  return {
    type: "NEW_ANECDOTE",
    data: { content, id: getId(), votes: 0 },
  };
}

const reducer = (state = initialState, action: AnecdoteAction) => {
  switch (action.type) {
    case "VOTE": {
      const id = action.data.id;
      const anecdoteToVote = state.find((a) => a.id === id);
      if (anecdoteToVote) {
        const updatedAnecdote = {
          ...anecdoteToVote,
          votes: anecdoteToVote.votes + 1,
        };
        return state.map((a) => (a.id !== id ? a : updatedAnecdote));
      }
      return state;
    }

    case "NEW_ANECDOTE": {
      if (!action.data.content) {
        return state; // No content provided, do not add a new anecdote
      }
      const newAnecdote = {
        content: action.data.content,
        id: getId(),
        votes: 0,
      };
      return [...state, newAnecdote];
    }

    default:
      return state;
  }
};

export default reducer;
