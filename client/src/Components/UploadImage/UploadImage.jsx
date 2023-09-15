import React, { useEffect, useRef, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import "./UploadImage.css";
import { Button, Group } from "@mantine/core";

const UploadImage = ({
    propertyDetails,
    setPropertyDetails,
  nextStep,
  prevStep,
}) => {
  const [imageURL, setImageURL] = useState([]);
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  const handleNext = () => {
    setPropertyDetails((prev) => ({ ...prev, image: imageURL }));
    nextStep();
  };
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dtjuhypa0",
        uploadPreset: "yrm214ld",
        maxFiles: 5,
      },
      (err, result) => {
        if (result.event === "success") {
          setImageURL((prevURLs) => [...prevURLs, result.info.secure_url]);
        }
      }
    );
  }, []);

  return (
    <div className="flexColCenter uploadWrapper">
      {imageURL.length === 0 ? (
        <div
          className="flexColCenter uploadZone"
          onClick={() => widgetRef.current?.open()}
        >
          <AiOutlineCloudUpload size={50} color="grey" />
          <span>Upload Image</span>
        </div>
      ) : (
        <div className="uploadedImageGrid">
          {imageURL.map((image, index) => (
            <div
              className="flexColCenter imagediv"
              onClick={() => widgetRef.current?.open()}
            >
              <img src={image} width={"100%"} alt="" key={index} />
            </div>
          ))}
        </div>
      )}

      <Group position="center" mt={"xl"}>
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={imageURL.length===0}>
          Next
        </Button>
      </Group>
    </div>
  );
};

export default UploadImage;
