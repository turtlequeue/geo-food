import React, { Component } from 'react'
import { withLocation } from './withLocation'
import { withSubscription } from './withSubscription'

import { MapPage } from '../_page/MapPage'
import { WaitingPage } from '../_page/WaitingPage'

const App_ = ({ connected, ...props }) =>
  connected ? <MapPage {...props} /> : <WaitingPage {...props} />

export const App = withLocation(withSubscription(App_))
