

const makeResponse = (res, obj) => {
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({
        data: obj
    }))
}


export {
    makeResponse
}
