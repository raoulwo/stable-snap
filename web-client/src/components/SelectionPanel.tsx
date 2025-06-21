import React, {useState} from "react";
import SelectableImageGrid from "@/components/SelectableImageGrid.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useAppContext } from "@/context/AppContext.tsx";

const SelectionPanel: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { handleQuerySearchOfImages } = useAppContext();

    const searchImagesWithQuery = async() => {
        console.log(searchQuery);
        handleQuerySearchOfImages(searchQuery);
    }

    return (
        <div id="SelectionPanel">
            <div className="flex justify-end mb-2">
                <input
                    type="text"
                    className="border-2 border-gray-400 rounded-md p-1 mr-2 w-75"
                    placeholder="Bulldozer, TODO: think about tags"
                    onChange={(event) => setSearchQuery(event.target.value)}
                />
                <Button onClick={() => {searchImagesWithQuery()}}>Search</Button>
            </div>
            <SelectableImageGrid />
        </div>
    );
}

export default SelectionPanel;