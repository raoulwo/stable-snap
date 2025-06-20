import React from "react";
import SelectableImageGrid from "@/components/SelectableImageGrid.tsx";
import {Button} from "@/components/ui/button.tsx";

const SelectionPanel: React.FC = () => {
    return (
        <div id="SelectionPanel">
            <div className="flex">
                <input type="text" className="border-2 border-gray-400" placeholder="Bagger" />
                <Button onClick={() => {console.log("button clicked")}}>Search</Button>
            </div>
            <SelectableImageGrid />
        </div>
    );
}

export default SelectionPanel;