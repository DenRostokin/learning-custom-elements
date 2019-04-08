import { combineReducers } from 'redux'
import { handleAction } from 'redux-actions'

import * as CONST from './const'
import { getFetchReducer } from 'ducks/shared/fetch'

const phonesPageReducer = handleAction(
    CONST.PHONES_PAGE,
    (state, { payload }) => {
        if (payload) return { ...state, ids: [...state.ids, ...payload] }

        return { ...state, ids: [] }
    },
    { ids: [] }
)

const basketReducer = handleAction(
    CONST.BASKET,
    (state, { payload }) => {
        return [...state, payload]
    },
    []
)

const searchReducer = handleAction(
    CONST.SEARCH_PHONE,
    (state, { payload = '' }) => {
        return payload
    },
    ''
)

export default combineReducers({
    phones: getFetchReducer(CONST.PHONES_INSTANCE),
    phonesPage: phonesPageReducer,
    basket: basketReducer,
    search: searchReducer,
})
