import jsx, { Component } from 'custom-elements-jsx'
import { bindActionCreators } from 'redux'

import store from 'store'
import { getOr } from 'utils/lodash'
import * as actions from 'ducks/product/actions'

const { dispatch } = store

const bindedActions = {
    actions: bindActionCreators(actions, dispatch),
}

class MainProduct extends Component {
    componentDidMount() {
        const { context } = this.props
        const id = getOr(null, 'match.params.id', context)

        bindedActions.actions.fetchPhone({ id })
    }

    render() {
        return <div>Phone</div>
    }
}

if (!window.customElements.get('main-product'))
    window.customElements.define('main-product', MainProduct)
