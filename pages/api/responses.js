import tokenStore from 'stores/tokens'
import responseStore from 'stores/responses'
import {makeResponse} from 'utils/api'


const listResponses = async (req, res) => {
    const responses = await responseStore.list()

    const agreed = []
    const disagreed = []

    responses.forEach(response => {
        if (response.choice === 'yes') {
            agreed.push(response)
        } else if (response.choice === 'no') {
            disagreed.push(response)
        }
    })

    makeResponse(res, {
        agreed,
        disagreed
    })
}


const createResponse = async (req, res) => {
    const { token, choice } = req.body

    if (!token || !choice) {
        res.status(400).json({
            message: '잘못된 요청입니다.'
        })
    }

    try {
        const candidateId = await tokenStore.inflate(token)
        await responseStore.create(candidateId, choice)

        makeResponse(res, {

        })
    } catch (e) {
        res.status(400).json({
            message: '잘못된 요청입니다.'
        })
    }
}


export default async (req, res) => {
    if (req.method === 'GET') {
        await listResponses(req, res)
    } else if (req.method === 'POST') {
        await createResponse(req, res)
    }
}
