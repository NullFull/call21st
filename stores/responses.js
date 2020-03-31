import getDB from 'stores/_db'


export default {
    create: async (candidateId, choice) => {
        const {default: candidate} = await import(`public/candidates/${candidateId}.json`)

        await getDB()
            .doc(`responses/${candidateId}`)
            .set({
                choice,
                candidate,
            }, {
                merge: true
            })
    },

    list: async () => {
        const query = await getDB()
            .collection(`responses`)
            .get()

        return query.docs.map(item => ({...item.data(), id: item.id}))
    }
}