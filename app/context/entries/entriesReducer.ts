import type { Entry } from './EntriesContext';
import type { EntriesState } from './EntriesProvider';

type EntriesAction =
  | {
      type: 'UPDATE_ENTRY';
      payload: Entry;
    }
  | {
      type: 'ADD_ENTRY';
      payload: Entry;
    }
  | {
      type: 'GET_ENTRIES';
      payload: Entry[];
    }
  | {
      type: 'UPDATE_ENTRIES';
      payload: Entry[];
    };

export const entriesReducer = (state: EntriesState, action: EntriesAction) => {
  switch (action.type) {
    case 'GET_ENTRIES':
      return {
        ...state,
        entries: action.payload,
      };
    case 'UPDATE_ENTRIES':
      return {
        ...state,
        entries: action.payload,
      };
    default:
      return state;
  }
};
