import getDB from 'stores/_db'
import firestore from '@google-cloud/firestore'


export default {
    all: async () => {
        const query = await getDB()
            .collection('counter')
            .get()

        let stats = {}
        query.forEach(snapshot => {
            stats[snapshot.id] = snapshot.data()['count']
        })

        return stats
    },

    increment: async key => {
        const query = await getDB()
            .doc(`counter/${key}`)
            .update({
                count: firestore.FieldValue.increment(1)
            })
    }
}