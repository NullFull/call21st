import getDB from 'stores/_db'
import firestore from '@google-cloud/firestore'


export default {
    get: async candidateId => {
        const query = await getDB()
            .doc(`candidates/${candidateId}`)
            .get()

        return query.data()
    }
}