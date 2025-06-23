import React, {useEffect, useState} from "react";
import { useAppContext } from "@/context/AppContext.tsx";
import DownloadSelectionPanel from "@/components/DownloadSelectionPanel.tsx";

const SelectedImageDisplay: React.FC = () => {
    const { focusedImage } = useAppContext();
    const [noImageFocused, setNoImageFocused] = useState<boolean>(true);

    useEffect(() => {
        if(focusedImage.imageId === "" || focusedImage.imageURL === ""){
            setNoImageFocused(true);
        }else{
            setNoImageFocused(false);
        }
    }, [focusedImage]);

    return (
        <div id="SelectedImageDisplay" className="flex-col items-center justify-center">
            { noImageFocused ? (
                <div className="">
                    <div className="mt-48 font-bold text-xl">No image selected yet</div>
                    <div className="font-bold text-gray-500">Click on one of the images on the right to focus</div>
                </div>
            ) : (
                <>
                    <img
                        className="rounded-md shadow-md border-1 border-gray-400"
                        id={focusedImage.imageId}
                        src={focusedImage.imageURL}
                    />
                    <DownloadSelectionPanel/>
                </>
            )
            }
        </div>
    );
}

export default SelectedImageDisplay;