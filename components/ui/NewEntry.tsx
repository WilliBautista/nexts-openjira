import { ChangeEvent, useState, useContext } from 'react';

import { Box, Button, TextField } from "@mui/material"
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined'

import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {

  const { addNewEntry } = useContext( EntriesContext )
  const { isAddingEntry, setIsAddingEntry } = useContext( UIContext )

  const [inputValue, setInputValue] = useState('')
  const [isTouched, setIsTouched] = useState(false)

  const onTextFieldChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value )
  }

  const onSave = () => {

    if ( inputValue.length === 0 ) return

    addNewEntry(inputValue)
    setIsTouched( false )
    setInputValue( '' )
  }

  return (
    <Box sx={{ marginBottom: 2, paddingX: '10px' }}>
      {
        isAddingEntry ? (
          <>
            <TextField
              sx={{
                marginTop: 2,
                marginBottom: 1
              }}
              fullWidth
              placeholder="New Entry"
              autoFocus
              multiline
              label='New Entry'
              helperText={ inputValue.length <= 0 && isTouched && 'Type the entry ' }
              error={ inputValue.length <= 0 && isTouched }
              value={ inputValue }
              onChange={ onTextFieldChange }
              onBlur={ () => setIsTouched(true) }
            />
            <Box display='flex' justifyContent='space-between'>
              <Button
                variant='text'
                onClick={ () => setIsAddingEntry( false )}
              >
                Cancel
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                endIcon={ <SaveOutlinedIcon /> }
                onClick={ onSave }
              >
                Save
              </Button>
            </Box>
          </>
        )
        : (
          <Button
            startIcon={ <AddCircleOutlineOutlinedIcon /> }
            fullWidth
            variant='outlined'
            onClick={ () => {
              setIsTouched( false )
              setIsAddingEntry( true )
            }}
          >
            Add new entry
          </Button>
        )
      }
    </Box>
  )
}
