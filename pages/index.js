import React from 'react'
import cx from 'classnames'

import Ask from 'components/Ask'
import Events from 'components/Events'
import Responses from 'components/Responses'

import layout from './layout.styl'
import style from './index.styl'


export default () => {
    return (
        <>
            <section className={cx(style.odd, style.lead)}>
                <div className={layout.container}>
                    <h1><strong>20대 국회는 공범</strong>이었습니다. 21대 국회는 어떻습니까?</h1>
                    <div className={style.questions}>
                        <ul>
                            <li><h2>강간죄 구성 요건을 '동의'여부로 바꾸는데 동의하십니까?</h2></li>
                            <li><h2>스토킹을 범죄로 보는 방지법 제정에 동의하십니까?</h2></li>
                            <li><h2>디지털성범죄 가해자 처벌 강화에 동의하십니까?</h2></li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className={style.even}>
                {/*<div className={layout.container}>*/}
                    <Events />
                {/*</div>*/}
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
                    <h3></h3>
                </div>
            </section>

            <section className={style.odd}>
                <div className={layout.container}>
                    <h3>후보에게 질문하기</h3>
                    <div>
                        <Ask />
                    </div>
                </div>
            </section>

            <section className={style.even}>
                <div className={layout.container}>
                    <h3>Contact</h3>
                    <div>
                        <p style={{textAlign: 'center'}}><a href="mailto:contact@call21st.works">contact@call21st.works</a></p>
                    </div>
                    <div className={style.credit}>
                        <ul>
                            <li>강간죄개정연대</li>
                            <li>널채움</li>
                            <li>섀도우핀즈</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
