import type { NextApiRequest, NextApiResponse } from 'next'

import mongoose from 'mongoose';

import { db } from '../../../database';
import { Entry } from '../../../models';
import { IEntry } from '../../../models';
import { responsiveFontSizes } from '@mui/material';

type Data =
 | { message: string }
 | IEntry

export default function handler (req: NextApiRequest, res: NextApiResponse<Data>) {

  const { id } = req.query

  if ( !mongoose.isValidObjectId( id ) ) {
    return res.status(400).json({ message: `ID is not valid ${ id }` })
  }

  switch ( req.method ) {
    case 'PUT':
      return updateEntry( req, res )

    case 'GET':
      return getEntryById( req, res )

    case 'DELETE':
      return deleteEntry( req, res )

    default:
      return res.status(400).json({ message: 'Method does not exist' })
  }
}

const updateEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query

  await db.connect()

  const entryToUpdate = await Entry.findById( id )

  if ( !entryToUpdate ) {
    await db.disconnect()
    return res.status(400).json({ message: `There are not entries with ID ${ id }` })
  }

  const {
    description = entryToUpdate.description,
    status = entryToUpdate.status
  } = req.body

  try {
    const updatedEntry = await Entry.findByIdAndUpdate(id, { description, status }, { runValidators: true, new: true })
    // entryToUpdate.description = description
    // entryToUpdate.status = status
    // await entryToUpdate.save()
    await db.disconnect()
    res.status(200).json( updatedEntry! )
  } catch (error: any) {
    console.log(error)
    await db.disconnect()
    res.status(400).json({ message: JSON.stringify( error.errors.status.message ) })
  }
}

const getEntryById = async ( req:NextApiRequest, res: NextApiResponse<Data> ) => {
  const { id } = req.query

  await db.connect()
  const entry = await Entry.findById( id )
  await db.disconnect()

  if ( !entry ) {
    return res.status(400).json({ message: `There are no entries with ID ${ id }` })
  }

  return res.status(200).json( entry )
}

const deleteEntry = async ( req: NextApiRequest, res: NextApiResponse ) => {
  const { id } = req.query

  await db.connect()
  const entry = await Entry.findByIdAndDelete( id )
  await db.disconnect()

  if ( !entry ) {
    return res.status(400).json({ message: 'No ID found' })
  }

  return res.status(200).json( entry )
}
