import React, { useState } from "react";
import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,MultiSelect

} from "@mantine/core";
import { useForm } from "@mantine/form";
import { validateString } from "../../utils/common";

const Aminities = ({
  nextStep,
  prevStep,
  propertyDetails,
  setPropertyDetails,
}) => {
  const form = useForm({
    initialValues: {
      aminities: propertyDetails?.aminities,
      bedroomType: propertyDetails?.bedroomType,
      furnishType: propertyDetails?.furnishType,
      buildingProgress: propertyDetails?.buildingProgress,
      bathroom: propertyDetails?.bathroom,
    },
    validate: {
      furnishType: (value) => validateString(value),
      buildingProgress: (value) => validateString(value),
      bedroomType: (value) => validateString(value),
    //   bathroom: (value) =>
    //     value < 10 ? "please enter the number of bathrooms" : null,
    },
  });
  const [finished,setFinished]=useState(false)

  const { aminities, bathroom, buildingProgress, furnishType, bedroomType } =
    form.values;
  const handleSubmit = async() => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        aminities,
        bathroom,
        buildingProgress,
        furnishType,
        bedroomType,
      }));
      console.log(propertyDetails,'in the 4th step')
      setFinished(true)
    }
};
const addProperty = ()=>{
    
}
return (
    <Box maw="50%" mx="auto" my="md">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
       <MultiSelect
          w={"100%"}
          withAsterisk
          label={"aminities"}
          searchable
          data={[
            "gym",
            "swimming pool",
            "garden",
            "parking",
            "gated colony",
            "24 hours security",
          ]}
          {...form.getInputProps("aminities")}
        />
        <Select
          w={"100%"}
          withAsterisk
          label={"bedroomType"}
          clearable
          searchable
          data={["1 BHK", "2 BHK", "3 BHK", "4 BHK", "1 RK"]}
          {...form.getInputProps("bedroomType", { type: "input" })}
        />
        <Select
          w={"100%"}
          withAsterisk
          label={"furnishType"}
          clearable
          searchable
          data={["NON FURNISHED", "SEMI FURNISHED", "FULLY FURNISHED"]}
          {...form.getInputProps("furnishType", { type: "input" })}
        />
     
        <Select
          w={"100%"}
          withAsterisk
          label={"buildingProgress"}
          clearable
          searchable
          data={["UNDER CONSTRUCTION","COMPLETED"]}
          {...form.getInputProps("buildingProgress", { type: "input" })}
        />
     
       
        <NumberInput
          withAsterisk
          label="bathroom"
          placeholder="bathroom"
          min={0}
          {...form.getInputProps("bathroom")}
        />
        
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
         { !finished?
             <Button type="submit">Next step</Button>
            :
          <Button color="green" onClick={addProperty()}>add property</Button>
        }
        </Group>
      </form>
    </Box>
  );
};

export default Aminities;
