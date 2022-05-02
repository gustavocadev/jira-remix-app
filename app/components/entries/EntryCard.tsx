import { Box } from "@chakra-ui/react"
import { Entry } from "../../context/entries/EntriesContext"
import { DragEvent } from "react"
import { useFetcher, useNavigate } from "@remix-run/react";

type Props = {
  entry: Entry
}

const EntryCard = ({ entry }: Props) => {
  const fetcher = useFetcher()
  const navigate = useNavigate()
  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text/plain", entry._id)
  }
  const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
    console.log("drag end :DD")
    fetcher.submit(
      { _id: entry._id, status: entry.status },
      {
        method: "post",
        action: "?index",
      }
    )
  }

  const handleClick = () => {
    navigate(`/entry/${entry._id}`)
  }
  return (
    <>
      <Box
        bg="blackAlpha.600"
        p="4"
        minH={110}
        draggable
        cursor="pointer"
        borderRadius={4}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        mb="2"
        onClick={handleClick}
      >
        {entry.description}
      </Box>
    </>
  )
}

export default EntryCard
