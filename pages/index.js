import React from 'react'
import {NextSeo} from 'next-seo'
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
            <NextSeo
                title="21대 국회에 요구한다"
                description=""
                openGraph={{
                    type: `website`,
                    url: `https://call21st.works`,
                    site_name: `후보는 강간죄 개정에 동의하십니까?`,
                    description: `당신의 작은 참여가 성평등한 미래를 만듭니다. 지금 후보에게 질문을 보내보세요.`,
                    images: [{
                        url: `https://call21st.works/images/ogp.png`
                    }]
                }}
                twitter={{
                    cardType: 'summary_large_image'
                }}
            />

            <div className={layout.logo}>
                <h3>
                    <a href="https://call21st.works/" alt="call21st 홈페이지 메인 바로가기">
                        #CALL21ST
                        <img src="/images/logo.svg"/>
                    </a>
                    <span>21대 국회의원 후보자에게 묻습니다</span>
                </h3>
            </div>
            <hr style={{margin: '0', background: '#f7f7f7'}} />
            <section className={cx(style.odd, style.lead)}>
                <div className={layout.container}>
                    <h2>나는 오늘 ‘성평등’에 투표합니다.</h2>
                    <h1><span>강간죄 판단 기준을</span> <span>‘동의’ 여부로 바꾸는 데</span> <span>찬성하십니까?</span></h1>

                    <p>텔레그램 성착취방 26만 명 이용,<br/> 성폭력 해도 쉽게 풀려나고 용서받는 강간문화,<br/> 비난·조롱받으며 찬밥신세된 미투 법안들,<br/> 21대 국회는 바꿀 수 있습니까?</p>
                </div>
            </section>

            <section className={style.even}>
                <div className={layout.container}>
                    <Stats />
                    <p>
                        45명의 당선자들께서 앞으로 21대 국회 의정활동시, 강간죄 개정 이슈에 지속적 관심을 가지는지, 관련 법안이 국회 법사위와 본회의 문턱을 넘을 수 있도록 힘써주시는지 지켜볼 것입니다.
                    </p>
                    <p>
                        CALL21ST 캠페인의 모든 구성원은 모든 성폭력 피해자들의 훼손당한 사법적 지위가 하루라도 빨리 회복될 수 있도록 강간죄 개정 운동을 끝까지 지지/응원하며, 필요시 추가적인 후속 활동도 도모하겠습니다.
                    </p>
                    <p>
                        본 사이트는 21대 국회 임기와 같이 4년동안 유지됩니다.
                    </p>
                </div>
            </section>

            <section className={style.odd}>
                <div className={layout.container}>
                    <h3>현재 발의된 법안들</h3>
                    <div className={style.progress}>
                    <table>
                        <thead>
                            <tr>
                                <th>의안번호</th>
                                <th>제안일자</th>
                                <th>법안명</th>
                                <th>발의자</th>
                                <th>단계</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <a href="https://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_D2P0E0S6N0M8V1R1P4L8H5K5C3T3J1">
                                        2100245
                                    </a>
                                </td>
                                <td>
                                    <a href="https://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_D2P0E0S6N0M8V1R1P4L8H5K5C3T3J1">
                                        2020-06-08
                                    </a>
                                </td>
                                <td>
                                    <a href="https://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_D2P0E0S6N0M8V1R1P4L8H5K5C3T3J1">
                                        형법 일부개정법률안
                                    </a>
                                </td>
                                <td>
                                    <a href="https://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_D2P0E0S6N0M8V1R1P4L8H5K5C3T3J1">
                                        백혜련의원 등 14인
                                    </a>
                                </td>
                                <td>
                                    위원회 심사
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <a href="https://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_I2E0F0C8T1D2J1S0A1P3T3M9C7T0R2">
                                        2102898
                                    </a>
                                </td>
                                <td>
                                    <a href="https://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_I2E0F0C8T1D2J1S0A1P3T3M9C7T0R2">
                                        2020-08-12
                                    </a>
                                </td>
                                <td>
                                    <a href="https://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_I2E0F0C8T1D2J1S0A1P3T3M9C7T0R2">
                                        형법 일부개정법률안
                                    </a>
                                </td>
                                <td>
                                    <a href="https://likms.assembly.go.kr/bill/billDetail.do?billId=PRC_I2E0F0C8T1D2J1S0A1P3T3M9C7T0R2">
                                        류호정의원 등 13인
                                    </a>
                                </td>
                                <td>
                                    위원회 심사
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>
                    <Responses />
                </div>
            </section>

            <section className={style.even}>
                <Events />
            </section>

            <section className={style.odd}>
                <div className={layout.container}>
                    <h3>후보에게 질문하기</h3>
                    <Ask />
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
