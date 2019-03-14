import jsx, { Component } from 'custom-elements-jsx'

import './catalog'

class MainCatalogContainer extends Component {
    render() {
        return (
            <main-layout>
                <main-catalog {...this.props} />
            </main-layout>
        )
    }
}

if (!window.customElements.get('main-catalog-container'))
    window.customElements.define('main-catalog-container', MainCatalogContainer)
