"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
// import ReactCrop from "react-crop";
// import DropTarget from "@/components/shared/fileDnd";

const ImagePage = () => {
//   const [image, setImage] = useState(null);
//   const [imageArray, setImageArray] = useState([]);
//   const [croppedImage, setCroppedImage] = useState(null);
//   const [backImage, setBackImage] = useState(null);
  const supabase = createClient(
    "https://bxdxvaioiunezestlkri.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4ZHh2YWlvaXVuZXplc3Rsa3JpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI5MzU5MDEsImV4cCI6MjAzODUxMTkwMX0.VVkuv29ktY8PERuJGKMS7CcjvrkFbhz-gssBkOznuBk"
  );

//   const saveImage = async (e) => {
//     e.preventDefault();
//     if (!imageArray.length) return;
//     console.log("ia", imageArray);

//     console.log("i", image.files);

//     // Validation for file size and format

//     // const fileEx = image.files[0].name.split(".").pop();
//     // const fileName = `${Math.random()}.${fileEx}`;
//     // const filePath = `${fileName}`;
//     // const { data, error } = await supabase.storage
//     //   .from("eastLine_images")
//     //   .upload(`${filePath}`, image.files[0]);
//     // if (error) {
//     //   // Handle error
//     //   console.log(error);
//     // } else {
//     //   // Handle success
//     //   console.log(data);
//     //   const backData = await supabase.storage.from("eastLine_images").getPublicUrl(filePath)
//     //   console.log("backing",backData);
//     // }
//   };

//   const handleImageSelect = (index) => {
//     // Function to select an image from imageArray for cropping
//     if (index >= 0 && index < imageArray.length) {
//         setCroppedImage(imageArray[index]);
//       }
//   };

//   const handleCropChange = (crop) => {
//     // Function to update croppedImage state with crop data
//     setCroppedImage((prevImage) => ({ ...prevImage, crop }));
//   };

//   const handleCropComplete = async (croppedArea, croppedPixels) => {


//     const updatedImageArray = [...imageArray];
//     const updatedImage = { ...updatedImageArray[croppedImage.index] };

//     // Update cropped image info in imageArray based on the server response
//     updatedImage.imageSrc = updatedImageArray[croppedImage.index] =
//       updatedImage;
//     setImageArray(updatedImageArray);

//     // Clear croppedImage state after successful cropping
//     setCroppedImage(null);
//   };

  return (
    <div>
      {/* <form onSubmit={saveImage}>
        <input
          type="file"
          name="image"
          onChange={(e) => {
            if (e.target.files[0].size > 10485760) {
              alert("File size cannot exceed 1 MB.");
              return;
            }

            const allowedTypes = ["image/png", "image/jpeg"];
            if (!allowedTypes.includes(e.target.files[0].type)) {
              alert("Only PNG and JPEG images are allowed.");
              return;
            }
            setImage(e.target);
            const fileEx = e.target.files[0].name.split(".").pop();
            const fileName = `${Math.random()}.${fileEx}`;
            const filePath = `${fileName}`;

            const reader = new FileReader();
            reader.onloadend = () => {
              setImageArray([
                ...imageArray,
                {
                  id: crypto.randomUUID(),
                  filePath,
                  file: e.target.files[0],
                  imageSrc: reader.result,
                },
              ]);
            };
            reader.readAsDataURL(e.target.files[0]);
          }}
        />
        <button onClick={() => saveImage}>submit</button>
      </form> */}
      {/* <DropTarget /> */}
      {/* {backImage && (
        <Image src={backImage} width={200} height={200} alt="rasm" />
      )} */}
      {/* {croppedImage && (
        <ReactCrop
          src={croppedImage.imageSrc}
          crop={croppedImage.crop}
          onImageLoaded={handleImageLoaded}
          onChange={handleCropChange}
          onComplete={handleCropComplete}
        />
      )} */}
      {/* {imageArray.length > 0 && // Display images only if there are some
        imageArray?.map((item, index) => (
          <Image
            key={item.id}
            src={item.imageSrc}
            alt="Image"
            width={200}
            height={200}
            onClick={() => handleImageSelect(index)} 
          />
        ))} */}
    </div>
  );
};

export default ImagePage;
