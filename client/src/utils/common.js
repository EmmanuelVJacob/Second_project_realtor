
export const validateString = (value)=>{
return value?.length<3 || value === null? "must have three atleast 3 characters":null;
}