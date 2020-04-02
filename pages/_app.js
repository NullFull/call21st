import React from 'react'
import App from 'next/app'
import Router from 'next/router'
import withGA from 'next-ga'


export default withGA('UA-143097345-3', Router)(App)
