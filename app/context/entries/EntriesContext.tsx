import { createContext } from 'react';

export type Entry = {
  _id: string;
  description: string;
  status: string;
  createdAt: number;
};

type ContextProps = {
  entries: Entry[];
  saveEntriesToState: (entries: Entry[]) => void;
  updateEntriesToState: (entries: Entry[]) => void;
};

export const EntriesContext = createContext({} as ContextProps);
