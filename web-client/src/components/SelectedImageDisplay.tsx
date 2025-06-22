import React, {useEffect, useState} from "react";
import { useAppContext } from "@/context/AppContext.tsx";

const SelectedImageDisplay: React.FC = () => {
    const { focusedImage } = useAppContext();
    const [noImageFocused, setNoImageFocused] = useState<boolean>(true);

    useEffect(() => {
        if(focusedImage.imageId === "" || focusedImage.imageURL === ""){
            console.log("Currently, no image is focused; empty values:", focusedImage);
            setNoImageFocused(true);
        }else{
            setNoImageFocused(false);
        }
    }, [focusedImage]);

    return (
        <div id="SelectedImageDisplay" className="flex items-center justify-center">
            { noImageFocused ? (
                <div className="mt-6">No image selected yet</div>
            ) : (
                <img
                    className="rounded-md shadow-md border-1 border-gray-400"
                    id={focusedImage.imageId}
                    src={focusedImage.imageURL}
                />
            )
            }
        </div>
    );
}

export default SelectedImageDisplay;