import jsx, { Component } from 'custom-elements-jsx'

class MainLayout extends Component {
    render() {
        const { children } = this.props

        return (
            <div className="view-container">
                <div className="container">
                    <div className="row">
                        <div className="col-md-3">Sidebar</div>
                        <div className="col-md-9">{children}</div>
                    </div>
                </div>
            </div>
        )
    }
}

if (!window.customElements.get('main-layout'))
    window.customElements.define('main-layout', MainLayout)
