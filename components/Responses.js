import React from 'react'
import cx from 'classnames'
import style from './Responses.styl'


const CongressMember = ({member}) => (
    <div className={style.member}>
        <h3 className={style.name}>{member.name}</h3>
        <p className={style.party}>{member.party}</p>
        <p className={style.region}>{member.region}</p>
        <div className={style.responses}>
            <ul>
                <li><span className={member.response[1] ? style.true : style.false} /></li>
                <li><span className={member.response[2] ? style.true : style.false} /></li>
                <li><span className={member.response[3] ? style.true : style.false} /></li>
            </ul>
        </div>
    </div>
)


export default () => {
    const congressMembers = [{
        id: 1,
        name: `김의원`,
        party: `미솔라시당`,
        region: `서울시 머하구 내가갑`,
        response: {
            1: true,
            2: true,
            3: true
        }
    }, {
        id: 2,
        name: `강의원`,
        party: `솔파미래당`,
        region: `서울시 머하구 너가을`,
        response: {
            1: true,
            2: true,
            3: true
        }
    }, {
        id: 3,
        name: `창의력`,
        party: `바닥났당`,
        region: `비례대표`,
        response: {
            1: true,
            2: true,
            3: true
        }
    }, {
        id: 4,
        name: `김의원`,
        party: `미솔라시당`,
        region: `서울시 머하구 내가갑`,
        response: {
            1: true,
            2: true,
            3: true
        }
    }, {
        id: 5,
        name: `강의원`,
        party: `솔파미래당`,
        region: `서울시 머하구 너가을`,
        response: {
            1: true,
            2: true,
            3: false
        }
    }, {
        id: 6,
        name: `창의력`,
        party: `바닥났당`,
        region: `비례대표`,
        response: {
            1: true,
            2: true,
            3: false
        }
    }, {
        id: 7,
        name: `김의원`,
        party: `미솔라시당`,
        region: `서울시 머하구 내가갑`,
        response: {
            1: true,
            2: false,
            3: false
        }
    }, {
        id: 8,
        name: `강의원`,
        party: `솔파미래당`,
        region: `서울시 머하구 너가을`,
        response: {
            1: true,
            2: false,
            3: false
        }
    }, {
        id: 9,
        name: `창의력`,
        party: `바닥났당`,
        region: `비례대표`,
        response: {
            1: true,
            2: false,
            3: false
        }
    }]

    return (
        <ul style={{display: 'flex', flexWrap: 'wrap'}}>
            {congressMembers.map(member => (
                <li key={`member-${member.id}`} style={{padding: '5px 0'}}>
                    <CongressMember member={member} />
                </li>
            ))}
        </ul>
    )
}