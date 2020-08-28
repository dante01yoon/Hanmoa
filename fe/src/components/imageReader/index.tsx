import React, { FC, useRef, useState, useEffect } from "react";

interface IImageReaderProps {
  name: string;
}
const ImageReader: FC<IImageReaderProps> = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [thumb, setThumb] = useState<string | ArrayBuffer | null>("");
  // const fileRef = useRef<Blob>(new Blob([], { type: "image/png" }));
  const handleReader = () => {
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setIsLoading(false);
      setThumb(fileReader.result);
    };

    // fileReader.readAsDataURL(fileRef.current);
  };
  

  if (isLoading) {
    return <p>...loading</p>;
  }
  return (<>hello</>)
  // return <img src={thumb} alt={fileRef.current} />;
};
