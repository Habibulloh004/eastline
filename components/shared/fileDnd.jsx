"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Input } from "../ui/input";
import { useRef, useState } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ImageCropper from "./imageCropper";
import toast from "react-hot-toast";

function DropTarget({ images, setImages, limitImg }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef();
  const [cropImageUrl, setCropImageUrl] = useState("");
  const [currentPage, setCurrentPage] = useState("choose-img");
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  function selectFiles() {
    fileInputRef.current.click();
  }

  function onFileSelect(event) {
    const files = event.target.files;
    if (files.length === 0) return;
    handleFiles(files);
  }

  function handleFiles(files) {
    const newImages = [];
    const maxSize = 2 * 1024 * 1024; // 4MB in bytes

    if (images.length + files.length > limitImg) {
      toast.error(`Вы можете выбрать не более ${limitImg} изображений`);
      return;
    }

    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split("/")[0] !== "image") continue;

      if (files[i].size > maxSize) {
        toast.error(
          `${files[i].name} слишком большой. Выберите файл размером менее 2 МБ`
        );
        continue;
      }

      if (!images.some((e) => e.name === files[i].name)) {
        newImages.push({
          name: files[i].name,
          url: URL.createObjectURL(files[i]),
          file: files[i],
          cropped: false, // To track if the image has been cropped
        });
      }
    }
    setImages((prevImages) => [...prevImages, ...newImages]);
  }

  function deleteImage(index) {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  }

  function onDragOver(event) {
    event.preventDefault();
    setIsDragging(true);
    event.dataTransfer.dropEffect = "copy";
  }

  function onDragLeave(event) {
    event.preventDefault();
    setIsDragging(false);
  }

  function onDrop(event) {
    event.preventDefault();
    setIsDragging(false);
    const files = event.dataTransfer.files;
    handleFiles(files);
  }

  function onCropDone(imgCroppedArea) {
    const canvasEle = document.createElement("canvas");
    canvasEle.width = imgCroppedArea.width;
    canvasEle.height = imgCroppedArea.height;

    const context = canvasEle.getContext("2d");
    const imageObj1 = new window.Image(); // Using the native Image object
    imageObj1.src = cropImageUrl;

    imageObj1.onload = function () {
      context.drawImage(
        imageObj1,
        imgCroppedArea.x,
        imgCroppedArea.y,
        imgCroppedArea.width,
        imgCroppedArea.height,
        0,
        0,
        imgCroppedArea.width,
        imgCroppedArea.height
      );

      const dataUrl = canvasEle.toDataURL("image/jpeg");

      // Convert dataURL to Blob (file object)
      const blob = dataURLToBlob(dataUrl);
      const croppedFile = new File(
        [blob],
        `cropped_${images[currentImageIndex].name}`,
        {
          type: "image/jpeg",
        }
      );

      // Update the specific image in the images array
      setImages((prevImages) =>
        prevImages.map((img, index) =>
          index === currentImageIndex
            ? { ...img, url: dataUrl, file: croppedFile, cropped: true }
            : img
        )
      );

      setCurrentPage("choose-img");
      setCropImageUrl("");
    };
  }

  // Helper function to convert dataURL to Blob
  function dataURLToBlob(dataUrl) {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new Blob([u8arr], { type: mime });
  }

  function onCropCancel() {
    setCurrentPage("choose-img");
    setCropImageUrl("");
  }

  return (
    <>
      {currentPage === "choose-img" ? (
        <div className="p-4 border rounded-lg overflow-hidden textSmall3">
          <section className="flex items-center flex-col lg:flex-row justify-between gap-5 w-full">
            <div className="lg:w-1/2 ">
              <div>
                <p className="font-semibold text-xs lg:text-base">
                  Загрузка изображений методом перетаскивания
                </p>
              </div>
              <div
                className="mt-4 h-36 rounded-lg border-2 border-dashed border-primary px-2 text-primary bg-gray-100 flex justify-center items-center select-none"
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
              >
                {isDragging ? (
                  <span className="text-lg text-primary ml-1 cursor-pointer transition-opacity duration-300 hover:opacity-60">
                    Перетащите изображения сюда
                  </span>
                ) : (
                  <>
                    Перетащите изображение сюда или{" "}
                    <span
                      className="text-primary ml-1 cursor-pointer transition-opacity duration-300 hover:opacity-60"
                      onClick={selectFiles}
                    >
                      Просматривать
                    </span>
                  </>
                )}
                <Input
                  type="file"
                  ref={fileInputRef}
                  onChange={onFileSelect}
                  name="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                />
              </div>
            </div>

            <div className="mt-4 lg:w-[45%] flex flex-wrap gap-3 justify-center lg:justify-between items-start overflow-y-auto">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative w-[100px] md:w-[130px] lg:w-[170px] aspect-square border rounded-md overflow-hidden"
                >
                  <span
                    className="absolute top-2 right-2 p-1 text-lg cursor-pointer text-primary z-50 bg-red-500 rounded-md"
                    onClick={() => deleteImage(index)}
                  >
                    <X className="w-3 h-3 lg:w-5 lg:h-5 text-secondary" />
                  </span>
                  <Image
                    width={100}
                    height={100}
                    src={image.url}
                    alt={image.name}
                    className="w-full aspect-square h-full rounded-lg"
                    onClick={() => {
                      setCropImageUrl(image.url);
                      setCurrentImageIndex(index);
                      setCurrentPage("crop-img");
                    }}
                  />
                </div>
              ))}
            </div>
          </section>
        </div>
      ) : currentPage === "crop-img" ? (
        <ImageCropper
          image={cropImageUrl}
          onCropDone={onCropDone}
          onCropCancel={onCropCancel}
        />
      ) : (
        <div>{/* Any additional UI can be added here */}</div>
      )}
    </>
  );
}

export default DropTarget;
