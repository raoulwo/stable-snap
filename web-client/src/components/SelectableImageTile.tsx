import {useState, useEffect} from "react";
import {Check, Loader2} from "lucide-react";
import type {FocusedImage} from "@/lib/types/focused-image.ts";
import { useAppContext } from "@/context/AppContext.tsx";

interface ImageProps {
    imageId: string;
    imageURL?: string;
}

const SelectableImageTile = ({ imageId, imageURL = "/construction_progress-middle.jpg" }: ImageProps) => {
    const [imageUrl] = useState<string>(imageURL);
    const [loading] = useState(false);
    const [selected, setSelected] = useState(false);
    const localStorageKey = `Stable-Snap-${imageId}`;
    const { setFocusedImage } = useAppContext();

    // Checks localStorage for a previously saved selection state for this specific image and restores selection state
    useEffect(() => {
        const isImageAlreadyStoredInLocalStorage = localStorage.getItem(localStorageKey);
        setSelected(isImageAlreadyStoredInLocalStorage === "true");
    }, []);

    const handleSelectionToggle = (event:any):void => {
        event.stopPropagation();
        const newSelectedValue = !selected;
        setSelected(newSelectedValue);
        localStorage.setItem(localStorageKey, String(newSelectedValue));
    }

    const handleFocusedImage = (): void => {
        const newFocusImage: FocusedImage = {imageURL: imageURL, imageId: imageId};
        setFocusedImage(newFocusImage);
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