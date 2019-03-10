import jsx, { Component } from 'custom-elements-jsx'
import { bindActionCreators } from 'redux'

import store from 'store'
import * as actions from 'ducks/catalog/actions'
import * as selectors from 'ducks/catalog/selectors'
import * as routes from 'utils/routes'

const { dispatch } = store

const mapState = state => ({
    phones: selectors.getPhones(state),
})

const bindedActions = {
    actions: bindActionCreators(actions, dispatch),
}

class MainCatalog extends Component {
    componentDidMount() {
        bindedActions.actions.fetchPhones()

        store.subscribe(this.update)
    }

    renderPhone = (phone, index) => {
        const { context } = this.props
        const shortDescription = phone.description.slice(0, 60)

        return (
            <div
                key={`phone-${index}`}
                className="col-sm-4 col-lg-4 col-md-4 book-list"
            >
                <div className="thumbnail">
                    <img
                        className="img-thumbnail"
                        src={phone.image}
                        alt={phone.name}
                    />
                    <div className="caption">
                        <h4 className="pull-right">${phone.price}</h4>
                        <h4>
                            <custom-link
                                context={context}
                                to={routes.product(phone.id)}
                            >
                                {phone.name}
                            </custom-link>
                        </h4>
                        <p>{shortDescription}</p>
                    </div>
                </div>
            </div>
        )
    }

    render() {
        const { phones } = mapState(store.getState())

        return (
            <div>
                <div className="books row">{phones.map(this.renderPhone)}</div>
            </div>
        )
    }
}

if (!window.customElements.get('main-catalog'))
    window.customElements.define('main-catalog', MainCatalog)
