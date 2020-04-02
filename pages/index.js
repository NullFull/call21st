import React from 'react'
import Head from 'next/head'
import cx from 'classnames'

import Ask from 'components/Ask'
import Stats from 'components/Stats'
import Events from 'components/Events'
import Responses from 'components/Responses'

import layout from './layout.styl'
import style from './index.styl'


export default () => {
    return (
        <>
            <Head>
                <title>21대 국회에 요구한다</title>
            </Head>

            <div style={{textAlign: 'right'}}>
                <h3>
                    #CALL21ST
                    <img src="/static/images/logo.svg" href="#" />
                    <span>21대 국회의원 후보자에게 묻습니다</span>
                    </h3>
            </div>
            <hr />
            <section className={cx(style.odd, style.lead)}>
                <div className={layout.container}>
                    <h2>나는 오늘 ‘성평등’에 투표합니다.</h2>
                    <h1><span>강간죄 판단 기준을</span> <span>‘동의’ 여부로 바꾸는 데</span> <span>찬성하십니까?</span></h1>

                    <p>텔레그램 성착취방 26만 명 이용,<br/> 성폭력 해도 쉽게 풀려나고 용서받는 강간문화,<br/> 비난·조롱받으며 찬밥신세된 미투 법안들,<br/> 21대 국회는 바꿀 수 있습니까?</p>

                    <p>당신의 작은 참여가 성평등한 미래를 만듭니다. 지금 후보에게 질문을 보내보세요.</p>

                    {/*<div>*/}
                    {/*    <button>후보에게 질문하기</button>*/}
                    {/*    |*/}
                    {/*    <button>답변보기</button>*/}
                    {/*</div>*/}

                    {/*<p>*/}
                    {/*    가해자대신 변명해주는 법 아닌 가해자를 제대로 처벌하는 법<br/>*/}
                    {/*    피해자다움 판단하려는 법 아닌 피해자의 인권을 보장하는 법<br/>*/}
                    {/*    성폭력 판단기준을 ‘폭행 ̇협박’ 아닌 ‘동의’ 여부로 바꾸는 강간죄 개정,*/}
                    {/*</p>*/}
                    {/*<p>성평등 사회를 만들 제21대 국회의원은 누구입니까?</p>*/}


                    {/*<h1><strong>20대 국회는 공범</strong>이었습니다. 21대 국회는 어떻습니까?</h1>*/}
                    {/*<div className={style.questions}>*/}
                    {/*    <ul>*/}
                    {/*        <li><h2>강간죄 구성 요건을 '동의'여부로 바꾸는데 동의하십니까?</h2></li>*/}
                    {/*        <li><h2>스토킹을 범죄로 보는 방지법 제정에 동의하십니까?</h2></li>*/}
                    {/*        <li><h2>디지털성범죄 가해자 처벌 강화에 동의하십니까?</h2></li>*/}
                    {/*    </ul>*/}
                    {/*</div>*/}
                </div>
            </section>

            <section className={style.even}>
                {/*<div className={layout.container}>*/}
                    <Events />
                {/*</div>*/}
            </section>

            <section className={style.odd}>
                <div className={layout.container}>
                    <Responses />
                </div>
            </section>

            <section className={style.even}>
                <div className={layout.container}>
                    <Stats />
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
                            <li>‘강간죄’개정을위한연대회의</li>
                            <li>셰도우핀즈</li>
                            <li>널채움</li>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}
