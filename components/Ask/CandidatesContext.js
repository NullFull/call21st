import React from 'react'

const CandidatesContext = React.createContext({})

CandidatesContext.STATUSES = {
    WAITING: 'waiting',
    LOADING: 'loading',
    LOADED: 'loaded'
}

export default CandidatesContext
