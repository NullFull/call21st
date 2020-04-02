import responseStore from 'stores/responses'
import {makeResponse} from 'utils/api'


export default async (req, res) => {
    const {
        query: {cid},
    } = req

    const choice = await responseStore.get(cid)

    makeResponse(res, {
        choice,
    })
}
