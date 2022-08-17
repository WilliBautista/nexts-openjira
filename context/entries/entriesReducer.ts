import { Entry } from '../../interfaces';
import { EntriesState } from './';

type EntriesActionType =
  | { type: 'Entries - Add entry', paylod: Entry }
  | { type: 'Entries - Update entry', paylod: Entry }

export const entriesReducer = ( state: EntriesState, action: EntriesActionType ): EntriesState => {
  switch (action.type) {
    case 'Entries - Add entry':
      return {
        ...state,
        entries: [ ...state.entries, action.paylod ]
      }

    case 'Entries - Update entry':
      return {
        ...state,
        entries: state.entries.map( entry => {
          if ( entry._id === action.paylod._id ) {
            entry.status = action.paylod.status
            entry.description = action.paylod.description
          }

          return entry;
        })
      }

    default:
      return state
  }
}
