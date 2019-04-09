import jsx, { Component } from 'custom-elements-jsx'

import store from 'store'
import * as routes from 'utils/routes'
import {
    getTotalBasketCount,
    getTotalBasketPrice,
} from 'ducks/catalog/selectors'

const mapState = state => ({
    totalBasketCount: getTotalBasketCount(state),
    totalBasketPrice: getTotalBasketPrice(state),
})

class BasketCart extends Component {
    render() {
        const { totalBasketCount, totalBasketPrice } = mapState(
            store.getState()
        )
        const { context } = this.props

        return (
            <div className="cart">
                <div className="dropDown">
                    <custom-link
                        context={context}
                        to={routes.basket()}
                        id="dLabel"
                        className="btn btn-primary btn-block btn-lg"
                    >
                        <i className="fas fa-shopping-cart" />
                        <span>
                            {` ${totalBasketCount} item(s) - $${totalBasketPrice}`}
                        </span>
                    </custom-link>
                </div>
            </div>
        )
    }
}

if (!window.customElements.get('basket-cart'))
    window.customElements.define('basket-cart', BasketCart)
