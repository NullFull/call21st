import React from 'react'
import client from 'utils/client'
import style from './Stats.styl'

const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

const useStats = () => {
    const [stats, setStats] = React.useState(null)

    React.useEffect(() => {
        const fetchStats = async () => {
            const { data } = await client().get('/api/stats')
            
            setStats(data)
        }
        fetchStats()
    }, [])

    return stats
}


export default () => {
    const stats = useStats()
    
    if(stats !== null) {
        stats.requests = numberWithCommas(stats.requests)
    }

    return (
        <div className={style.stats}>
            {stats &&
                <p>지금까지 <strong>{stats.requests}번의 질문</strong>과 <strong>{stats.responses}명의 응답</strong>이 있었습니다.</p>
            }
        </div>
    )
}