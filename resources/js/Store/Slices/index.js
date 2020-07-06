import { combineReducers } from 'redux'
import comicsReducer from '@/Store/Slices/comics'
import { connectRouter } from 'connected-react-router'

const createRootReducer = (history) => combineReducers({
    comics: comicsReducer,
    router: connectRouter(history),
})

export default createRootReducer
