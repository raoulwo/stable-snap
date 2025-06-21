import React from "react";
import SelectableImageTile from "@/components/SelectableImageTile.tsx";

const SelectableImageGrid: React.FC = () => {
    return (
        <div id="SelectableImageGrid">
            <div className="grid grid-cols-3 md:grid-cols-4 md:grid-cols-5 gap-2.5">
                <SelectableImageTile imageId="id1" />
                <SelectableImageTile imageId="id2" />
                <SelectableImageTile imageId="id3" />
                <SelectableImageTile imageId="id4" />
                <SelectableImageTile imageId="id5" />
                <SelectableImageTile imageId="id6" />
                <SelectableImageTile imageId="id7" />
                <SelectableImageTile imageId="id8" />
                <SelectableImageTile imageId="id9" />
                <SelectableImageTile imageId="id10" />
                <SelectableImageTile imageId="id11" />
                <SelectableImageTile imageId="id12" />
                <SelectableImageTile imageId="id13" />
                <SelectableImageTile imageId="id14" />
                <SelectableImageTile imageId="id15" />
            </div>
        </div>
    );
}

export default SelectableImageGrid;