import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import './tabstyle.styl'
import FindByName from 'components/Ask/FindByName'
import FindByRegion from 'components/Ask/FindByRegion'
import FindByParty from 'components/Ask/FindByParty'
import Candidates from 'components/Ask/Candidates'
import CandidatesContext from 'components/Ask/CandidatesContext'
import client from 'utils/client'
import style from './index.styl'


const initial = {
    candidates: [],
    isLoaded: false
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'SET':
            return {
                ...state,
                candidates: action.payload.map(candidate => {
                    candidate.checked = false
                    return candidate
                }),
                isLoaded: true
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
            const { data } = await client().post(`/api/candidates/_search`, {
                q: name
            })
            actions.SET(data)
        },
        byParty: async party => {
            const response = await fetch(`/parties/${party.value}/candidates.json`)
            const data = await response.json()
            actions.SET(data)
        }
    }

    return {
        candidates: state.candidates,
        isLoaded: state.isLoaded,
        fetchCandidates,
        actions
    }
}


export default () => {
    const { candidates, isLoaded, fetchCandidates, actions } = useCandidates()

    const ask = async () => {
        if (candidates.length < 1) {
            alert('먼저 문의를 보낼 후보를 선택해주세요')
            return
        }

        const content = '후보님의 생각이 궁금합니다.'
        await client().sendRequest(content, candidates.map(candidate => candidate.id))

        alert('질문이 등록 되었습니다.\n연락처가 존재하는 후보에게는 질문이 메일로 전달됩니다.')
    }

    return (
        <div>
            <ul className={style.notice}>
                <li>
                    <h4>
                        공지 : 현재 후보의 공개된 이메일 정보가 오래되어 전송이 실패하는 경우가 많이 발생하고 있습니다.
                        검색결과에 이를 표시해두고 있으니 연락처를 아시는 분은 아래 연락처로 제보를 부탁드립니다.
                    </h4>
                </li>
            </ul>

            <div>
                <Tabs>
                    <TabList>
                        <Tab>지역구 후보 검색</Tab>
                        <Tab>비례대표 후보 검색</Tab>
                    </TabList>

                    <TabPanel>
                        <div className={style.input}>
                            <FindByRegion onSelect={(city, region) => fetchCandidates.byRegion(city, region)} />
                        </div>
                        <div className={style.input}>
                            <FindByName onSubmit={name => fetchCandidates.byName(name)} />
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className={style.input}>
                            <FindByParty onSelect={party => fetchCandidates.byParty(party)}/>
                        </div>
                        <div className={style.input}>
                            <FindByName onSubmit={name => fetchCandidates.byName(name)} />
                        </div>
                    </TabPanel>
                </Tabs>
            </div>

            <div>
                <CandidatesContext.Provider value={{ candidates, isLoaded, actions }}>
                    <Candidates />
                </CandidatesContext.Provider>
            </div>

            <div>
                <button className={style.ask} onClick={() => ask()}>후보님의 생각이 궁금합니다.</button>
            </div>
        </div>
    )
}
