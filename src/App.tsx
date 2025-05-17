import AlertSystem from "./components/AlertSystem"
import CardsProduct from "./components/CardsProduct"
import UsersSystem from "./components/UsersSystem"
import GrandingProvider from "./context/GrandingProvider"

function App() {
  return (
      <GrandingProvider>

      <UsersSystem/>
      <div onClick={()=>{
        localStorage.clear()
      }}>
          <button>Clear</button>
        </div>

      
      <CardsProduct/>
        <AlertSystem/> 
      </GrandingProvider>
  )
}

export default App

