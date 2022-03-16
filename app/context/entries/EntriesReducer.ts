import { Entry } from "./EntriesContext"
import { EntriesState } from "./EntriesProvider"

type EntriesAction =
  | {
      type: "UPDATE_ENTRY"
      payload: Entry
    }
  | {
      type: "ADD_ENTRY"
      payload: Entry
    }
  | {
      type: "GET_ENTRIES"
      payload: Entry[]
    }

export const entriesReducer = (state: EntriesState, action: EntriesAction) => {
  switch (action.type) {
    case "UPDATE_ENTRY":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          return {
            ...entry,
            status:
              entry._id === action.payload._id
                ? action.payload.status
                : entry.status,
          }
        }),
      }
    case "ADD_ENTRY":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      }
    case "GET_ENTRIES":
      return {
        ...state,
        entries: action.payload,
      }

    default:
      return state
  }
}
