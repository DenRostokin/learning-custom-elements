import { createSelector } from 'reselect'

import { compact } from 'utils/lodash'
import * as CONST from './const'

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

export const getPhones = createSelector(
    getInitialPhones,
    getPhonesPageIds,
    (phones, ids) => {
        const result = ids.map(id => phones[id])

        return compact(result)
    }
)
