import { combineReducers } from 'redux'
import { handleAction } from 'redux-actions'

import * as CONST from './const'
import { getFetchReducer } from 'ducks/shared/fetch'

const phonesPageReducer = handleAction(
    CONST.PHONES_PAGE,
    (state, { payload }) => ({ ...state, ids: [...state.ids, ...payload] }),
    { ids: [] }
)

export default combineReducers({
    phones: getFetchReducer(CONST.PHONES_INSTANCE),
    phonesPage: phonesPageReducer,
})
