import { AppRouter } from "./router"
import { Toaster } from "./ui/components/chakra/toaster"

export const App = () => {
  return (
    <>
      <AppRouter />
      <Toaster />
    </>

  )
}