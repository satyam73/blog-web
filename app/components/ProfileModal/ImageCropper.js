import { Box } from "@mui/material";
import Image from "next/image";
import ReactCrop from "react-image-crop";

export default function ImageCropper({ crop, setCrop, imageRef, src, setCompletedCrop }) {
  return (
    <Box style={{ display: 'flex', height: '500px', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
      <ReactCrop aspect={1} crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => {
        setCompletedCrop(c)
      }}>
        <Image alt='crop' ref={imageRef} src={src} width={250} height={250} style={{ objectFit: 'contain' }} />
      </ReactCrop>
    </Box >
  );
}