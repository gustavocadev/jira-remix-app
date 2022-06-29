import { useReducer } from 'react';
import { EntriesContext, entriesReducer } from './';
import type { Entry } from './EntriesContext';

export interface EntriesState {
  entries: Entry[];
}

const entries_INITIAL_STATE: EntriesState = {
  entries: [],
};

type Props = {
  children: React.ReactNode;
};

export const EntriesProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(entriesReducer, entries_INITIAL_STATE);

  // actions
  // saveEntriesToState
  const saveEntriesToState = async (entries: Entry[]) => {
    dispatch({ type: 'GET_ENTRIES', payload: entries });
  };

  const updateEntriesToState = async (entries: Entry[]) => {
    dispatch({ type: 'UPDATE_ENTRIES', payload: entries });
  };

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        saveEntriesToState,
        updateEntriesToState,
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
