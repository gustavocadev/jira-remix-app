import { Box, Text } from "@chakra-ui/react"
import { Link } from "remix"

type Props = {}

const Navbar = (props: Props) => {
  return (
    <Box bg="gray.900" w="100%" h="56px" as="header">
      <Box
        as="nav"
        display="flex"
        justifyContent="flex-start"
        px="8"
        alignItems="center"
        h="100%"
      >
        <Box as="ul" display="flex" gap="22px" listStyleType="none">
          <Box as="li">
            <Link to="/">
              <Text fontSize="2xl">Open Jira</Text>
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
