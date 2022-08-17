import { FC, useReducer } from 'react'

import { v4 as uuidv4 } from 'uuid'

import { Entry } from '../../interfaces'
import { EntriesContext, entriesReducer } from './'

export interface EntriesState {
  entries: Entry[];
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      description: 'PENDIENTE: Dolore cupidatat nulla aliqua adipisicing fugiat ad eiusmod quis magna dolore enim nostrud non ea.',
      status: 'pending',
      createAt: Date.now()
    },
    {
      _id: uuidv4(),
      description: 'EN PROGRESO: Dolore cupidatat nulla aliqua adipisicing fugiat ad eiusmod quis magna dolore enim nostrud non ea eiusmod quis magna dolore enim nostrud non ea.',
      status: 'in-progress',
      createAt: Date.now() - 1000000
    },
    {
      _id: uuidv4(),
      description: 'TERMINADO: Dolore cupidatat nulla aliqua adipisicing fugiat ad.',
      status: 'done',
      createAt: Date.now() - 100000
    },
  ],
};

interface Props {
  children: JSX.Element | JSX.Element[]
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);

  const addNewEntry = ( description: string ) => {
    const newEntry: Entry = {
      _id: uuidv4(),
      description,
      createAt: Date.now(),
      status: 'pending'
    }

    dispatch({ type: 'Entries - Add entry', paylod: newEntry })
  }

  const updateEntry = ( entry: Entry ) => dispatch({ type: 'Entries - Update entry', paylod: entry })

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        updateEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
