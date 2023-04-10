import { ChakraProvider } from "@chakra-ui/react"
import TodoList from "./Screens/TodoList"
function App() {
  return (
    <ChakraProvider>
        <TodoList />
    </ChakraProvider>
  )
}

export default App
