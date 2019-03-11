import { createAction } from 'redux-actions'

import * as api from 'api/catalog'
import * as CONST from './const'
import { getInitialPhones, getPhonesPageIds } from './selectors'
import { fetchData } from 'ducks/shared/fetch'

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

export const fetchPhones = () => (dispatch, getState) => {
    const offset = getPhonesPageIds(getState()).length
    const action = createAction(CONST.PHONES_PAGE)
    const config = {
        name: CONST.PHONES_INSTANCE,
        apiMethod: api.fetchPhones.bind(null, { offset }),
        handleSuccess: data => {
            const newPhones = getNewPhones(data, getState())
            const newPhonesIds = Object.keys(newPhones)

            dispatch(action(newPhonesIds))

            return newPhones
        },
    }

    dispatch(fetchData(config))
}
