import React from 'react'
import style from './Stats.styl'


export default () => {
    return (
        <div className={style.stats}>
            <p>지금까지 123명의 후보에게 <strong>234번의 질문</strong>과 <strong>12번의 응답</strong>이 있었습니다.</p>
        </div>
    )
}