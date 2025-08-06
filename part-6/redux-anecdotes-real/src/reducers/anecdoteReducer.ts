import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Anecdote } from "../types/anecdote.type";
import { getId } from "../services/anecdotes";

// const asObject = (anecdote: string) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0,
//   } as Anecdote;
// };

const initialState: Anecdote[] = [];

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: initialState,
  reducers: {
    voteAnecdote: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const anecdoteToVote = state.find((a) => a.id === id);
      if (anecdoteToVote) {
        anecdoteToVote.votes += 1;
      }
    },
    createAnecdote: (state, action: PayloadAction<string>) => {
      const content = action.payload;
      if (content) {
        const newAnecdote = {
          content,
          id: getId(),
          votes: 0,
        };
        state.push(newAnecdote);
      }
    },
    appendAnecdotes: (state, action: PayloadAction<Anecdote[]>) => {
      const anecdotes = action.payload;
      if (anecdotes && anecdotes.length > 0) {
        state.push(...anecdotes);
      }
    },
  },
});

export const { voteAnecdote, createAnecdote, appendAnecdotes } =
  anecdoteSlice.actions;
export const anecdoteReducer = anecdoteSlice.reducer;
