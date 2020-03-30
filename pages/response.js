import React from 'react'
import layout from './layout.styl'


const Response = () => {
    const response = () => {
        alert('답변이 저장되었습니다.\n답변이 홈페이지에 반영되기 까지 15분 가량 시차가 있을 수 있습니다.')
    }

    return (
        <div>
            <div>
                <input type="checkbox" />
                <span>강간죄 구성 요건을 '동의'여부로 바꾸는데 동의하십니까?</span>
            </div>
            <div>
                <input type="checkbox" />
                <span>스토킹을 범죄로 보는 방지법 제정에 동의하십니까?</span>
            </div>
            <div>
                <input type="checkbox" />
                <span>디지털성범죄 가해자 처벌 강화에 동의하십니까?</span>
            </div>
            <div>
                <button onClick={() => response()}>저장</button>
            </div>
        </div>
    )
}


Response.getInitialProps = () => {
    return {

    }
}


export default Response
