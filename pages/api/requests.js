import requestStore from 'stores/requests'
import {makeResponse} from 'utils/api'


export default async (req, res) => {
    const { to, content } = req.body

    await Promise.all(
        to.map(item => requestStore.create(item, content))
    )

    makeResponse(res, {

    })
}
