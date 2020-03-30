import React from 'react'
import {useForm} from 'react-hook-form'
import style from './FindByName.styl'

const FindByName = () => {
    const { handleSubmit, register, errors } = useForm()

    return (
        <div className={style.wrapper}>
            <input placeholder="이름으로 검색" />
            <button>검색</button>
        </div>
    )
}


export default FindByName
