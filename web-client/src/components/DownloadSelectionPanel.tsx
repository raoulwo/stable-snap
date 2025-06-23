import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ImageDown} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";
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

    const [ temporaryTestLink, setTemporaryTestLink ] = useState<string>("No-Link");

    const handleDownloadZip = async () => {
        console.log("I am tring to download this file:");
        console.log(temporaryTestLink);
        try {
            const s3ImageUrl = temporaryTestLink;
            // Fetch the image as a blob
            const response = await fetch(s3ImageUrl);
            if (!response.ok) throw new Error('Failed to fetch image');
            const imageBlob = await response.blob();

            // Create a zip file
            const zip = new JSZip();
            const fileName = s3ImageUrl.split('/').pop() || 'image.jpg';
            zip.file(fileName, imageBlob);

            // Generate and download the zip
            const zipBlob = await zip.generateAsync({ type: 'blob' });
            saveAs(zipBlob, 'images.zip');
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
                Download selection
            </Button>
            <input
                type="text"
                className="border-2 border-gray-400 rounded-md p-1 ml-2 w-full min-w-30"
                placeholder="Bulldozer or Cat"
                onChange={(event) => setTemporaryTestLink(event.target.value)}
            />
        </div>
    );
}

export default DownloadSelectionPanel;

