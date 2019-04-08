import jsx, { Component } from 'custom-elements-jsx'
import { bindActionCreators } from 'redux'

import store from 'store'
import * as actions from 'ducks/catalog/actions'
import * as selectors from 'ducks/catalog/selectors'

import './catalog'

const { dispatch } = store

const mapState = state => ({
    phones: selectors.getPhones(state),
})

const bindedActions = {
    ...bindActionCreators(actions, dispatch),
}

class MainCatalogContainer extends Component {
    componentDidMount() {
        const { phones } = mapState(store.getState())

        if (!phones.length) bindedActions.fetchPhones()

        this.unsubscribe = store.subscribe(this.update)
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    render() {
        const { phones } = mapState(store.getState())
        const { context } = this.props

        return (
            <main-layout context={context}>
                <main-catalog
                    phones={phones}
                    fetchPhones={bindedActions.fetchPhones}
                    addPhoneToBasket={bindedActions.addPhoneToBasket}
                    {...this.props}
                />
            </main-layout>
        )
    }
}

if (!window.customElements.get('main-catalog-container'))
    window.customElements.define('main-catalog-container', MainCatalogContainer)
