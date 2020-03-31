import {makeResponse} from 'utils/api'
import search from 'utils/search'


export default (req, res) => {
    const { q } = req.body

    if (q.length < 1) {
        res.status(400).json({
            message: `검색은 한글자 이상 입력해야 합니다.`
        })
    }

    const results = search(q)

    makeResponse(res, results)
}
