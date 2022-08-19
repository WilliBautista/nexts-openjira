import { useState, ChangeEvent, useMemo, FC, useContext } from 'react';

import { GetServerSideProps } from 'next'

import { capitalize, Grid, Card, CardHeader, CardContent, TextField, CardActions, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, IconButton } from '@mui/material'
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { dbEntries } from '../../database';
import { Layout } from '../../components/layouts'
import { EntryStatus, Entry } from '../../interfaces';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { useRouter } from 'next/router';
import { dateFunctions } from '../../utils';

const validStatus: EntryStatus[] = ['pending', 'in-progress', 'done']

interface Props {
  entry: Entry
}

export const EntryPage: FC<Props> = ({ entry }) => {
  const { updateEntry, deleteEntry } = useContext( EntriesContext )
  const [inputValue, setInputValue] = useState( entry.description )
  const [status, setStatus] = useState<EntryStatus>( entry.status )
  const [touched, setTouched] = useState(false)
  const router = useRouter()

  const isNotValid = useMemo(() => inputValue.length <= 0 && touched, [inputValue, touched])

  const onTextFieldChange = ( event: ChangeEvent<HTMLInputElement> ) => {
    setInputValue( event.target.value )
  }

  const onStatusChanged = ( event: ChangeEvent<HTMLInputElement> ) => {
    setStatus( event.target.value as EntryStatus )
  }

  const onSave = () => {
    if ( inputValue.trim().length === 0 ) return

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue
    }

    updateEntry( updatedEntry, true )
    router.push('/')
  }

  const onDeleteEntry = () => {
    deleteEntry( entry._id )
    router.push('/')
  }

  return (
    <Layout title={`${ inputValue.substring( 0, 20 ) }...`}>
      <Grid
        container
        justifyContent='center'
        sx={{ marginTop: 2 }}
      >
        <Grid item xs={ 12 } sm={ 8 } md={ 6 }>
          <Card>
            <CardHeader
              title={`Entry: `}
              subheader={ dateFunctions.getFormatDistanceToNow( entry.createAt ) }
            />
            <CardContent>
              <TextField
                sx={{ marginTop: 2, marginBottom: 1 }}
                fullWidth
                placeholder='New Entry'
                autoFocus
                multiline
                label='New Entry'
                value={ inputValue }
                helperText={ isNotValid && 'Type a value' }
                error={ isNotValid }
                onChange={ onTextFieldChange }
                onBlur={ () => setTouched(true) }
              />
              <FormControl>
                <FormLabel>Status:</FormLabel>
                <RadioGroup
                  row
                  value={ status }
                  onChange={ onStatusChanged }
                >
                  {
                    validStatus.map(option => (
                      <FormControlLabel
                        key={ option }
                        value={ option }
                        control={ <Radio /> }
                        label={ capitalize(option) }
                      />
                    ))
                  }
                </RadioGroup>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                startIcon={ <SaveOutlinedIcon /> }
                variant='contained'
                fullWidth
                onClick={ onSave }
                disabled={ inputValue.length <= 0 }
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>

      <IconButton
        sx={{
          position: 'fixed',
          bottom: 30,
          right: 30,
          backgroundColor: 'error.dark',
        }}
        onClick={ onDeleteEntry }
      >
        <DeleteOutlineOutlinedIcon />
      </IconButton>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id:string }

  const entry = await dbEntries.getEntryById( id )

  if ( !entry ) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      entry
    }
  }
}

export default EntryPage;
