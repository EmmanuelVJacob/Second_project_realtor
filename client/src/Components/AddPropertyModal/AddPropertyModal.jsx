import React, { useState } from "react";
import { Container, Modal, Stepper } from "@mantine/core";
import AddLocation from "../AddLocation/AddLocation";
import { useSelector } from "react-redux";
import { selectAgent } from "../../Features/agentSlice";
import UploadImage from "../UploadImage/UploadImage";
import BasicDetails from "../BasicDetails/BasicDetails";
import Aminities from "../Aminities/Aminities";
const AddPropertyModal = ({ opened, setOpened }) => {
  const agent_ = useSelector(selectAgent);
  const [active, setActive] = useState(0);
  const [propertyDetails, setPropertyDetails] = useState({
    title: "",
    description: "",
    price: 0,
    address: "",
    city: "",
    country: "",
    image: [],
    aminities: [],
    aroundPropery: [],
    carpetArea: 0,
    bedroomType: "",
    furnishType: "",
    PricePerSq: 0,
    buildingProgress: "",
    bathroom: 0,
    soldStatus: false,
    userEmail: agent_?.email,
  });
  console.log(agent_?.email, "agnet email");
  const nextStep = () => {
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () => {
    setActive((current) => (current > 0 ? current - 1 : current));
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        closeOnClickOutside
        size={"90rem"}
      >
        <Container h={"40rem"} w={"100%"}>
          <Stepper
            active={active}
            onStepClick={setActive}
            breakpoint="sm"
            allowNextStepsSelect={false}
          >
            <Stepper.Step label="location" description="Address">
              <AddLocation
                nextStep={nextStep}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            </Stepper.Step>
          
            <Stepper.Step label="Upload image" description="property image">
              <UploadImage
                nextStep={nextStep}
                prevStep={prevStep}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            </Stepper.Step>
            <Stepper.Step label="details" description="enter property details">
              <BasicDetails
                nextStep={nextStep}
                prevStep={prevStep}
                propertyDetails={propertyDetails}
                setPropertyDetails={setPropertyDetails}
              />
            </Stepper.Step>
            <Stepper.Step label="aminities" description="enter property aminities">
              <Aminities 
                              nextStep={nextStep}
                              prevStep={prevStep}
                              propertyDetails={propertyDetails}
                              setPropertyDetails={setPropertyDetails}
                              />
            </Stepper.Step>
            <Stepper.Completed>
            </Stepper.Completed>
          </Stepper>
        </Container>
      </Modal>
    </>
  );
};

export default AddPropertyModal;
