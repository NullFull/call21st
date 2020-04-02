import getDB from 'stores/_db'
import statsStore from 'stores/stats'
import firestore from '@google-cloud/firestore'


export default {
    create: async (candidateId, choice) => {
        const {default: candidate} = await import(`public/candidates/${candidateId}.json`)

        const db = getDB()
        const doc = db
            .doc(`responses/${candidateId}`)

        const exists = (await doc.get()).exists

        await doc.set({
                choice,
                candidate,
                created: firestore.FieldValue.serverTimestamp(),
            }, {
                merge: true
            })

        if (!exists) {
            await statsStore.increment('responses')
        }
    },

    list: async () => {
        const query = await getDB()
            .collection(`responses`)
            .get()

        return query.docs.map(item => ({...item.data(), id: item.id}))
    }
}