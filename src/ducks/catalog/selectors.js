import { createSelector } from 'reselect'

import { compact } from 'utils/lodash'
import * as CONST from './const'
import { getPhone } from 'ducks/product/selectors'

export const getForm = state => state[CONST.FORM_NAME]

const getPayload = (state, instanceName) => {
    const form = getForm(state)

    return form[instanceName].payload
}

export const getInitialPhones = state => getPayload(state, 'phones') || {}

export const getPhonesPage = state => {
    const form = getForm(state)

    return form.phonesPage || {}
}

export const getPhonesPageIds = state => {
    const phonesPage = getPhonesPage(state)

    return phonesPage.ids || []
}

export const getSearch = state => {
    const form = getForm(state)

    return form.search || ''
}

export const getPhones = createSelector(
    getInitialPhones,
    getPhonesPageIds,
    getSearch,
    (phones, ids, search) => {
        const result = ids.reduce((acc, id) => {
            if (
                phones[id] &&
                phones[id].name.toLowerCase().includes(search.toLowerCase())
            )
                return [...acc, phones[id]]

            return acc
        }, [])

        return compact(result)
    }
)

export const getBasket = state => {
    const form = getForm(state)

    return form.basket || []
}

export const getTotalBasketCount = createSelector(
    getBasket,
    basket => basket.length
)

export const getTotalBasketPrice = createSelector(
    getBasket,
    getInitialPhones,
    getPhone,
    (basket, phones, phone) =>
        basket.reduce((acc, id) => {
            const { price = 0 } = phones[id] || phone || {}

            return acc + price
        }, 0)
)
