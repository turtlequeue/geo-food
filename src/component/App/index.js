import React, { Component } from 'react'
import { withCssReset } from '../_abstract/cssReset'
import { withSubscription } from './withSubscription'

import { MapPage } from '../_page/MapPage'

const App_ = props => <MapPage {...props} />

export const App = withCssReset(withSubscription(App_))
