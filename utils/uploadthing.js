import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

export const { useUploadThing, uploadFiles } = generateReactHelpers();
export const UploadButton = generateUploadButton();
export const UploadDropzone = generateUploadDropzone();
