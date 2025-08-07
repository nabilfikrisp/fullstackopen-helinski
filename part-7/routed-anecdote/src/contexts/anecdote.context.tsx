import { createContext, useContext, useState, type ReactNode } from "react";
import { INITIAL_ANECDOTES, type Anecdote } from "../data";

type AnecdoteContextProps = {
  anecdotes: Anecdote[];
  addNew: (anecdote: Anecdote) => void;
  removeAnecdote: (id: number) => void;
  anecdoteById: (id: number) => Anecdote | undefined;
};

const AnecdoteContext = createContext<AnecdoteContextProps | undefined>(
  undefined
);

export function AnecdoteProvider({ children }: { children: ReactNode }) {
  const [anecdotes, setAnecdotes] = useState<Anecdote[]>(INITIAL_ANECDOTES);

  const addNew = (anecdote: Anecdote) => {
    anecdote.id = generateId();
    setAnecdotes((prev) => [...prev, anecdote]);
  };

  const removeAnecdote = (id: number) => {
    setAnecdotes((prev) => prev.filter((a) => a.id !== id));
  };

  const anecdoteById = (id: number) => anecdotes.find((a) => a.id === id);

  return (
    <AnecdoteContext.Provider
      value={{ anecdotes, addNew, removeAnecdote, anecdoteById }}
    >
      {children}
    </AnecdoteContext.Provider>
  );
}

function generateId() {
  return Math.round(Math.random() * 10000);
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAnecdotes() {
  const context = useContext(AnecdoteContext);
  if (!context) {
    throw new Error("useAnecdotes must be used within an AnecdoteProvider");
  }
  return context;
}
