import { createSelector } from 'reselect'

import * as CONST from './const'

export const getForm = state => state[CONST.FORM_NAME]

const getPayload = (state, instanceName) => {
    const form = getForm(state)

    return form[instanceName].payload
}

export const getInitialPhones = state => getPayload(state, 'phones') || {}

export const getPagePhonesIds = state => {
    const form = getForm(state)

    return form.pagePhones.ids || []
}

export const getPhones = createSelector(
    getInitialPhones,
    getPagePhonesIds,
    (phones, ids) => ids.map(id => phones[id])
)
