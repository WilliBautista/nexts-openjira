import { FC, useEffect, useReducer } from 'react'

import { useSnackbar } from 'notistack';

import { EntriesContext, entriesReducer } from './'
import { Entry } from '../../interfaces'
import { entriesApi } from '../../apis';

export interface EntriesState {
  entries: Entry[];
}

interface Props {
  children: JSX.Element | JSX.Element[]
}

const ENTRIES_INITIAL_STATE: EntriesState = {
  entries: [],
};

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, ENTRIES_INITIAL_STATE);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<Entry[]>('/entries')
    dispatch({ type: 'Entries - Refresh entries', paylod: data })
  }

  const addNewEntry = async ( description: string ) => {
    const { data } = await entriesApi.post<Entry>('/entries', { description })
    dispatch({ type: 'Entries - Add entry', paylod: data })
  }

  const updateEntry = async ( { _id, description, status }: Entry, showSackbar = false ) => {
    try {
      const { data } = await entriesApi.put<Entry>(`/entries/${ _id }`, { description, status })
      dispatch({ type: 'Entries - Update entry', paylod: data })

      if ( showSackbar ) {
        enqueueSnackbar('A new entry has been created', {
          variant: 'success',
          autoHideDuration: 1500,
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'right',
          }
        })
      }


    } catch (error) {
      console.error({ error });
    }
  }

  const deleteEntry = async ( id: string ) => {
    try {

      const { data } =  await entriesApi.delete<Entry>(`/entries/${ id }`)
      dispatch({ type: 'Entries - Delete entry', paylod: data })

      enqueueSnackbar(`The Entry wirh id ${ id } was deleted`, {
        variant: 'success',
        autoHideDuration: 5000,
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        }
      })

    } catch (error) {
      console.error({ error });
    }
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,

        // Methods
        addNewEntry,
        deleteEntry,
        updateEntry
      }}
    >
      {children}
    </EntriesContext.Provider>
  );
};
