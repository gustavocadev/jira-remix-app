/* eslint-disable react-hooks/exhaustive-deps */
import { EntryList } from "~/components/entries"
import { Grid } from "@chakra-ui/react"
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { dbConnect, dbDisconnect } from "~/utils/db"
import EntryModel from "~/models/Entry"
import { EntriesContext } from "../context/entries/EntriesContext"
import type { Entry } from "../context/entries/EntriesContext";
import { useContext, useEffect } from "react"

export const action: ActionFunction = async ({ request }) => {
  console.log("actionnnn 🦕")
  const formData = await request.formData()

  const _action = formData.get("_action") as string

  await dbConnect()
  if (_action === "create") {
    const description = formData.get("description") as string
    const newEntry = new EntryModel({
      description,
    })
    await newEntry.save()
  }
  if (_action === "update") {
    const id = formData.get("_id") as string
    const status = formData.get("status") as string
    await EntryModel.findByIdAndUpdate(id, {
      status,
    })
  }

  await dbDisconnect()

  return {
    status: "ok",
  }
}

export const loader: LoaderFunction = async () => {
  await dbConnect()
  const entries = (await EntryModel.find().lean()) as Entry[]
  await dbDisconnect()

  return entries
}

export default function Index() {
  const entries = useLoaderData<Entry[]>()
  const { saveEntriesToState } = useContext(EntriesContext)

  useEffect(() => {
    saveEntriesToState(entries)
  }, [entries])

  return (
    <Grid
      templateColumns={{
        base: "1fr",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={6}
      p="4"
      as="section"
    >
      <EntryList status="pending" />
      <EntryList status="in-progress" />
      <EntryList status="finished" />
    </Grid>
  )
}
