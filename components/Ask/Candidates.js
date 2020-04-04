import React from 'react'
import CandidatesContext from 'components/Ask/CandidatesContext'
import client from 'utils/client'
import style from './Candidates.styl'


const SentResult = ({candidate}) => {
    const [agreed, setAgreed] = React.useState('')
    const [status, setStatus] = React.useState('')

    React.useEffect(() => {
        const fetchAgreed = async () => {
            const response = await client().get(`/api/candidates/${candidate.id}/response`)
            const { data } = await response.json()

            if (data.choice === 'yes') {
                setAgreed('동의')
            }

            if (agreed !== '동의' && !candidate.hasEmail) {
                setStatus('(대기중: 이메일오류)')
            } else {
                setStatus('정상')
            }
        }
        fetchAgreed()
    }, [])

    return (
        <>
            <td className={style.agreed}>
                {agreed}
            </td>
            <td className={style.status}>
                {status}
            </td>
        </>
    )
}


const NumberOfRequests = ({candidateId}) => {
    const [n, setNumber] = React.useState('')

    React.useEffect(() => {
        const fetchRequests = async () => {
            const response = await client().get(`/api/candidates/${candidateId}/stats`)
            const { data } = await response.json()
            setNumber(data.requests)
        }
        fetchRequests()
    }, [])

    return (
        <>{n}{n && '회'}</>
    )
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
                    <td/>
                    <td/>
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


export default Candidates
