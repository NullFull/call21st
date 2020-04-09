import React from 'react'
import ScaleLoader from 'react-spinners/ScaleLoader'
import CandidatesContext from 'components/Ask/CandidatesContext'
import client from 'utils/client'
import style from './Candidates.styl'


const IconFacebook = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/></svg>
const IconTwitter = <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-.139 9.237c.209 4.617-3.234 9.765-9.33 9.765-1.854 0-3.579-.543-5.032-1.475 1.742.205 3.48-.278 4.86-1.359-1.437-.027-2.649-.976-3.066-2.28.515.098 1.021.069 1.482-.056-1.579-.317-2.668-1.739-2.633-3.26.442.246.949.394 1.486.411-1.461-.977-1.875-2.907-1.016-4.383 1.619 1.986 4.038 3.293 6.766 3.43-.479-2.053 1.08-4.03 3.199-4.03.943 0 1.797.398 2.395 1.037.748-.147 1.451-.42 2.086-.796-.246.767-.766 1.41-1.443 1.816.664-.08 1.297-.256 1.885-.517-.439.656-.996 1.234-1.639 1.697z"/></svg>


const Candidate = ({candidate}) => {
    const { actions } = React.useContext(CandidatesContext)
    const [info, setInfo] = React.useState({})

    React.useEffect(() => {
        const fetchAgreed = async () => {
            const [{data: info}, {data: response}, {data: stats}] = await Promise.all([
                client().get(`/api/candidates/${candidate.id}`),
                client().get(`/api/candidates/${candidate.id}/response`),
                client().get(`/api/candidates/${candidate.id}/stats`)
            ])

            info.count = stats.requests

            if (response.choice === 'yes') {
                info.agreed = '동의'
            }

            if (info.email) {
                info.status = '정상'
            } else {
                info.status = response.choice === 'yes' ? '' : '이메일오류'
            }

            setInfo(info)
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
            <td className={style.name}>{candidate.name}</td>
            <td>{candidate.party}</td>
            <td className={style.count}>{info.count && `${info.count}회`}</td>
            <td className={style.agreed}>{info.agreed}</td>
            <td className={style.status}>{info.status}</td>
            <td className={style.sns}>
                {info.facebook && <a href={info.facebook} target="_blank">{IconFacebook}</a>}
                {info.twitter && <a href={info.twitter} target="_blank">{IconTwitter}</a>}
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
                    <td className={style.status}>이메일</td>
                    <td className={style.sns}>SNS</td>
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
