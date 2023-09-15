import React from 'react'
import {useForm} from '@mantine/form'
import { Button, Group, Select, TextInput } from '@mantine/core';
import useCountries from '../../Hooks/useCountries'
import { validateString } from '../../utils/common';

const AddLocation = ({propertyDetails,setPropertyDetails,nextStep}) => {
    const {getAll} = useCountries()
    const form = useForm({
        initialValues:{
            country:propertyDetails?.country,
            city:propertyDetails?.city,
            address:propertyDetails?.address
        },
        validate:{
            country:(value)=>validateString(value),
            city:(value)=>validateString(value),
            address:(value)=>validateString(value)
        }
    })
    const {country,city,address }= form.values;
    const handlesubmit = ()=>{
        const {hasErrors} = form.validate()
        console.log('noiuuu')
        if(!hasErrors){
            setPropertyDetails((prev)=>({...prev,country,city,address}))
            nextStep()
        }
    }
  return (
 <>
 <form
 onSubmit={(e)=>{
    e.preventDefault()
    handlesubmit()
 }}
 >
    <div className="flexCenter">
       <Select
       w={"100%"}
       withAsterisk
       label={'country'}
       clearable
       searchable
       data={getAll()}
       {
        ...form.getInputProps("country",{type:"input"})
       }
       />
       <TextInput 
           w={"100%"}
           withAsterisk
           label={'city'}
           {
            ...form.getInputProps("city",{type:"input"})
           }
       />
         <TextInput 
           w={"100%"}
           withAsterisk
           label={'address'}
           {
            ...form.getInputProps("address",{type:"input"})
           }
       />
    </div>
<Group position='center' mt={"xl"}>
    <Button type='submit'>next step</Button>
</Group>
 </form>
 </>
  )
}

export default AddLocation
