import { useEffect } from 'react';
import './App.css'
import ProjectPage from "@/components/ProjectPage.tsx";
import { searchImages, searchInitialImages } from './lib/api';
import AppProvider from "@/context/AppContext.tsx";

function App() {

  useEffect(() => {
    const run = async () => {
      try {
        const results = await searchInitialImages();
        console.log(results);
      } catch (error) {
        console.error(error);
      }

      try {
        const results = await searchImages("building");
        console.log(results);
      } catch (error) {
        console.error(error);
      }
    };

    run();
  }, []);

  return (
    <>
      <AppProvider>
        <ProjectPage />
      </AppProvider>
    </>
  )
}

export default App
