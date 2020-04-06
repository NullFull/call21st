import { makeResponse } from 'utils/api'
import candidateStore from 'stores/candidates'


export default async (req, res) => {
    const {query: {cid}} = req

    const candidate = await candidateStore.get(cid)

    makeResponse(res, candidate)
}
