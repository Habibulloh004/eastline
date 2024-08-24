"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

const CustomImage = ({ src, fill, alt, className }) => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          className={`object-contain duration-700 ease-in-out group-hover:opacity-75 ${
            loading
              ? "slice-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          }
        `}
          onLoad={() => setLoading(false)}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={100}
          height={100}
          className={cn(
            className,
            "object-contain duration-700 ease-in-out group-hover:opacity-75",
            loading
              ? "slice-110 blur-2xl grayscale"
              : "scale-100 blur-0 grayscale-0"
          )}
          onLoad={() => setLoading(false)}
        />
      )}
    </>
  );
};

export default CustomImage;
