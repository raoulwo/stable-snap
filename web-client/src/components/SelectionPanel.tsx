import React from "react";
import SelectableImageGrid from "@/components/SelectableImageGrid.tsx";
import {Button} from "@/components/ui/button.tsx";

const SelectionPanel: React.FC = () => {
    return (
        <div id="SelectionPanel">
            <div className="flex justify-end mb-2">
                <input type="text" className="border-2 border-gray-400 rounded-md p-1 mr-2 w-75" placeholder="Bulldozer, TODO: think about tags" />
                <Button onClick={() => {console.log("button clicked")}}>Search</Button>
            </div>
            <SelectableImageGrid />
        </div>
    );
}

export default SelectionPanel;