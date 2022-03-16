import { Schema, models, model, Model } from "mongoose"
import { Entry } from "../context/entries/EntriesContext"

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

const EntryModel: Model<EntryTypeMongoDB> =
  models.Entry ?? model("Entry", EntrySchema)

export default EntryModel
