import  {configureStore} from '@reduxjs/toolkit'
import useReducer from '../Features/UserSlice'
import agentReducer from '../Features/agentSlice'

export default configureStore({
    reducer:{
        user:useReducer,
        agent:agentReducer
    }
})