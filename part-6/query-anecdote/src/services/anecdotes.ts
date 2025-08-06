import axios from "axios";
import { type Anecdote } from "../types/anecdote";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ValidationError } from "../utils/validation-error";

const BASE_URL = "http://localhost:3001/anecdotes";

export function generateId() {
  return (100000 * Math.random()).toFixed(0);
}

async function fetchAnecdotes() {
  const response = await axios.get<Anecdote[]>(BASE_URL);
  return response.data;
}

export function useGetAnecdotes() {
  return useQuery({
    queryKey: ["anecdotes"],
    queryFn: fetchAnecdotes,
    retry: false,
    select: (data) => data.sort((a, b) => b.votes - a.votes),
  });
}

async function createAnecdote(content: Anecdote["content"]) {
  if (content.split("").length < 5) {
    throw new ValidationError("Content must be at least 5 characters long");
  }

  const newAnecdote: Anecdote = {
    id: generateId(),
    content,
    votes: 0,
  };

  const response = await axios.post<Anecdote>(BASE_URL, newAnecdote);
  return response.data;
}

export function usePostAnecdote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAnecdote,
    mutationKey: ["anecdote-mutation"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });
    },
  });
}

async function putAnecdote(anecdote: Anecdote) {
  const response = await axios.put<Anecdote>(
    `${BASE_URL}/${anecdote.id}`,
    anecdote
  );
  return response.data;
}

export function usePutAnecdote() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putAnecdote,
    mutationKey: ["anecdote-update"],
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["anecdotes"],
      });
    },
  });
}
