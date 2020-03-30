import React from 'react'
import fetch from 'isomorphic-unfetch'
import Select from 'react-select'
import style from './FindByRegion.styl'


const useCities = () => {
    const [cities, setCities] = React.useState([])

    React.useEffect(() => {
        const fetchCities = async () => {
            const response = await fetch(`/cities.json`)
            const data = await response.json()
            setCities(data)
        }
        fetchCities()
    }, [])

    return ({
        cities
    })
}


const useRegions = (city) => {
    const [regions, setRegions] = React.useState([])

    React.useEffect(() => {
        const fetchRegions = async () => {
            const response = await fetch(`/cities/${city.value}/regions.json`)
            const data = await response.json()
            setRegions(data)
        }
        if (city) {
            fetchRegions()
        }
    }, [city])

    return {
        regions
    }
}


const FindByRegion = ({onSelect}) => {
    const [city, setCity] = React.useState(null)
    const [region, setRegion] = React.useState(null)
    const { cities } = useCities()
    const { regions } = useRegions(city)

    React.useEffect(() => {
        onSelect && region && onSelect(city, region)
    }, [region])

    if (cities.length < 1) {
        return (
            <div>
                ...
            </div>
        )
    }

    return (
        <div className={style.wrapper}>
            <div>
                <Select
                    placeholder="시, 도"
                    options={cities.map(city => ({value: city.name, label: city.name}))}
                    onChange={selected => {
                        setCity(selected)
                        setRegion(null)
                    }}
                />
            </div>
            <div>
                <Select
                    placeholder="선거구"
                    options={regions.map(region => ({value: region.name, label: region.name}))}
                    value={region}
                    onChange={selected => {
                        setRegion(selected)
                    }}
                />
            </div>
        </div>
    )
}


export default FindByRegion
