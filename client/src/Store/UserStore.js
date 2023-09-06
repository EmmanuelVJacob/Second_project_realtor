import  {configureStore} from '@reduxjs/toolkit'
import useReducer from '../Features/UserSlice'

export default configureStore({
    reducer:{
        user:useReducer,
    }
})