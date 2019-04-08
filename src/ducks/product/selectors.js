import * as CONST from './const'

export const getForm = state => state[CONST.FORM_NAME]

const getPayload = (state, instanceName) => {
    const form = getForm(state)

    return form[instanceName].payload
}

export const getPhone = state =>
    getPayload(state, 'phone') || { hello: 'world' }
