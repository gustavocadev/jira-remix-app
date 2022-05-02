import { Schema, models, model } from "mongoose"
import type { Entry } from "../context/entries/EntriesContext"

type EntryTypeMongoDB = Entry

const EntrySchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: {
      values: ["pending", "in-progress", "finished"],
      message: "{VALUE} no es un estado permitido",
    },
    default: "pending",
  },
  createdAt: {
    type: Number,
    default: Date.now(),
  },
})

const EntryModel =
  models.Entry ?? model<EntryTypeMongoDB>("Entry", EntrySchema)

export default EntryModel
