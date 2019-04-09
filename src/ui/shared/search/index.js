import jsx, { Component } from 'custom-elements-jsx'
import { bindActionCreators } from 'redux'

import store from 'store'
import { debounce } from 'utils/lodash'
import * as actions from 'ducks/catalog/actions'
import * as selectors from 'ducks/catalog/selectors'

const mapState = state => ({
    search: selectors.getSearch(state),
})

const bindedActions = {
    ...bindActionCreators(actions, store.dispatch),
}

class ProductSearch extends Component {
    constructor() {
        super()

        this.state = { value: this.search }

        this.searchPhone = debounce(bindedActions.searchPhone, 300)
    }

    get search() {
        const { search } = mapState(store.getState())

        return search
    }

    handleSubmit = event => {
        event.preventDefault()

        bindedActions.searchPhone(this.state.value)
    }

    handleChange = event => {
        const { value } = event.target

        this.setState({ value })

        this.searchPhone(value)
    }

    clearSearch = () => {
        this.setState({ value: '' })

        bindedActions.searchPhone()
    }

    render() {
        return (
            <div className="well blosd" style={{ marginTop: '10px' }}>
                <h3 className="lead">Quick shop</h3>
                <div className="input-group" style={{ display: 'block' }}>
                    <form
                        onSubmit={this.handleSubmit}
                        style={{ display: 'flex', position: 'relative' }}
                    >
                        <custom-input
                            value={this.state.value}
                            onChange={this.handleChange}
                            className="form-control"
                            style={{ flexGrow: 1 }}
                            catch="style"
                        />
                        <i
                            className="fas fa-times"
                            style={{
                                display: this.state.value ? 'block' : 'none',
                                position: 'absolute',
                                top: '50%',
                                right: '55px',
                                transform: 'translate(0, -50%)',
                                fontSize: '18px',
                                zIndex: '10',
                                cursor: 'pointer',
                            }}
                            onClick={this.clearSearch}
                        />
                        <span
                            className="input-group-btn"
                            style={{ width: '40px' }}
                        >
                            <button className="btn btn-default">
                                <span className="glyphicon glyphicon-search" />
                            </button>
                        </span>
                    </form>
                </div>
            </div>
        )
    }
}

if (!window.customElements.get('product-search'))
    window.customElements.define('product-search', ProductSearch)
