import React, { type ChangeEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button.tsx";
import { uploadImage } from "@/lib/api.ts";
import {CircleCheck, CircleX, CloudUpload, Loader2} from "lucide-react";
import {useAppContext} from "@/context/AppContext.tsx";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<
      "idle" | "ready" | "loading" | "success" | "error"
  >("idle");
  const { triggerFetchingResults } = useAppContext();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) {
      setSelectedFile(null);
      return;
    }
    setUploadStatus("ready");
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      setUploadStatus("loading");
      await uploadImage(selectedFile);
      console.log(">> successfully uploaded image");
      setUploadStatus("success");
    } catch (error) {
      console.error("Error in uploading image! ", error);
      setUploadStatus("error");
    }
    //wait for 5 seconds to reset the upload status to enable another upload of an image
    await new Promise((resolve) => setTimeout(resolve, 5000));
    setUploadStatus("idle");
    setSelectedFile(null);
    console.log(">>line 43");
    triggerFetchingResults();
    console.log(">>line 45");
  };

  const renderStatusIcon = () => {
    if(uploadStatus === "ready" || uploadStatus === "idle"){
      return (
          <CloudUpload />
      )
    }
    if(uploadStatus === "loading"){
      return (
          <Loader2 className="animate-spin" />
      )
    }
    if(uploadStatus === "error"){
      return (
          <CircleX className="text-red-500"/>
      )
    }
    return (
        <CircleCheck className="text-green-500" />
    )
  }

  return (
    <div className="flex justify-between items-end mb-2">
      <div className="mr-2">
        <Label className="mb-2" htmlFor="image">Upload Image</Label>
        <Input className=" border-2 border-gray-400" id="image" type="file" onChange={handleFileChange} />
      </div>
      <Button onClick={handleImageUpload} disabled={uploadStatus !== "ready"}>
        {renderStatusIcon()}
        Upload Image
      </Button>
    </div>
  );
};

export default FileUpload;