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
                <>
                    <p>
                        <span>1430명의 후보에게 <strong>{stats.requests}번의 질문</strong>과 </span>
                        <span><strong>{stats.responses}명의 응답</strong>이 있었습니다.</span>
                    </p>
                    <p>
                        <span>찬성 의사를 표현한 후보 중 </span>
                        <span><strong>45명이 당선</strong>되었습니다.</span>
                    </p>
                </>
            }
        </div>
    )
}