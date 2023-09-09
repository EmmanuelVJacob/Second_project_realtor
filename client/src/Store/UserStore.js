import  {configureStore} from '@reduxjs/toolkit'
import useReducer from '../Features/UserSlice'
import agentReducer from '../Features/agentSlice'
import adminReducer from '../Features/adminSlice'

export default configureStore({
    reducer:{
        user:useReducer,
        agent:agentReducer,
        admin:adminReducer
    }
})