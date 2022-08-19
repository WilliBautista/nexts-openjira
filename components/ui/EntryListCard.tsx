import { DragEvent, FC, useContext } from 'react';

import { useRouter } from 'next/router';

import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

import { Entry } from "../../interfaces"
import { UIContext } from '../../context/ui';
import { dateFunctions } from '../../utils';

interface Props {
  entry: Entry
}

export const EntryListCard: FC<Props> = ({ entry }) => {
  const { description, createAt } = entry

  const { startDragging, endDragging } = useContext( UIContext )
  const router = useRouter()

  const onDragStart = ( event: DragEvent ) => {
    event.dataTransfer.setData('id', entry._id)
    startDragging()
  }

  const onClick = () => {
    router.push(`/entries/${ entry._id }`)
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ endDragging }
      onClick={ onClick }
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{ description }</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>{ dateFunctions.getFormatDistanceToNow( entry.createAt ) }</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
