import React, { useEffect } from "react";
import SelectedImageDisplay from "@/components/SelectedImageDisplay.tsx";
import SelectionPanel from "@/components/SelectionPanel.tsx";
import FileUpload from "@/components/FileUpload.tsx";
import UserSessionDisplay from "@/components/UserSessionDisplay.tsx";
import DownloadSelectionPanel from "@/components/DownloadSelectionPanel.tsx";

const ProjectPage: React.FC = () => {
    useEffect(() => {
        console.log("Test: ProjectPage has loaded");
    }, []);

    return (
      <div>
        <div className="flex flex-col md:flex-row" id="ProjectPage">
          <div className="w-full md:w-1/2 lg:w-2/5 p-2 mr-4 lg:mr-6 xl:mr-8">
              <UserSessionDisplay />
              <SelectedImageDisplay />
            <FileUpload />
          </div>
          <div className="w-full md:w-1/2 lg:w-3/5 p-2">
            <SelectionPanel/>
            <DownloadSelectionPanel/>
          </div>
        </div>
      </div>
    );
}

export default ProjectPage;

