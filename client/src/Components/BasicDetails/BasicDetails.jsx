import React from 'react'
import { Box, Button, Group, NumberInput, TextInput, Textarea } from '@mantine/core'
import {  useForm } from '@mantine/form'
import { validateString } from '../../utils/common'

const BasicDetails = ({nextStep,prevStep,propertyDetails,setPropertyDetails}) => {
    const form = useForm({
        initialValues:{
            title:propertyDetails?.title,
            description:propertyDetails?.description,
            price:propertyDetails?.price,
            carpetArea:propertyDetails?.carpetArea,
            pricePerSq:propertyDetails?.pricePerSq
        },
        validate: {
            title: (value) => validateString(value),
            description: (value) => validateString(value),
            price: (value) =>
                value < 1000 ? "Must be greater than 999 rupees" : null,
            carpetArea: (value) =>
                value < 100 ? "Must be greater than 100 sqft" : null,
            pricePerSq: (value) =>
                value < 100 ? "Must be greater than 100 rupees" : null,
          },
    })

    const {title,description,price,carpetArea,pricePerSq} = form.values
    const handleSubmit = ()=> {
        const {hasErrors} = form.validate()
        if(!hasErrors) {
         setPropertyDetails((prev)=> ({...prev, title, description, price,carpetArea,pricePerSq}))
         nextStep()
        }
       }
  return (
    <Box maw="50%" mx="auto" my="md">
      <form  onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}>
        <TextInput
          withAsterisk
          label="Title"
          placeholder="Property Name"
          {...form.getInputProps("title")}
        />
        <Textarea
          placeholder="Description"
          label="Description"
          withAsterisk
          {...form.getInputProps("description")}
        />
        <NumberInput
          withAsterisk
          label="Price"
          placeholder="price..."
          min={0}
          {...form.getInputProps("price")}
        />
        <NumberInput
          withAsterisk
          label="carpet Area"
          placeholder="carpet area"
          min={0}
          {...form.getInputProps("carpetArea")}
        />
        <NumberInput
          withAsterisk
          label="pricePerSq"
          placeholder="pricePerSq"
          min={0}
          {...form.getInputProps("pricePerSq")}
        />
        <Group position="center" mt="xl">
          <Button variant="default" onClick={prevStep}>
            Back
          </Button>
          <Button type="submit">
            Next step
          </Button>
        </Group>
      </form>
    </Box>
  );
}

export default BasicDetails
