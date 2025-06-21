// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useEffect } from 'react';
import './App.css'
import ProjectPage from "@/components/ProjectPage.tsx";
import { searchImages, searchInitialImages } from './lib/api';

function App() {
  // const [count, setCount] = useState(0)

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
      <ProjectPage />
    </>
  )
}

export default App
