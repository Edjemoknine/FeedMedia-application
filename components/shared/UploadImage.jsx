"use client";

import { useDropzone } from "@uploadthing/react";
import { generateClientDropzoneAccept } from "uploadthing/client";
import { useCallback } from "react";
import Image from "next/image";
import { UploadCloudIcon } from "lucide-react";
import { Button } from "../ui/button";
export const convertFileToUrl = (file) => URL.createObjectURL(file);

export default function UploadImage({ onFieldChange, imageUrl, setFiles }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      className="border h-72 w-full rounded-lg overflow-hidden flex flex-col justify-center items-center gap-3 text-center"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {imageUrl ? (
        <div className="w-full h-full relative">
          <Image src={imageUrl} alt="image" className="object-cover" fill />
        </div>
      ) : (
        <div className="flex justify-center flex-col gap-3 text-white items-center">
          <UploadCloudIcon size={80} />
          <h3 className="font-semibold text-xl">Drag and Drop Photo</h3>
          <p>SVG, PNG, JPG</p>
          <Button>Select from computer</Button>
        </div>
      )}
    </div>
  );
}
// export default function UploadImage({ onFieldChange, imageUrl, setFiles }) {
//   const router = useRouter();
//   return (
//     <main className="flex flex-col items-center justify-between text-white ">
//       <UploadDropzone
//         endpoint="imageUploader"
//         onClientUploadComplete={(res) => {
//           router(`?image=${res[0].url}`);
//         }}
//         onUploadError={(error) => {
//           alert(`ERROR! ${error.message}`);
//         }}
//       />
//     </main>
//   );
// }
