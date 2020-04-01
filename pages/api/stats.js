import {makeResponse} from 'utils/api'
import statsStore from 'stores/stats'


export default async (req, res) => {
    const stats = await statsStore.all()

    makeResponse(res, stats)
}
