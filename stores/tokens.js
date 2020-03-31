import getDB from 'stores/_db'


export default {
    inflate: async token => {
        const query = await getDB()
            .collection('response-tokens')
            .where('token', '==', token)
            .limit(1)
            .get()

        const { candidate, valid } = query.docs[0].data()

        if (!valid) {
            throw new Error('유효하지 않은 토큰 입니다')
        }

        return candidate
    }
}
