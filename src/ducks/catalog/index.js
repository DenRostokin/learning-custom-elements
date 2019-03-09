import { combineReducers } from 'redux'

import * as CONST from './const'
import { getFetchReducer } from 'ducks/shared/fetch'

export default combineReducers({
    phones: getFetchReducer(CONST.PHONES_INSTANCE),
})
