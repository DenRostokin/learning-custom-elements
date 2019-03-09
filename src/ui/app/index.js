import jsx from 'custom-elements-jsx'
import 'custom-elements-router'

import history from 'utils/history'

const app = (
    <custom-router history={history}>
        <main-layout>
            <custom-switch>
                <custom-route path="/" exact component="main-catalog" />
                <custom-redirect from="/*" to="/" />
            </custom-switch>
        </main-layout>
    </custom-router>
)

export default app
