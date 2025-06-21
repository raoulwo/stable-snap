import React, {useEffect} from "react";
import SelectableImageTile from "@/components/SelectableImageTile.tsx";
import { useAppContext } from "@/context/AppContext.tsx";
import type {SearchResult} from "@/lib/types";
import {Loader2} from "lucide-react";

const SelectableImageGrid: React.FC = () => {
    const { searchResults, isLoadingImages } = useAppContext();

    useEffect(() => {
        console.log("new results:");
        console.log(searchResults);
    }, [searchResults]);

    return (
        isLoadingImages ? (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Loader2 size={48} className="animate-spin mt-6" />
            </div>
        ) : (
            <div id="SelectableImageGrid">
                <div className="grid grid-cols-3 md:grid-cols-4 md:grid-cols-5 gap-2.5">
                    {searchResults.map((searchResult:SearchResult) => (
                        <SelectableImageTile imageURL={searchResult.url} imageId={searchResult.imageId} />
                    ))}
                </div>
            </div>
        )
    );
}

export default SelectableImageGrid;