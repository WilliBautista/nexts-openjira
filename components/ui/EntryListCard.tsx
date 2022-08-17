import { DragEvent, FC, useContext } from 'react';

import { Card, CardActionArea, CardActions, CardContent, Typography } from "@mui/material"

import { Entry } from "../../interfaces"
import { UIContext } from '../../context/ui';

interface Props {
  entry: Entry
}

export const EntryListCard: FC<Props> = ({ entry }) => {
  const { description, createAt } = entry

  const { startDragging, endDragging } = useContext( UIContext )

  const onDragStart = ( event: DragEvent ) => {
    event.dataTransfer.setData('id', entry._id)
    startDragging()
  }

  return (
    <Card
      sx={{ marginBottom: 1 }}
      draggable
      onDragStart={ onDragStart }
      onDragEnd={ endDragging }
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>{ description }</Typography>
        </CardContent>
        <CardActions sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}>
          <Typography variant='body2'>Hace 30 mínutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
