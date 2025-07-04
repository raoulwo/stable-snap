import React from "react";
import {Button} from "@/components/ui/button.tsx";
import {ImageDown} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import {useAppContext} from "@/context/AppContext.tsx";
const DownloadSelectionPanel: React.FC = () => {

    /*const fetchAndZipImages = async () => {
        const zip = new JSZip();
        const imageFolder = zip.folder("images");

        //for (const key of keys) {
        //const s3Url = key.replace("Stable-Snap-", "");
        const s3Url = "";
        try {
            const response = await fetch(s3Url);
            const blob = await response.blob();
            // const filename = s3Url.split("/").pop();
            const filename = "Test";
            // @ts-ignore
            imageFolder.file(filename, blob);
        } catch (error) {
            console.error(`Failed to fetch: ${s3Url}`, error);
        }
        //}

        zip.generateAsync({ type: "blob" }).then(content => {
            saveAs(content, "images.zip");
        });
    };*/

    const { focusedImage } = useAppContext();

    const handleDownloadZip = async () => {
        console.log("I am tring to download this file:");
        console.log(focusedImage.imageURL);
        try {
            const s3ImageUrl = focusedImage.imageURL;
            // Fetch the image as a blob
            const response = await fetch(s3ImageUrl, {
                method: 'GET',
            });
            console.log("response:");
            console.log(response.type);
            console.log(response);

            if (!response.ok){
                console.log("response.type:", response.type);
                throw new Error('Failed to fetch image');
            }
            const imageBlob = await response.blob();
            console.log(">>52-imageBlog: "+imageBlob);

            // Create a zip file
            const zip = new JSZip();
            const fileName = 'image1.jpg';
            zip.file(fileName, imageBlob);

            // Generate and download the zip
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            console.log(">>61 line");
            console.log(zipBlob);
            saveAs(zipBlob, 'images1.zip');
        } catch (error) {
            console.error('Error creating ZIP file:', error);
            alert('There was a problem downloading the image.');
        }
    };



    return (
        <div className="mt-4 justify-start justify-self-start">
            <Button
                onClick={handleDownloadZip}
            >
                <ImageDown />
                Download this image
            </Button>
            {/*<input
                type="text"
                className="border-2 border-gray-400 rounded-md p-1 ml-2 w-full min-w-30"
                placeholder="Bulldozer or Cat"
                onChange={(event) => setTemporaryTestLink(event.target.value)}
            />*/}
        </div>
    );
}

export default DownloadSelectionPanel;

