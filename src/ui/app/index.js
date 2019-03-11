import jsx from 'custom-elements-jsx'
import 'custom-elements-router'

import history from 'utils/history'

const app = (
    <custom-router history={history}>
        <custom-switch>
            <custom-route path="/" exact component="main-catalog" />
            <custom-route path="/product/:id" component="main-product" />
            <custom-redirect from="/*" to="/" />
        </custom-switch>
    </custom-router>
)

export default app
