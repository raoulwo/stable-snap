import {useState, useEffect} from "react";
import {Check, Loader2} from "lucide-react";

interface ImageProps {
    imageId: string;
    imageURL?: string;
}

const SelectableImageTile = ({ imageId, imageURL = "/construction_progress-middle.jpg" }: ImageProps) => {
    const [imageUrl] = useState<string>(imageURL);
    const [loading] = useState(false);
    const [selected, setSelected] = useState(false);
    const localStorageKey = `Stable-Snap-${imageId}`;

    // Checks localStorage for a previously saved selection state for this specific image and restores selection state
    useEffect(() => {
        const stored = localStorage.getItem(localStorageKey);
        setSelected(stored === "true");
    }, []);

    const handleSelectionToggle = (event:any):void => {
        event.stopPropagation();
        setSelected(!selected);
        //TODO
        console.log("selected clicked");
    }

    const handleFocusedImage = (): void => {
        console.log("when this is clicked, the focused image will be set");
        console.log("image selected: "+imageURL+" with id:" + imageId);//TODO
    }

    return (
        <div id="SelectableImageTile" className="rounded-md">
            {loading ? (
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <Loader2 size={48} className="animate-spin mt-6" />
                </div>
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
                        alt={`Image with id: ${imageId}`}
                        onClick={handleFocusedImage}
                    />
                </>
            )}
        </div>
    );
}

export default SelectableImageTile;