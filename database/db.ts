import mongoose from 'mongoose'

/**
 * 0 = disconnected
 * 1 = connected
 * 2 = connecting
 * 3 = disconnecting
 */
const mongoConnection = {
  isConnected: 0
}

export const connect = async () => {
  // Current connection
  if ( mongoConnection.isConnected ) return

  if ( mongoose.connections.length > 0 ) {
    mongoConnection.isConnected = mongoose.connections[0].readyState

    // Using latest connection
    if ( mongoConnection.isConnected === 1 ) return

    disconnect()
  }

  // Create connection
  await mongoose.connect( process.env.MONGODB_URI || '' )
  mongoConnection.isConnected = 1

}

export const disconnect = async () => {
  if ( process.env.NODE_ENV === 'development' ) return
  if ( mongoConnection.isConnected === 0 ) return
  await mongoose.disconnect()
  mongoConnection.isConnected = 0
}
