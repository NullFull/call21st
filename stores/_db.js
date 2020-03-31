import admin from 'firebase-admin'
import serviceAccount from 'keys/call21st-works-4fc84944bff6.json'


const getDB = () => {
    if (!admin.apps.length) {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        })
    }

    return admin.firestore()
}


export default getDB
