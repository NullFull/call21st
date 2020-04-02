import React from 'react'
import fetch from 'isomorphic-unfetch'
import FindByName from 'components/Ask/FindByName'
import FindByRegion from 'components/Ask/FindByRegion'
import CandidatesContext from 'components/Ask/CandidatesContext'
import client from 'utils/client'
import style from './index.styl'


const initial = {
    candidates: []
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                candidates: action.payload.map(candidate => {
                    candidate.checked = false
                    return candidate
                })
            }
        case 'TOGGLE_ALL':
            return {
                ...state,
                candidates: state.candidates.map(candidate => {
                    candidate.checked = action.payload
                    return candidate
                })
            }
        case 'TOGGLE_ITEM':
            return {
                ...state,
                candidates: state.candidates.map(candidate => {
                    if (candidate.id === action.payload.id) {
                        candidate.checked = !candidate.checked
                    }
                    return candidate
                })
            }
    }
}


const useCandidates = () => {
    const [state, dispatch] = React.useReducer(reducer, initial)

    const actions = {
        SET: data => dispatch({type: 'SET', payload: data}),
        TOGGLE_ALL: setTo => dispatch({type: 'TOGGLE_ALL', payload: setTo}),
        TOGGLE_ITEM: item => dispatch({type: 'TOGGLE_ITEM', payload: item})
    }

    const fetchCandidates = {  // TODO : overload
        byRegion: async (city, region) => {
            const response = await fetch(`/cities/${city.value}/regions/${region.value}/candidates.json`)
            const data = await response.json()
            actions.SET(data)
        },
        byName: async name => {
            const response = await client().post(`/api/candidates/_search`, {
                q: name
            })
            const payload = await response.json()
            actions.SET(payload.data)
        }
    }

    return {
        candidates: state.candidates,
        fetchCandidates,
        actions
    }
}


const Candidates = () => {
    const { candidates, actions } = React.useContext(CandidatesContext)

    if (candidates.length < 1) {
        return (
            <div className={style.candidates}>
                <p className={style.message}>지역구를 선택하거나 이름을 입력해주세요</p>
            </div>
        )
    }

    return (
        <div className={style.candidates}>
            <table>
                <thead>
                    <tr>
                        <td>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={candidates.every(candidate => candidate.checked)}
                                    onChange={e => actions.TOGGLE_ALL(e.target.checked)}
                                /> 
                                <span>전체 선택하기</span>
                            </div>
                        </td>
                    </tr>
                </thead>
                <tbody>
                {candidates.map(candidate => (
                    <tr key={candidate.id}>
                        <td>
                            <input
                                type="checkbox"
                                checked={candidate.checked}
                                onChange={() => actions.TOGGLE_ITEM(candidate)}
                            />
                            <span>{candidate.name}</span> <span>{candidate.party}</span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}


export default () => {
    const { candidates, fetchCandidates, actions } = useCandidates()

    const ask = async () => {
        const content = '후보님의 생각이 궁금합니다.'
        await client().sendRequest(content, candidates.map(candidate => candidate.id))

        alert('문의가 전송되었습니다.')
    }

    return (
        <div>
            <div>
                <div style={{padding: '2px 0 2px 0'}}>
                    <FindByRegion onSelect={(city, region) => fetchCandidates.byRegion(city, region)}/>
                </div>
                <div style={{padding: '2px 0 2px 0'}}>
                    <FindByName onSubmit={name => fetchCandidates.byName(name)}/>
                </div>
            </div>

            <div>
                <CandidatesContext.Provider value={{candidates, actions}}>
                    <Candidates />
                </CandidatesContext.Provider>
            </div>

            <div>
                <button className={style.ask} onClick={() => ask()}>후보님의 생각이 궁금합니다.</button>
            </div>
        </div>
    )
}
