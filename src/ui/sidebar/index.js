import jsx, { Component } from 'custom-elements-jsx'

class MainSidebar extends Component {
    render() {
        const { context } = this.props

        return (
            <div>
                <basket-cart context={context} />
                <product-search />
            </div>
        )
    }
}

if (!window.customElements.get('main-sidebar'))
    window.customElements.define('main-sidebar', MainSidebar)
