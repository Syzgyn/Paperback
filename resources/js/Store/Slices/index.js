import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import comicsReducer from '@/Store/Slices/comics'
import issuesReducer from '@/Store/Slices/issues'

const createRootReducer = (history) => combineReducers({
    comics: comicsReducer,
    issues: issuesReducer,
    router: connectRouter(history),
})

export default createRootReducer
