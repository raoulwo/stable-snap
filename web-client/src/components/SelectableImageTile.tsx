import {useState, useEffect} from "react";
import {Check, Loader2, Trash2} from "lucide-react";
import type {FocusedImage} from "@/lib/types/focused-image.ts";
import { useAppContext } from "@/context/AppContext.tsx";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface ImageProps {
    imageId: string;
    imageURL?: string;
}

const SelectableImageTile = ({ imageId, imageURL = "/construction_progress-middle.jpg" }: ImageProps) => {
    const [imageUrl] = useState<string>(imageURL);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(false);
    const localStorageKey = `Stable-Snap-${imageId}`;
    const { setFocusedImage, handleDeletionOfImage, handleFetchOfAllImages } = useAppContext();
    const [showDeleteIcon, setShowDeleteIcon] = useState<boolean>(false);

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

    const handleHoveringOverImage = () => {
        setShowDeleteIcon(true);
    }

    const handleStoppingHoveringOverImage = () => {
        setShowDeleteIcon(false);
    }

    const handleDeletionOfImageAndRefetch = async () => {
        setLoading(true);
        await handleDeletionOfImage(imageId);
        //wait for 5 seconds
        await new Promise((resolve) => setTimeout(resolve, 5000));
        console.log("delete image "+imageId);
        setLoading(false);
        await handleFetchOfAllImages();
    }

    return (
        <div id="SelectableImageTile"
             className="rounded-md relative"
             onMouseEnter={handleHoveringOverImage}
             onMouseLeave={handleStoppingHoveringOverImage}
        >
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
                    {showDeleteIcon && (
                    <div
                        className="absolute right-0 top-0 mr-1 mt-1 w-4 h-4 transition-colors duration-200 cursor-pointer">
                        <div className="pr-3">
                            <AlertDialog>
                                <AlertDialogTrigger className="cursor-pointer"><Trash2 className="text-red-500" size="16" /></AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Do you want to delete this image?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete the image from our servers.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel
                                            className="cursor-pointer"
                                        >Cancel</AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleDeletionOfImageAndRefetch}
                                            className="cursor-pointer"
                                        >Yes, delete it
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </div>
                    </div>
                    )}
                    <img
                        id={imageId}
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