import {useState} from "react";
import {Check} from "lucide-react";

interface ImageProps {
    imageId: string;
    imageURL?: string;
}

const SelectableImageTile = ({ imageId, imageURL = "/construction_progress-middle.jpg" }: ImageProps) => {
    const [imageUrl] = useState<string>(imageURL);
    const [loading] = useState(false);
    const [selected, setSelected] = useState(false);

    const handleSelectionToggle = (event:any):void => {
        event.stopPropagation();
        setSelected(!selected);
        console.log("selected clicked");
    }

    return (
        <div id="SelectableImageTile" className="rounded-md">
            {loading ? (
                <div>Loading</div>
            ):(
                <>
                    <div
                        onClick={handleSelectionToggle}
                        className={`absolute ml-1 mt-1 w-4 h-4 shadow-inner rounded-xs overflow-visible transition-colors duration-200 border-1 border-gray-400 ${selected ? "bg-blue-400" : "bg-white"}`}>
                        <div className="pr-3">
                            <Check className=" text-white pr-0.5" size="16"/>
                        </div>
                    </div>
                    <img
                        className="rounded shadow-md border-1 border-gray-400"
                        src={imageUrl}
                        alt={`Image with id: ${imageId}`} />
                </>
            )}
        </div>
    );
}

export default SelectableImageTile;