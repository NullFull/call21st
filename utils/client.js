import fetch from 'isomorphic-unfetch'


class Client {
    async get(url) {
        const response = await fetch(url)
        return await response.json()
    }

    async post(url, data) {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        return await response.json()
    }

    async sendRequest(content, to) {
        const { data } = await this.post(`/api/requests`, {
            content, to
        })
        return data
    }
}


export default () => {
    return new Client()
}
