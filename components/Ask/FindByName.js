import React from 'react'
import style from './FindByName.styl'


const FindByName = ({onSubmit}) => {
    const [q, setQ] = React.useState('')

    return (
        <div className={style.wrapper}>
            <input placeholder="이름으로 검색" value={q} onChange={e => setQ(e.target.value)}/>
            <button disabled={q.length < 1} onClick={e => onSubmit && onSubmit(q)}>검색</button>
        </div>
    )
}


export default FindByName
