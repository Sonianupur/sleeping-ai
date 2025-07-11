import { db } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export const saveStory = async (uid: string, title: string, summary: string, audioURL: string) => {
  return await addDoc(collection(db, 'stories'), {
    uid,
    title,
    summary,
    audioURL,
    timestamp: new Date().toISOString(),
  });
};
