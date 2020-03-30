import React from 'react'
import Ticker from 'react-ticker'
import style from './Event.styl'


const Event = ({event}) => (
    <div className={style.event}>
        <h3>{event.quote}</h3>
        <p>&mdash; {event.event}</p>
    </div>
)


const Quote = ({quote}) => (
    <div className={style.event}>
        <h3>&ldquo;{quote.quote}&rdquo;</h3>
        <p>&mdash; {quote.event}</p>
    </div>
)


const Raw = ({raw}) => (
    <div className={style.event}>
        <h3>{raw.title}</h3>
        <p>&mdash; {raw.status}</p>
    </div>
)


export default () => {
    const events = [{
        quote: `귀가 중이던 여성을 뒤쫓아가 집에 침입하려 한 신림동 스토커 사건`,
        event: `강간미수 불인정`
    }, {
        quote: `세계 최대 아동 성폭력 비디오 웰컴투 비디오 사건`,
        event: `징역 1년 6개월`
    }, {
        quote: `고기를 덜어준 호의를 '암묵적 성관계 동의'라고 해석 감자탕 성폭행 사건 `,
        event: `강간 무죄`
    }]

    const quotes = [{
        quote: `강간할 의도를 가지고 있었다고 인정하려면 폭행이나 협박을 가한 정황이 입증돼야 하지만, 이를 인정할 증거가 부족하다.`,
        event: `신림동 스토커 사건`
    }, {
        quote: `박씨가 피해 여성의 의사를 무시하고 성관계를 한 것은 인정된다. ... 다만 피고인이 상대방의 반항을 현저하게 곤란할 정도로 폭행⋅협박하지 않았다`,
        event: `감자탕 성폭행 사건`
    }, {

    }]

    const raws = [{
        title: ``,
        status: `계류`,
    }, {
        title: `의제강간 연령 현생 13세 미만에서 상향`,
        status: `계류`,
    }, {
        title: ` ‘사람의 의사에 반하는 경우’를 성폭력 범죄 요건에 포함`,
        status: `계류`,
    }]

    return (
        <div className={style.events}>
            <Ticker speed={5}>
                {(props) => {
                    return (
                        <ul style={{display: 'flex'}}>
                            {raws.map((raw, i) =>
                                <li key={`raw-${i}`} style={{width: '320px'}}>
                                    <Raw raw={raw} />
                                </li>
                            )}
                        </ul>
                    )
                }}
            </Ticker>
            <Ticker speed={3}>
                {(props) => {
                    return (
                        <ul style={{display: 'flex'}}>
                            {events.map((event, i) =>
                                <li key={`event-${i}`} style={{width: '320px'}}>
                                    <Event event={event} />
                                </li>
                            )}
                        </ul>
                    )
                }}
            </Ticker>
            <Ticker direction={'toRight'} speed={2}>
                {(props) => {
                    return (
                        <ul style={{display: 'flex'}}>
                            {quotes.map((quote, i) =>
                                <li key={`raw-${i}`} style={{width: '320px'}}>
                                    <Quote quote={quote} />
                                </li>
                            )}
                        </ul>
                    )
                }}
            </Ticker>

        </div>
    )
}
