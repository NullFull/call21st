import React from 'react'
import style from './Responses.styl'


const CongressMember = ({member}) => (
    <div className={style.member}>
        <h3>{member.name}</h3>
        <p>{member.party}</p>
        <p>{member.region}</p>
    </div>
)


export default () => {
    const congressMembers = [{
        id: 1,
        name: `김의원`,
        party: `미솔라시당`,
        region: `서울시 머하구 내가갑`,
    }, {
        id: 2,
        name: `강의원`,
        party: `솔파미래당`,
        region: `서울시 머하구 너가을`,
    }, {
        id: 3,
        name: `창의력`,
        party: `바닥났당`,
        region: `비례대표`,
    }]

    return (
        <ul style={{display: 'flex'}}>
            {congressMembers.map(member => (
                <li key={`member-${member.id}`}>
                    <CongressMember member={member} />
                </li>
            ))}
        </ul>
    )
}