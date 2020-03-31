import React from 'react'
import Ticker from 'react-ticker'
import layout from 'pages/layout.styl'
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
        quote: `피해자가 아프다며 밀어내는 행동을 했다고 하였으나 폭행 또는 협박으 로 반항을 억압했다고 인정하기에는 부족하다`,
        event: `강간 무죄, 보습학원장에 의한 10세 아동 성폭력 사건(2심)`
    }, {
        quote: `피고인이 피해자의 항거를 불가능하게 하거나 현저히 곤란하게 한 상태 에서 옷을 벗겼다고 보기는 어렵다 (...) 피해자가 객관적으로는 반항하거나 도망을 갈 수 있는 상황이었는데 주관적으로 더 큰 일이 일어날까봐 무섭게 생각하고 당황스러워 그렇게 못했다`,
        event: `강간 및 강제추행 무죄, 삼촌에 의한 친족 성폭력 사건(2심)`
    }, {
        quote: `성관계 등 사진은 폭행·협박 사실에 대한 직접증거가 될 수 없고, (...) 강간행위와 그 고의를 입증할 증거를 발견할 수 없었다`,
        event: `특수강간 불기소, 전 법무부 장관 김학의 성폭력 사건(검찰)`
    }, {
        quote: `피해 여성의 의사를 무시하고 성관계를 한 것은 인정된다. (...) 다만 피 고인이 상대방의 반항을 현저하게 곤란할 정도로 폭행⋅협박하지 않았다`,
        event: `강간 무죄, 감자탕 성폭력 사건(1심)`
    }, {
        quote: `강간할 의도를 가지고 있었다고 인정하려면 폭행이나 협박을 가한 정황 이 입증돼야 하지만, 이를 인정할 증거가 부족하다`,
        event: `강간미수 무죄, 신림동 스토킹 사건(1심 및 2심)`
    }, {
        quote: `6개월 동안 피해가 지속되었지만 피해자가 적극 저항한 증거가 없다 (...) 피고인이 피해자의 항거를 불가능하게 하거나 현저히 곤란하게 할 정도 의 유형력이 없었다`,
        event: `강간 무죄, 형부에 의한 이주여성 성폭력 사건(1심)`
    }, {
        quote: `상대방의 몸을 누르거나 팔을 잡는 행위는 성관계를 시작하면서 수반되는 일반적인 동작이어서 위와 같은 행위가 있었다는 사정만으로 강간의 수단인 폭행이 인정된다고 단정하기 어렵다`,
        event: `강간치상 무죄, 해군 상관에 의한 성소수자 여군 성폭력 사건(2심)`
    }, {
        quote: `사회통념상 강간 피해를 당한 직후의 여성의 행동으로 이해하기 어렵다. (...) 항거를 불가능하게 할 정도로 폭행, 협박해 간음한 사실이 증명됐다고 보기 어렵다`,
        event: `강간 무죄, 술을 이용한 포장마차 성폭력 사건(1심)`
    }]

    const raws = [{
        title: `폭행이나 협박 또는 사람의 의사에 반하여 해당하는 사람을 강간한 자는 3년 이상의 유기징역에 처한다`,
        status: `계류`,
    }, {
        title: `상대방의 명백한 동의가 없는 상태에서 사람을 간음한 사람은 5년 이상 의 유기징역에 처한다`,
        status: `계류`,
    }, {
        title: `상대방의 의사에 반하여 사람을 간음한 사람은 3년 이상의 유기징역에 처한다`,
        status: `계류`,
    }, {
        title: `동의 없이 사람을 간음한 사람은 3년 이하의 징역 또는 1천만원 이하의 벌금에 처한다`,
        status: `계류`,
    }, {
        title: `폭행이나 협박 또는 상대방의 동의 없이 사람을 강간한 자는 3년 이상의 유기징역에 처한다`,
        status: `계류`,
    }, {
        title: `상대방의 부동의 의사에 반하여 사람을 간음한 자는 3년 이상의 유기징역에 처한다`,
        status: `계류`,
    }, {
        title: `사람의 명백한 거부의사표시에 반하여 강간한 사람은 1년 이상의 유기징역에 처한다`,
        status: `계류`,
    }, {
        title: `동의 없이 사람을 간음한 사람은 3년 이상의 유기징역에 처한다`,
        status: `계류`,
    }]

    return (
        <div className={style.events}>
            {/*<div className={layout.container}>*/}
            {/*    <h3>제20대 국회 법안</h3>*/}
            {/*</div>*/}
            <Ticker speed={4} direction={'toRight'}>
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
            <Ticker speed={2}>
                {(props) => {
                    return (
                        <ul style={{display: 'flex'}}>
                            {events.map((event, i) =>
                                <li key={`event-${i}`} style={{width: '360px', maxWidth: '100%'}}>
                                    <Event event={event} />
                                </li>
                            )}
                        </ul>
                    )
                }}
            </Ticker>
            {/*<Ticker direction={'toRight'} speed={2}>*/}
            {/*    {(props) => {*/}
            {/*        return (*/}
            {/*            <ul style={{display: 'flex'}}>*/}
            {/*                {quotes.map((quote, i) =>*/}
            {/*                    <li key={`raw-${i}`} style={{width: '320px'}}>*/}
            {/*                        <Quote quote={quote} />*/}
            {/*                    </li>*/}
            {/*                )}*/}
            {/*            </ul>*/}
            {/*        )*/}
            {/*    }}*/}
            {/*</Ticker>*/}

        </div>
    )
}
