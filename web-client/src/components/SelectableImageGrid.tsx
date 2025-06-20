import React from "react";
import SelectableImageTile from "@/components/SelectableImageTile.tsx";

const SelectableImageGrid: React.FC = () => {
    return (
        <div id="SelectableImageGrid">
            <div className="grid grid-cols-4 gap-2">
                <SelectableImageTile />
                <SelectableImageTile />
                <SelectableImageTile />
                <SelectableImageTile />
                <SelectableImageTile />
                <SelectableImageTile />
                <SelectableImageTile />
                <SelectableImageTile />
            </div>
        </div>
    );
}

export default SelectableImageGrid;