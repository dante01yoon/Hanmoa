import React, { FC, useRef, useState, useEffect } from "react";
import Blob from "cross-blob";

interface IThumbProps {
  file: Blob;
}
const Thumb: FC<IThumbProps> = ({ file }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [thumb, setThumb] = useState<string | ArrayBuffer | null>();
  const fileRef = useRef<Blob>(new Blob());

  const handleFileRead = (file: Blob) => {
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      setThumb(fileReader.result);
    };

    fileReader.readAsDataURL(file);
  };
  useEffect(() => {
    if (fileRef.current !== file) {
      setIsLoading(true);
    }
    handleFileRead(file);
  });

  if (isLoading) {
    <p>...loading</p>;
  }
  return <img src={thumb as string} alt={thumb as string} />;
};

export default Thumb;
