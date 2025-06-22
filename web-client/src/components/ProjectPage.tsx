import React, { useEffect } from "react";
import SelectedImageDisplay from "@/components/SelectedImageDisplay.tsx";
import SelectionPanel from "@/components/SelectionPanel.tsx";
import FileUpload from "@/components/FileUpload.tsx";
// import { Button } from "@/components/ui/button";

const ProjectPage: React.FC = () => {
    useEffect(() => {
        console.log("Test: ProjectPage has loaded");
    }, []);

    return (
      <div>
        <div className="flex flex-col md:flex-row" id="ProjectPage">
          <div className="w-full md:w-1/2 lg:w-2/5 p-2 mr-4 lg:mr-6 xl:mr-8">
            <SelectedImageDisplay />
          </div>
          <div className="w-full md:w-1/2 lg:w-3/5 p-2">
            <SelectionPanel/>
          </div>
        </div>
        <div className="mt-8">
          <FileUpload />
        </div>
      </div>
    );
}

export default ProjectPage;

