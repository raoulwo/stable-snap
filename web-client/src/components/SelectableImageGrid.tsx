import React from "react";
import SelectableImageTile from "@/components/SelectableImageTile.tsx";
import { useAppContext } from "@/context/AppContext.tsx";
import type {SearchResult} from "@/lib/types";
import {Loader2} from "lucide-react";

const SelectableImageGrid: React.FC = () => {
    const { searchResults, isLoadingImages } = useAppContext();

    return (
        isLoadingImages ? (
            <div className="w-full h-full flex flex-col justify-center items-center">
                <Loader2 size={48} className="animate-spin mt-6" />
            </div>
        ) : (
            <div id="SelectableImageGrid">
                {searchResults.length <= 0 ? (
                    <div className="flex items-center justify-center">
                        <strong className="mt-6">No images were found with this search term</strong>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2.5 place-items-center">
                        {searchResults.map((searchResult:SearchResult) => (
                            <SelectableImageTile imageURL={searchResult.url} imageId={searchResult.imageId} />
                        ))}
                    </div>
                )}
            </div>
        )
    );
}

export default SelectableImageGrid;