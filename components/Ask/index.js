import React from 'react'
import fetch from 'isomorphic-unfetch'
import FindByName from 'components/Ask/FindByName'
import FindByRegion from 'components/Ask/FindByRegion'
import CandidatesContext from 'components/Ask/CandidatesContext'
import client from 'utils/client'
import style from './index.styl'


const SentResult = ({candidate}) => {
    const [agreed, setAgreed] = React.useState('')
    const [hasEmail, setHasEmail] = React.useState('')

    React.useEffect(() => {
        const fetchAgreed = async () => {
            const response = await fetch(`/api/candidates/${candidate.id}/response`)
            const { data } = await response.json()

            if (data.choice === 'yes') {
                setAgreed('동의')
            }
        }
        fetchAgreed()
    }, [])

    React.useEffect(() => {
        const fetchEmail = async () => {
            const { hasEmail } = await import(`public/candidates/${candidate.id}.json`)
            if (hasEmail || agreed === '동의') {
                setHasEmail(true)
            }
        }
        fetchEmail()
    }, [agreed])



    return (
        <>
            <td className={style.agreed}>
                <>{agreed}</>
            </td>
            <td className={style.contact}>
                {hasEmail ? '' : '(대기중. 이메일오류)'}
            </td>
        </>
    )
}

const NumberOfRequests = ({candidateId}) => {
    const [n, setNumber] = React.useState('')

    React.useEffect(() => {
        const fetchRequests = async () => {
            const response = await fetch(`/api/candidates/${candidateId}/stats`)
            const { data } = await response.json()
            setNumber(data.requests)
        }
        fetchRequests()
    }, [])

    return (
        <>{n}{n && '회'}</>
    )
}


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
            const response = await client().post(`/api/candidates/_search`, {
                q: name
            })
            const payload = await response.json()
            actions.SET(payload.data)
        }
    }

    return {
        candidates: state.candidates,
        isLoaded: state.isLoaded,
        fetchCandidates,
        actions
    }
}


const Candidates = () => {
    const { candidates, isLoaded, actions } = React.useContext(CandidatesContext)

    if (candidates.length < 1) {
        if (isLoaded) {
            return (
                <div className={style.candidates}>
                    <p className={style.message}>검색결과가 없습니다.</p>
                </div>
            )
        }
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
                        <td className={style.checkbox}>
                            <div className={style.all}>전체선택</div>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={candidates.every(candidate => candidate.checked)}
                                    onChange={e => actions.TOGGLE_ALL(e.target.checked)}
                                />
                            </div>
                        </td>
                        <td></td>
                        <td></td>
                        <td className={style.count}>질문</td>
                        <td className={style.agreed}>응답</td>
                        <td className={style.status}>전송상황</td>
                    </tr>
                </thead>
                <tbody>
                {candidates.map(candidate => (
                    <tr key={candidate.id}>
                        <td className={style.checkbox}>
                            <input
                                type="checkbox"
                                checked={candidate.checked}
                                onChange={() => actions.TOGGLE_ITEM(candidate)}
                            />
                        </td>
                        <td className={style.name}>
                            {candidate.name}
                        </td>
                        <td>
                            {candidate.party}
                        </td>
                        <td className={style.count}>
                            <NumberOfRequests candidateId={candidate.id} />
                        </td>
                        <SentResult candidate={candidate} />
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
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

        alert('문의가 예약 되었습니다.')
    }

    return (
        <div>
            <ul className={style.notice}>
                <li>
                    <h4>
                        공지 : 현재 사용하는 메일 서비스의 전송 한도에 도달하여 질문 전달에 시간이 걸리고 있습니다.
                    </h4>
                </li>
                <li>
                    <h4>
                        공지 : 현재 후보의 공개된 이메일 정보가 오래되어 전송이 실패하는 경우가 많이 발생하고 있습니다.
                        검색결과에 이를 표시해두고 있으니 연락처를 아시는 분은 아래 연락처로 제보를 부탁드립니다.
                    </h4>
                </li>
            </ul>

            <div>
                <div style={{ padding: '2px 0 2px 0' }}>
                    <FindByRegion onSelect={(city, region) => fetchCandidates.byRegion(city, region)} />
                </div>
                <div style={{ padding: '2px 0 2px 0' }}>
                    <FindByName onSubmit={name => fetchCandidates.byName(name)} />
                </div>
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
