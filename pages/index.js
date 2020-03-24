import React from 'react'

import Ask from 'components/Ask'
import Events from 'components/Events'
import Responses from 'components/Responses'

import layout from './layout.styl'
import style from './index.styl'


export default () => {
    return (
        <>
            <section className={style.odd}>
                <div className={layout.container}>
                    <h1><strong>20대 국회는 공범</strong>이었습니다.. 21대 국회는 어떻습니까?</h1>
                    <ul>
                        <li>강간죄 구성 요건을 '동의'여부로 바꾸는데 동의하십니까?</li>
                        <li>스토킹을 범죄로 보는 방지법 제정에 동의하십니까?</li>
                        <li>디지털성범죄를 ...동의하십니까?</li>
                    </ul>
                </div>
            </section>

            <section className={style.even}>
                <div className={layout.container}>
                    <Events />
                </div>
            </section>

            <section className={style.odd}>
                <div className={layout.container}>
                    <h3>&ldquo;동의합니다&rdquo;</h3>
                    <div>
                        <Responses />
                    </div>
                </div>
            </section>

            <section className={style.even}>
                <div className={layout.container}>
                    <h3>여기에 뭐라도 있으면 좋겠는데.. 비동의?</h3>
                </div>
            </section>

            <section className={style.odd}>
                <div className={layout.container}>
                    <h3>내 지역구 의원에게 문의하기</h3>
                    <div>
                        <Ask />
                    </div>
                </div>
            </section>

            <section className={style.even}>
                <div className={layout.container}>
                    <h3>Contact</h3>
                    <p><a href="mailto:contact@call21st.works">contact@call21st.works</a></p>
                </div>
            </section>
        </>
    )
}
