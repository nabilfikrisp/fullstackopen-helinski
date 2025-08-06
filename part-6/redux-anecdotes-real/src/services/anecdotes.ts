import axios from "axios";
import type { Anecdote } from "../types/anecdote.type";

const BASE_URL = "http://localhost:3001/anecdotes";

export function getId() {
  return (100000 * Math.random()).toFixed(0);
}

export async function getAnecdotes() {
  const anecdotes = await axios.get<Anecdote[]>(BASE_URL);
  return anecdotes.data;
}

export async function postAnecdotes(content: Anecdote["content"]) {
  const newAnecdote: Anecdote = {
    content,
    votes: 0,
    id: getId(),
  };

  const response = await axios.post<Anecdote>(BASE_URL, newAnecdote);
  return response.data;
}
