

class Client {
    async get(url) {
        return await fetch(url)
    }

    async post(url, data) {
        return await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    async sendRequest(content, to) {
        const response = await this.post(`/api/requests`, {
            content, to
        })
        const payload = await response.json()
        return payload.data
    }
}


export default () => {
    return new Client()
}