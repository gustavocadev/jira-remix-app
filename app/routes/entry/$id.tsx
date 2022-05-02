import {
  Heading,
  Container,
  Stack,
  Button,
  Textarea,
  Box,
} from "@chakra-ui/react"
import { Radio, RadioGroup } from "@chakra-ui/react"
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { useState } from "react"
import EntryModel from "../../models/Entry"
import { dbConnect } from "~/utils/db"
import { dbDisconnect } from "../../utils/db"
import type { Entry } from "~/context/entries"

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData()

  await dbConnect()

  const _action = formData.get("_action") as string
  if (_action === "update") {
    const { id } = params
    const status = formData.get("status") as string
    const description = formData.get("description") as string

    const entryUpdated = {
      status,
      description: description.trim(),
    }

    await EntryModel.findByIdAndUpdate(id, {
      ...entryUpdated,
    })
  }
  if (_action === "delete") {
    const { id } = params
    await EntryModel.findByIdAndDelete(id)
  }

  await dbDisconnect()

  return redirect(`/`)
}

type LoaderData = {
  entry: Entry
}

export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params
  await dbConnect()
  const entry = await EntryModel.findById(id).lean()
  await dbDisconnect()
  return { entry }
}

export default function EntryPage() {
  const { entry } = useLoaderData<LoaderData>()
  const [status, setStatus] = useState(entry.status)
  const [inputDescription, setInputDescription] = useState(entry.description)
  return (
    <Container
      maxW="container.xl"
      // p="4"
      borderRadius="8"
      display="grid"
      placeItems="center"
      minH="calc(100vh - 140px)"
      bg="blackAlpha.600"
      mt="4"
    >
      <Form
        method="post"
        style={{
          backgroundColor: "black",
          borderRadius: "8px",
          padding: "10px",
          minWidth: "50%",
        }}
      >
        <Heading>Entry Page</Heading>
        <Textarea
          placeholder="description"
          my="4"
          onChange={(e) => setInputDescription(e.target.value)}
          name="description"
          autoComplete="off"
          value={inputDescription}
          height="200px"
        />
        <RadioGroup onChange={setStatus} value={status} name="status">
          <Stack direction="row">
            <Radio value="pending">Pending </Radio>
            <Radio value="in-progress">In progress</Radio>
            <Radio value="finished">Finished</Radio>
          </Stack>
        </RadioGroup>
        <Stack>
          <Button type="submit" mt="4" value="update" name="_action">
            Update: Actualizar
          </Button>
        </Stack>
      </Form>
      <Box>
        <Form method="post">
          <Button bg="red.600" type="submit" name="_action" value="delete">
            Delete - Eliminar
          </Button>
        </Form>
      </Box>
    </Container>
  )
}
