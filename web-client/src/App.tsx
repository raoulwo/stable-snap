import './App.css'
import ProjectPage from "@/components/ProjectPage.tsx";
import AppProvider from "@/context/AppContext.tsx";
function App() {
  return (
      <>
        <AppProvider>
          <ProjectPage/>
        </AppProvider>
      </>
  )
}

export default App
