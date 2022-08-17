import { DragEvent, FC, useContext, useMemo } from 'react';

import { Paper, List } from '@mui/material';

import { EntryListCard } from './';
import { EntryStatus } from '../../interfaces';

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {

  const { entries, updateEntry } = useContext( EntriesContext )
  const { isDragging, endDragging } = useContext( UIContext )

  const entriesByStatus = useMemo(() => entries.filter( entry => entry.status === status ), [ entries, status ])

  const allowDrop = ( event: DragEvent<HTMLDivElement> ) => event.preventDefault()

  const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
    const id = event.dataTransfer.getData('id')
    const entry = entries.find(entry => entry._id === id)!
    entry.status = status
    updateEntry( entry )
    endDragging()
  }

  return (
    <div
      onDrop={ onDropEntry }
      onDragOver={ allowDrop }
      className={ isDragging ? styles.dragging : '' }
    >
        <Paper sx={{ height: 'calc(100vh - 195px)', overflow: 'auto', backgroundColor: 'transparent', padding: '10px' }}>
          <List sx={{ opacity: isDragging ? 0.2 : 1, transition: 'all 0.3s' }}>
            {
              entriesByStatus.map( entry => (
                <EntryListCard key={ entry._id } entry={ entry } />
              ))
            }
          </List>
        </Paper>
    </div>
  )
}
