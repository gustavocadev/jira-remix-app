import { Box, Button, Heading, Input, Stack } from "@chakra-ui/react"
import { DragEvent, useContext, useRef, useState, useEffect } from "react"
import EntryCard from "./EntryCard"
import { EntriesContext } from "../../context/entries/EntriesContext"
import { Form, useFetcher, useTransition } from "@remix-run/react";
type Props = {
  status: string
}

const EntryList = ({ status }: Props) => {
  const { entries } = useContext(EntriesContext)
  const [buttonAdd, setButtonAdd] = useState(false)

  const formRef = useRef<HTMLFormElement>(null)
  const transition = useTransition()
  const fetcher = useFetcher()

  // when the user drop the element do this
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text/plain")
    const entry = entries.find((entry) => entry._id === id)!
    // console.log({ ...entry, status })

    // submit like a form to update in my database every time the status changes
    fetcher.submit(
      {
        _id: entry._id,
        status: status,
        _action: "update",
      },
      {
        method: "post",
        action: "?index",
      }
    )

    // updateEntry({ ...entry, status })
  }

  const filteredEntries = entries.filter((entry) => entry.status === status)

  const isAdding =
    transition.state === "submitting" &&
    transition.submission.formData.get("_action") === "create"

  useEffect(() => {
    if (!isAdding) {
      formRef.current?.reset()
    }
  }, [isAdding])

  return (
    <Box
      as="section"
      bg="blackAlpha.600"
      minH="calc(100vh - 110px)"
      borderRadius="8px"
      px="2"
      py="2"
    >
      <Heading m="4">{status}</Heading>
      {!buttonAdd && status === "pending" && (
        <Stack spacing={3} px="2" py="2">
          <Button onClick={() => setButtonAdd(true)}>Agregar Entrada</Button>
        </Stack>
      )}

      {buttonAdd && (
        <Form ref={formRef} method="post" onSubmit={() => setButtonAdd(false)}>
          <Stack spacing={3} px="2" py="2">
            <Input
              placeholder="Agregar Entrada"
              name="description"
              autoComplete="off"
            />

            <Button type="submit" name="_action" value="create">
              Agregar Entrada
            </Button>
          </Stack>
        </Form>
      )}
      <section onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}>
        <Box
          bg="gray.900"
          minH="calc(100vh - 200px)"
          overflowY="scroll"
          px="2"
          py="2"
        >
          {filteredEntries.map((entry) => {
            return <EntryCard key={entry._id} entry={entry} />
          })}
        </Box>
      </section>
    </Box>
  )
}

export default EntryList
