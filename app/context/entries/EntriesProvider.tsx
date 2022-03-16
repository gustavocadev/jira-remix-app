import { FC, useReducer } from "react"
import { EntriesContext, entriesReducer } from "./"
import { Entry } from "./EntriesContext"

export interface EntriesState {
  entries: Entry[]
}

const entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, entries_INITIAL_STATE)

  // actions
  // saveEntriesToState
  const saveEntriesToState = async (entries: Entry[]) => {
    dispatch({ type: "GET_ENTRIES", payload: entries })
  }

  // const updateEntriesToState = async (entries: Entry[]) => {
  //   dispatch({ type: "UPDATE_ENTRIES", payload: entries })
  // }

  // create a new entry
  const addNewEntry = (entry: Entry) => {
    dispatch({ type: "ADD_ENTRY", payload: entry })
  }

  // update an entry
  const updateEntry = (entry: Entry) => {
    dispatch({
      type: "UPDATE_ENTRY",
      payload: {
        ...entry,
      },
    })
  }

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        updateEntry,
        addNewEntry,
        saveEntriesToState,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
