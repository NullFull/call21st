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


const STATUSES = CandidatesContext.STATUSES

const initial = {
    candidates: [],
    status: STATUSES.WAITING
}


const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH':
            return {
                ...state,
                status: STATUSES.LOADING
            }
        case 'SET':
            return {
                ...state,
                candidates: action.payload.map(candidate => {
                    candidate.checked = false
                    return candidate
                }),
                status: STATUSES.LOADED
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
        FETCH: () => dispatch({type: 'FETCH'}),
        SET: data => dispatch({type: 'SET', payload: data}),
        TOGGLE_ALL: setTo => dispatch({type: 'TOGGLE_ALL', payload: setTo}),
        TOGGLE_ITEM: item => dispatch({type: 'TOGGLE_ITEM', payload: item})
    }

    const fetchCandidates = {  // TODO : overload
        byRegion: async (city, region) => {
            actions.FETCH()
            const response = await fetch(`/cities/${city.value}/regions/${region.value}/candidates.json`)
            const data = await response.json()
            actions.SET(data)
        },
        byName: async name => {
            actions.FETCH()
            const { data } = await client().post(`/api/candidates/_search`, {
                q: name
            })
            actions.SET(data)
        },
        byParty: async party => {
            actions.FETCH()
            const response = await fetch(`/parties/${party.value}/candidates.json`)
            const data = await response.json()
            actions.SET(data)
        }
    }

    return {
        candidates: state.candidates,
        status: state.status,
        fetchCandidates,
        actions
    }
}


export default () => {
    const { candidates, status, fetchCandidates, actions } = useCandidates()

    const ask = async () => {
        if (candidates.length < 1) {
            alert('먼저 문의를 보낼 후보를 선택해주세요')
            return
        }

        const content = '후보님의 생각이 궁금합니다.'
        await client().sendRequest(content, candidates.filter(c => c.checked).map(c => c.id))

        alert('질문이 등록 되었습니다.\n연락처가 존재하는 후보에게는 질문이 메일로 전달됩니다.')
    }

    return (
        <div>
            <ul className={style.notice}>
                <li>
                    <h4>
                        공지 : 선거가 종료되어 더 이상 질문 메일 전송을 지원하지 않습니다.
                    </h4>
                </li>
            </ul>

            {/*<StepsProvider>*/}
            {/*    <StepsIndicator>*/}
            {/*        <StepsIndicator.Item title="후보 선택" />*/}
            {/*        <StepsIndicator.Item title="메세지 작성" />*/}
            {/*        <StepsIndicator.Item title="전송" />*/}
            {/*    </StepsIndicator>*/}

            {/*    <Steps>*/}
            {/*        <Steps.Step>*/}
            {/*        {({next}) => (*/}
            {/*            <div>*/}
            {/*                선택*/}
            {/*                <button onClick={() => next()}>다음</button>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*        </Steps.Step>*/}
            {/*        <Steps.Step>*/}
            {/*        {({next, prev}) => (*/}
            {/*            <div>*/}
            {/*                메세지*/}
            {/*                <button onClick={() => prev()}>이전</button>*/}
            {/*                <button onClick={() => next()}>다음</button>*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*        </Steps.Step>*/}
            {/*        <Steps.Step>*/}
            {/*        {() => (*/}
            {/*            <div>*/}
            {/*               완료*/}
            {/*            </div>*/}
            {/*        )}*/}
            {/*        </Steps.Step>*/}
            {/*    </Steps>*/}
            {/*</StepsProvider>*/}

            {/*<div>*/}
            {/*    <Tabs>*/}
            {/*        <TabList>*/}
            {/*            <Tab>지역구 후보 검색</Tab>*/}
            {/*            <Tab>비례대표 후보 검색</Tab>*/}
            {/*        </TabList>*/}

            {/*        <TabPanel>*/}
            {/*            <div className={style.input}>*/}
            {/*                <FindByRegion onSelect={(city, region) => fetchCandidates.byRegion(city, region)} />*/}
            {/*            </div>*/}
            {/*            <div className={style.input}>*/}
            {/*                <FindByName onSubmit={name => fetchCandidates.byName(name)} />*/}
            {/*            </div>*/}
            {/*        </TabPanel>*/}
            {/*        <TabPanel>*/}
            {/*            <div className={style.input}>*/}
            {/*                <FindByParty onSelect={party => fetchCandidates.byParty(party)} />*/}
            {/*            </div>*/}
            {/*            <div className={style.input}>*/}
            {/*                <FindByName onSubmit={name => fetchCandidates.byName(name)} />*/}
            {/*            </div>*/}
            {/*        </TabPanel>*/}
            {/*    </Tabs>*/}
            {/*</div>*/}

            {/*<div>*/}
            {/*    <CandidatesContext.Provider value={{ candidates, status, actions }}>*/}
            {/*        <Candidates />*/}
            {/*    </CandidatesContext.Provider>*/}
            {/*</div>*/}

            <div>
                <button className={style.ask} disabled={true}>지금은 질문을 보낼 수 없습니다.</button>
            </div>
        </div>
    )
}
