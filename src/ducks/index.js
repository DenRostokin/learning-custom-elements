import { combineReducers } from 'redux'

import catalogReducer from './catalog'
import productReducer from './product'

export default combineReducers({
    catalog: catalogReducer,
    product: productReducer,
})
