import React, {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ImageDown} from "lucide-react";
import JSZip from "jszip";
import { saveAs } from "file-saver";//ERROR: https://stablesnap-upload-images.s3.amazonaws.com/eab1d33d-8239-47db-9d05-5ef610854ee6.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAYZZGSYRYA62D3BNM%2F20250623%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250623T150037Z&X-Amz-Expires=500&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aDGV1LWNlbnRyYWwtMSJHMEUCIQD%2BIXsrIRr2k1xl9fxOZcvN2J4gHEFYcciIBEgF8q4WDQIgY5jH7mH3h3tPPwYyVOEyA%2FWsi6Obfl7KhVaMFY%2FOaroq%2FQIIGBAAGgw2MDUxMzQ0Mzk1MzYiDC7cljE7p%2BqtguxKESraAuxwCBH%2Bjc2w4KNGR7KiPDvMGWp4bqicTf7y1dRg1r1SDO%2Bd%2BNWjghFycYcdizD%2F49tdbmkXnmhjZmysDFby4xoU2NWVJOcvHqU2nNpn%2BL9Mqs8FgFxOh6aoB%2FTceN01k025agC5y0oWNLNQWwtlyAasA80rbBC2QGKO%2F2ATGtDlVzk1rR4t2Y1UZyhMkJOsT6hS9UuprcR5CQxP0o3%2BXCCDRwDrrl6vOWAYw3l6xbPf7WcKW7s8FKdH2%2Ba0XwHDVr38BouJZ35ppssIEMaDHDIw%2FF4B0YRaSHnwF%2B7bCjkCOYJECIZxJGFEnw0GYSmo1lKpZ6%2FxyyEoc9KdQVKoN5swv4%2B8FD2bYFDc%2FrSjedZxEuQ2zfGuxRdV%2BsOvAQjA1mVRjQEzX5VehIKwwvnP5mV4KlosrXqtFYHhpc99jLAHeAIZppXj%2FMk%2FWNFuiHQ6zvLm99BJ0uVTzp4w8NTlwgY6ngG5mrGj72iJLZ7BatiYyzOQn09d1wmCeGenK4geUqU3fJ2tp2TNnSAss1GblXRteqgZ1Ix2MRD%2BBq1iX7K2NkwgFXeWY48AhvEFt72lMRm8VmwG2kXdR2l4z6GlFhQj%2FcCV%2FWxkSVlXCk5Vgp7X5TO%2B8sG%2BYm1nwaveynyFs%2FUzd1UVvfAI2nTmzSn4G6wLcbpvePMPPfoQoCAaZHwZTA%3D%3D&X-Amz-Signature=fe55a98766801f9ee9711e4bd6f68486097bd9f83dc0afa77d4aea81a300ffc8

const DownloadSelectionPanel: React.FC = () => {

    /*const fetchAndZipImages = async () => {
        const zip = new JSZip();
        const imageFolder = zip.folder("images");

        //for (const key of keys) {
        //const s3Url = key.replace("Stable-Snap-", "");
        const s3Url = "https://stablesnap-upload-images.s3.amazonaws.com/eab1d33d-8239-47db-9d05-5ef610854ee6.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAYZZGSYRYA62D3BNM%2F20250623%2Feu-central-1%2Fs3%2Faws4_request&X-Amz-Date=20250623T150037Z&X-Amz-Expires=500&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aDGV1LWNlbnRyYWwtMSJHMEUCIQD%2BIXsrIRr2k1xl9fxOZcvN2J4gHEFYcciIBEgF8q4WDQIgY5jH7mH3h3tPPwYyVOEyA%2FWsi6Obfl7KhVaMFY%2FOaroq%2FQIIGBAAGgw2MDUxMzQ0Mzk1MzYiDC7cljE7p%2BqtguxKESraAuxwCBH%2Bjc2w4KNGR7KiPDvMGWp4bqicTf7y1dRg1r1SDO%2Bd%2BNWjghFycYcdizD%2F49tdbmkXnmhjZmysDFby4xoU2NWVJOcvHqU2nNpn%2BL9Mqs8FgFxOh6aoB%2FTceN01k025agC5y0oWNLNQWwtlyAasA80rbBC2QGKO%2F2ATGtDlVzk1rR4t2Y1UZyhMkJOsT6hS9UuprcR5CQxP0o3%2BXCCDRwDrrl6vOWAYw3l6xbPf7WcKW7s8FKdH2%2Ba0XwHDVr38BouJZ35ppssIEMaDHDIw%2FF4B0YRaSHnwF%2B7bCjkCOYJECIZxJGFEnw0GYSmo1lKpZ6%2FxyyEoc9KdQVKoN5swv4%2B8FD2bYFDc%2FrSjedZxEuQ2zfGuxRdV%2BsOvAQjA1mVRjQEzX5VehIKwwvnP5mV4KlosrXqtFYHhpc99jLAHeAIZppXj%2FMk%2FWNFuiHQ6zvLm99BJ0uVTzp4w8NTlwgY6ngG5mrGj72iJLZ7BatiYyzOQn09d1wmCeGenK4geUqU3fJ2tp2TNnSAss1GblXRteqgZ1Ix2MRD%2BBq1iX7K2NkwgFXeWY48AhvEFt72lMRm8VmwG2kXdR2l4z6GlFhQj%2FcCV%2FWxkSVlXCk5Vgp7X5TO%2B8sG%2BYm1nwaveynyFs%2FUzd1UVvfAI2nTmzSn4G6wLcbpvePMPPfoQoCAaZHwZTA%3D%3D&X-Amz-Signature=fe55a98766801f9ee9711e4bd6f68486097bd9f83dc0afa77d4aea81a300ffc8";
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

