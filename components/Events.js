import React from 'react'


const Event = ({event}) => (
    <div>
        <h3>&ldquo;{event.quote}&rdquo;</h3>
        <p>&mdash; {event.event}</p>
    </div>
)


const Raw = ({raw}) => (
    <div>
        <h3>{raw.title}</h3>
        <p>&mdash; {raw.status}</p>
    </div>
)


export default () => {
    const events = [{
        quote: `조씨가 피해자를 강간할 의도를 가지고 있었다고 인정하려면 폭행이나 협박을 가한 정황이 입증돼야 하지만, 이를 인정할 증거가 부족하다.`,
        event: `신림동 스토커 사건 - 강간미수 불인정`
    }, {
        quote: `피고인이 어린 시절 정서적•경제적으로 어려운 시간을 보냈고 성장과정에서도 충분한 보호와 양육을 받지 못하였던 점, (항소심 진행 중) 혼인신고서를 접수하여 부양할 가족이 생긴 점은 유리한 정상`,
        event: `세계 최대 아동 성폭력 비디오 웰컴투 비디오 사건 - 1년 6개월`
    }, {
        quote: `재판부는 “박씨가 피해 여성의 의사를 무시하고 성관계를 한 것은 인정된다”면서도 “다만 피고인이 상대방의 반항을 현저하게 곤란할 정도로 폭행⋅협박하지 않았다”고 판단했다.`,
        event: `고기를 덜어준 호의를 '암묵적 성관계 동의'라고 해석한 감자탕 성폭행 사건 - 강간 무죄`
    }, {
        quote: `운영자 와치맨 구형 3년 6개월`,
    }]

    const raws = [{
        title: `김학의 전 법무부 차관의 뇌물수수·특수강간 사건 및 해당 사건에 대한 법무부·검찰 등의 은폐·왜곡 시도 의혹에 대한 진상규명을 위한 특별검사의 수사요구안`,
        status: `계류`,
    }, {
        title: `의제강간 연령 현생 13세 미만에서 상향`,
        status: `계류`,
    }, {
        title: ` ‘사람의 의사에 반하는 경우’를 성폭력 범죄 요건에 포함시켜 법률 적용의 일관성과 통일성을 유지하는 동시에 가장 중요한 피해자의 의사를 온전히 반영해 성폭력 범죄에 대한 보다 명확한 처벌이 가능할 수 있도록 하고자 함`,
        status: `계류`,
    }]

    return (
        <div>
            <ul>
                {events.map((event, i) =>
                    <li key={`event-${i}`}>
                        <Event event={event} />
                    </li>
                )}
            </ul>
            <ul>
                {raws.map((raw, i) =>
                    <li key={`raw-${i}`}>
                        <Raw raw={raw} />
                    </li>
                )}
            </ul>
        </div>
    )
}
