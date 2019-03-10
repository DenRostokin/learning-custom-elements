import jsx, { Component } from 'custom-elements-jsx'
import { bindActionCreators } from 'redux'

import store from 'store'
import * as actions from 'ducks/catalog/actions'

const { dispatch } = store

const bindedActions = {
    actions: bindActionCreators(actions, dispatch),
}

class MainCatalog extends Component {
    componentDidMount() {
        bindedActions.actions.fetchPhones()
    }

    render() {
        return <div>Catalog</div>
    }
}

if (!window.customElements.get('main-catalog'))
    window.customElements.define('main-catalog', MainCatalog)
