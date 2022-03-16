import mongoose from "mongoose"

/* 
  0 - disconnected
  1 - connected
  2 - connecting
  3 - disconnecting
  4 - uninitialized
*/
const mongoConnection = {
  isConnected: 0,
}

export const dbConnect = async () => {
  console.log("process.env.MONGO_URL", process.env.MONGO_URL)
  if (mongoConnection.isConnected === 1) {
    console.log("ya estabamos conectados")
    return
  }

  if (mongoose.connections.length > 0) {
    mongoConnection.isConnected = mongoose.connections[0].readyState
    if (mongoConnection.isConnected === 1) {
      console.log("usando conexion existente")
      return
    }

    await mongoose.disconnect()
  }
  await mongoose.connect(process.env.MONGO_URL ?? "")
  mongoConnection.isConnected = 1
  console.log("conectado a mongodb", process.env.MONGO_URL ?? "")
}

export const dbDisconnect = async () => {
  if (process.env.NODE_ENV === "development") return
  if (mongoConnection.isConnected === 0) return

  await mongoose.disconnect()
  mongoConnection.isConnected = 0
  console.log("desconectado de mongodb")
}
