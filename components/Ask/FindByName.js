import React from 'react'
import style from './FindByName.styl'


const FindByName = ({onSubmit}) => {
    const [q, setQ] = React.useState('')

    const handleKeyPress = e => {
        if (e.keyCode === 13) {
            if (q.length < 1) {
                alert('검색은 한글자 이상 입력해야 합니다.')
                return
            }
            onSubmit(q)
        }
    }

    return (
        <div className={style.wrapper}>
            <input placeholder="이름으로 검색" value={q} onChange={e => setQ(e.target.value)} onKeyDown={handleKeyPress} />
            <button disabled={q.length < 1} onClick={e => onSubmit && onSubmit(q)}>검색</button>
        </div>
    )
}


export default FindByName
