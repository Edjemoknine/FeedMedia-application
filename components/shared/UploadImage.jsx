"use client";

import { UploadDropzone } from "@/utils/uploadthing";
import { useRouter } from "next/navigation";

export default function UploadImage({ onFieldChange, imageUrl, setFiles }) {
  const router = useRouter();
  return (
    <main className="flex flex-col items-center justify-between text-white ">
      <UploadDropzone
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          router(`?image=${res[0].url}`);
        }}
        onUploadError={(error) => {
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
