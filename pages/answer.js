import React from 'react'
import client from 'utils/client'
import layout from './layout.styl'
import style from './answer.styl'

export default ({url: {query}}) => {
    const [choice, setChoice] = React.useState(null)

    const response = async () => {
        if (!choice) {
            alert('동의 여부를 선택 해주세요')
        }

        await client().post(`/api/responses`, {
            token: query.token,
            choice
        })

        alert('답변이 저장되었습니다.\n답변이 홈페이지에 반영되기 까지 다소 시간이 걸릴 수 있습니다.')
    }

    return (
        <div>
            <div className={layout.logo}>
                <h3>
                    #CALL21ST
                    <img src="../static/images/logo.svg"/>
                    <span>21대 국회의원 후보자에게 묻습니다</span>
                    </h3>
            </div>
            <hr />
            <div className={layout.container}>
                <h3>강간죄 구성 요건을 '동의'여부로 바꾸는데 동의하십니까?</h3>
                <div style={{margin: '6px 0', fontSize: '1.2rem'}}>
                    <label>
                        <input
                            type="radio"
                            value={'yes'}
                            checked={choice === 'yes'}
                            onChange={e => setChoice(e.target.value)}
                        />
                        동의합니다.
                    </label>
                </div>
                <div style={{margin: '6px 0', fontSize: '1.2rem'}}>
                    <label>
                        <input
                            type="radio"
                            value={'no'}
                            checked={choice === 'no'}
                            onChange={e => setChoice(e.target.value)}
                        />
                        동의하지 않습니다.
                    </label>
                </div>

                <div style={{marginTop: '20px'}}>
                    <button className={style.submit} onClick={() => response()}>저장</button>
                </div>
            </div>
            
        </div>
    )
}


