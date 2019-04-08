import jsx, { Component } from 'custom-elements-jsx'
import { bindActionCreators } from 'redux'

import store from 'store'
import { getOr } from 'utils/lodash'
import * as actions from 'ducks/product/actions'
import { addPhoneToBasket } from 'ducks/catalog/actions'
import * as selectors from 'ducks/product/selectors'

const { dispatch } = store

const mapState = state => ({
    phone: selectors.getPhone(state),
})

const bindedActions = {
    ...bindActionCreators({ ...actions, addPhoneToBasket }, dispatch),
}

class MainProduct extends Component {
    componentDidMount() {
        const { context } = this.props
        const id = getOr(null, 'match.params.id', context)

        bindedActions.fetchPhone({ id })

        this.unsubscribe = store.subscribe(this.update)
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    renderFields = phone => {
        const fields = [
            'cpu',
            'camera',
            'size',
            'weight',
            'display',
            'battery',
            'memory',
        ]
        const entries = Object.entries(phone)

        const columnFields = entries.filter(([key]) => fields.includes(key))

        return columnFields.map(([key, value]) => (
            <div className="column">
                <div className="ab-details-title">
                    <p>{key}</p>
                </div>
                <div className="ab-details-info">{value}</div>
            </div>
        ))
    }

    renderContent = phone => {
        return (
            <div className="thumbnail">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            className="img-thumbnail"
                            src={phone.image}
                            alt={phone.name}
                        />
                    </div>
                    <div className="col-md-6">{this.renderFields(phone)}</div>
                </div>
                <div className="caption-full">
                    <h4 className="pull-right">${phone.price}</h4>
                    <h4>{phone.name}</h4>
                    <p>{phone.description}</p>
                </div>
            </div>
        )
    }

    renderSidebar = phone => {
        const { context } = this.props

        return (
            <div>
                <p className="lead">Quick shop</p>
                <basket-cart context={context} />
                <div className="form-group">
                    <h1>{phone.name}</h1>
                    <h2>${phone.price}</h2>
                </div>
                <custom-link
                    to="/"
                    className="btn btn-info btn-block"
                    context={context}
                >
                    Back to store
                </custom-link>
                <button
                    className="btn btn-success btn-block"
                    style={{ marginTop: '10px' }}
                    onClick={() => {
                        bindedActions.addPhoneToBasket(phone.id)
                    }}
                >
                    Add to cart
                </button>
            </div>
        )
    }

    render() {
        const { phone } = mapState(store.getState())

        return (
            <div className="view-container" style={{ paddingBottom: '20px' }}>
                <div className="container">
                    <div className="row">
                        <div
                            className="col-md-9"
                            style={{ paddingTop: '20px' }}
                        >
                            {this.renderContent(phone)}
                        </div>
                        <div
                            className="col-md-3"
                            style={{ paddingTop: '20px' }}
                        >
                            {this.renderSidebar(phone)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

if (!window.customElements.get('main-product'))
    window.customElements.define('main-product', MainProduct)
