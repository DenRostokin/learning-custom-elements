import { createAction } from 'redux-actions'

import * as api from 'api/catalog'
import * as CONST from './const'
import { getInitialPhones, getPhonesPageIds } from './selectors'
import { fetchData, getFetchActions } from 'ducks/shared/fetch'

const getNewPhones = (data, state) => {
    const existingPhones = getInitialPhones(state)
    const newPhones = data.reduce(
        (acc, item) => ({
            ...acc,
            [item.id]: item,
        }),
        {}
    )

    return {
        ...existingPhones,
        ...newPhones,
    }
}

const phonesPageAction = createAction(CONST.PHONES_PAGE)

export const fetchPhones = () => (dispatch, getState) => {
    const offset = getPhonesPageIds(getState()).length
    const config = {
        name: CONST.PHONES_INSTANCE,
        apiMethod: api.fetchPhones.bind(null, { offset }),
        handleSuccess: data => {
            const newPhones = getNewPhones(data, getState())
            const newPhonesIds = data.map(item => item.id)

            dispatch(phonesPageAction(newPhonesIds))

            return newPhones
        },
    }

    return dispatch(fetchData(config))
}

export const clearPhones = () => dispatch => {
    const actions = getFetchActions(CONST.PHONES_INSTANCE)

    dispatch(actions.clear())
    dispatch(phonesPageAction())
}

export const addPhoneToBasket = phoneId => dispatch => {
    const action = createAction(CONST.BASKET)

    dispatch(action(phoneId))
}

export const searchPhone = createAction(CONST.SEARCH_PHONE)
