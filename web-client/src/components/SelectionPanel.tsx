import React, {useState} from "react";
import SelectableImageGrid from "@/components/SelectableImageGrid.tsx";
import SearchTags from "@/components/SearchTags.tsx";
import {Button} from "@/components/ui/button.tsx";
import { useAppContext } from "@/context/AppContext.tsx";

const SelectionPanel: React.FC = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { handleQuerySearchOfImages, handleFetchOfAllImages } = useAppContext();

    const searchImagesWithQuery = async() => {
        console.info("Info: Fetching images with this search query: ", searchQuery);
        handleQuerySearchOfImages(searchQuery);
    }

    const searchImagesWithNoQuery = async() => {
        console.info("Fetching images without a query to list all images");
        handleFetchOfAllImages();
    }

    return (
        <div id="SelectionPanel">
            <div className="flex justify-end mb-4">
                {/* search query is set inside search tags component */}
                <SearchTags setSearchQuery={setSearchQuery}/>
                <Button className="mx-2" onClick={() => {searchImagesWithQuery()}}>Search</Button>
                <Button
                    onClick={() => {searchImagesWithNoQuery()}}
                    variant="outline">List all images</Button>
            </div>
            <SelectableImageGrid />
        </div>
    );
}

export default SelectionPanel;