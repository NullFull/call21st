import requestStore from 'stores/requests'
import {makeResponse} from 'utils/api'


export default async (req, res) => {
    const { to, content } = req.body

    makeResponse(res, {
        message: '지금은 질문할 수 없습니다'
    })

    // await Promise.all(
    //     to.map(item => requestStore.create(item, content))
    // )
    //
    // makeResponse(res, {
    //
    // })
}
