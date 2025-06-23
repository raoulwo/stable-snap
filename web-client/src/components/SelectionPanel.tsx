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
            <div className="flex flex-col lg:flex-row justify-between mb-4">
                {/* search query is set inside search tags component */}
                <div className="flex justify-between">
                    <SearchTags setSearchQuery={setSearchQuery}/>
                    <input
                        type="text"
                        className="border-2 border-gray-400 rounded-md p-1 ml-2 w-full min-w-30"
                        placeholder="Bulldozer or Cat"
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </div>
                <div className="flex justify-end">
                    <Button className="mt-2 lg:mt-0 lg:mx-2" onClick={() => {searchImagesWithQuery()}}>Search</Button>
                    <Button
                        onClick={() => {searchImagesWithNoQuery()}}
                        variant="outline"
                        className="mt-2 ml-2 lg:mt-0 lg:ml-0"
                    >List all</Button>
                </div>
            </div>
            <SelectableImageGrid />
        </div>
    );
}

export default SelectionPanel;