import { fetchData } from 'ducks/shared/fetch'
import * as api from 'api/product'
import * as CONST from './const'

export const fetchPhone = payload => dispatch => {
    const config = {
        name: CONST.PHONE_INSTANCE,
        apiMethod: api.fetchPhone.bind(null, payload),
    }

    dispatch(fetchData(config))
}
