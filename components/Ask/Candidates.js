import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import CandidatesContext from 'components/Ask/CandidatesContext'
import client from 'utils/client'
import style from './Candidates.styl'


const Candidate = ({candidate}) => {
    const { actions } = React.useContext(CandidatesContext)

    const [agreed, setAgreed] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [count, setCount] = React.useState('')

    React.useEffect(() => {
        const fetchAgreed = async () => {
            const [{data: info}, {data: response}, {data: stats}] = await Promise.all([
                client().get(`/api/candidates/${candidate.id}`),
                client().get(`/api/candidates/${candidate.id}/response`),
                client().get(`/api/candidates/${candidate.id}/stats`)
            ])

            setCount(stats.requests)

            if (response.choice === 'yes') {
                setAgreed('동의')
            }

            if (info.email) {
                setStatus('정상')
            } else {
                setStatus(response.choice === 'yes' ? '' : '(대기중: 이메일오류)')
            }
        }
        fetchAgreed()
    }, [])

    return (
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
                {count && `${count}회`}
            </td>
            <td className={style.agreed}>
                {agreed}
            </td>
            <td className={style.status}>
                {status}
            </td>
        </tr>
    )
}


const Candidates = () => {
    const STATUSES = CandidatesContext.STATUSES
    const { candidates, status, actions } = React.useContext(CandidatesContext)

    if (status === STATUSES.LOADING) {
        return (
            <div className={style.candidates}>
                <div className={style.message}>
                    <ScaleLoader color="#5A4D46" />
                </div>
            </div>
        )
    }

    if (candidates.length < 1) {
        return status === STATUSES.LOADED ?
            <div className={style.candidates}>
                <p className={style.message}>검색결과가 없습니다.</p>
            </div> :
            <div className={style.candidates}>
                <p className={style.message}>지역구를 선택하거나 이름을 입력해주세요</p>
            </div>
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
                        <Candidate key={`candidate-${candidate.id}`} candidate={candidate} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}


export default Candidates
