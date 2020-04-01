import React from 'react'
import client from 'utils/client'
import style from './Stats.styl'


const useStats = () => {
    const [loaded, setLoaded] = React.useState(false)
    const [stats, setStats] = React.useState({})

    React.useEffect(() => {
        const fetchStats = async () => {
            const response = await client().get('/api/stats')
            const payload = await response.json()

            setStats(payload.data)
            setLoaded(true)
        }
        fetchStats()
    }, [])

    return {
        loaded,
        stats
    }
}


export default () => {
    const {loaded, stats} = useStats()

    return (
        <div className={style.stats}>
            {loaded &&
                <p>지금까지 {stats.targets}명의 후보에게 <strong>{stats.requests}번의 질문</strong>과 <strong>{stats.responses}번의 응답</strong>이 있었습니다.</p>
            }
        </div>
    )
}