import React from 'react'
import Select from 'react-select'
import style from './FindByParty.styl'


export default ({onSelect}) => {
    const [parties, setParties] = React.useState([])

    React.useEffect(() => {
        const fetchParties = async () => {
            const response = await fetch('/parties.json')
            const data = await response.json()
            setParties(data)
        }
        fetchParties()
    }, [])

    return (
        <div className={style.wrapper}>
            <Select
                placeholder="정당"
                options={parties.map(party => ({value: party.slug, label: party.name}))}
                onChange={selected => onSelect && onSelect(selected)}
            />
        </div>
    )
}