import { combineReducers } from 'redux'

import catalogReducer from './catalog'

export default combineReducers({
    catalog: catalogReducer,
})
