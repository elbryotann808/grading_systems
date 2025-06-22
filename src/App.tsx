import GrandingProvider from "./context/GrandingProvider"
import UsersSystem from "./components/UsersSystem/UsersSystem"
import CardsProduct from "./components/CardsProduct/CardsProduct"
import AlertSystem from "./components/AlertSystem/AlertSystem"
import NotificationsSystem from "./components/NotificationsSystem/NotificationsSystem"

function App() {
  return (
    <GrandingProvider>
      <UsersSystem/> 
      <CardsProduct/>
      <AlertSystem/> 
      <NotificationsSystem/>
    </GrandingProvider>
  )
}

export default App

