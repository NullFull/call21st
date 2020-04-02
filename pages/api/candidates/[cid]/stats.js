import {makeResponse} from 'utils/api'
import statsStore from 'stores/stats'


export default async (req, res) => {
    const {query: {cid}} = req

    const stats = await statsStore.candidates(cid)
    
    makeResponse(res, stats)
}
