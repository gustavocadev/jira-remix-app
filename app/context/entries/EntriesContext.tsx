import { createContext } from "react"

export type Entry = {
  _id: string
  description: string
  status: string
  createdAt: number
}

type ContextProps = {
  entries: Entry[]
  updateEntry: (entry: Entry) => void
  addNewEntry: (entry: Entry) => void
  saveEntriesToState: (entries: Entry[]) => void
}

export const EntriesContext = createContext({} as ContextProps)
