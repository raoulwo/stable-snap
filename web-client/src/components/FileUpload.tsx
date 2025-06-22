import React, { type ChangeEvent, useState } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button.tsx";
import { uploadImage } from "@/lib/api.ts";

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length <= 0) {
      setSelectedFile(null);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      return;
    }

    try {
      await uploadImage(selectedFile);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="image">Upload Image</Label>
        <Input id="image" type="file" onChange={handleFileChange} />
      </div>
      <Button onClick={handleImageUpload}>Upload Image</Button>
    </div>
  );
};

export default FileUpload;