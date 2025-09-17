import { orderBy, startAfter, getFirestore, doc, getDoc, collection, query, limit, getDocs, where,  } from 'firebase/firestore';
import app from "./firebase"
const db = getFirestore(app);

//* Firestore functions
const getDocument = async(collectionName, docId) => {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);
    
        if (docSnap.exists()) {
          return docSnap.data();
        } else {
          console.log('No such document!');
          return null;
        }
      } catch (error) {
        console.error('Error getting document:', error);
        throw error;
      }
}

const getMultipleDocuments = async (collectionName, numDocs) => {
  try {
      const q = query(collection(db, collectionName), limit(numDocs));
      const querySnapshot = await getDocs(q);
      const documents = [];
      querySnapshot.forEach((doc) => {
          documents.push({ id: doc.id, ...doc.data() });
      });
      return documents;
  } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
  }
}

const loadProductsWithPagination = async (collectionName, numDocs, lastVisibleDoc = null, sortOrder = 'title', filterTag = '') => {
  try {
    let q;
    if (lastVisibleDoc) {
      q = query(
        collection(db, collectionName),
        orderBy(sortOrder),
        startAfter(lastVisibleDoc),
        limit(numDocs),
        ...(filterTag ? [where('tags', 'array-contains', filterTag)] : [])
      );
    } else {
      q = query(
        collection(db, collectionName),
        orderBy(sortOrder),
        limit(numDocs),
        ...(filterTag ? [where('tags', 'array-contains', filterTag)] : [])
      );
    }

    const querySnapshot = await getDocs(q);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      doc, // include the document snapshot
    }));

    return documents;
  } catch (error) {
    console.error("Error loading documents: ", error);
    return [];
  }
};

export { getDocument, getMultipleDocuments, loadProductsWithPagination, db }