import * as api from 'api/catalog'
import * as CONST from './const'
import { fetchData } from 'ducks/shared/fetch'

export const fetchPhones = () => dispatch => {
    const config = {
        name: CONST.PHONES_INSTANCE,
        apiMethod: api.fetchPhones,
    }

    dispatch(fetchData(config))
}
