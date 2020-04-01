import getDB from 'stores/_db'

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
    }
}