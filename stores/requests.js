import getDB from './_db'


export default {
    create: async (candidateId, content) => {
        if (!content) {
            content = '후보님의 생각이 궁금합니다.'
        }

        const created = await getDB().collection('requests').add({
            candidate: candidateId,
            content: content,
        })

        return created.id
    }
}
