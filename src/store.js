import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducer from 'ducks'

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store
