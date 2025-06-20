import React, { useEffect } from "react";
import SelectedImageDisplay from "@/components/SelectedImageDisplay.tsx";
import SelectionPanel from "@/components/SelectionPanel.tsx";
// import { Button } from "@/components/ui/button";

const ProjectPage: React.FC = () => {
    useEffect(() => {
        console.log("Test: ProjectPage has loaded");
    }, []);

    return (
        <div className="flex" id="ProjectPage">
            <div className="w-1/3">
                <SelectedImageDisplay />
            </div>
            <div className="w-2/3">
                <SelectionPanel/>
            </div>
        </div>
    );
}

export default ProjectPage;

