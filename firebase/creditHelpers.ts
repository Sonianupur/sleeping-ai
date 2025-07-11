import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

export const deductCredit = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const credits = userSnap.data().credits || 0;
    if (credits > 0) {
      await updateDoc(userRef, { credits: credits - 1 });
    }
  }
};

export const addCredit = async (uid: string, amount: number) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);
  const credits = userSnap.data().credits || 0;

  await updateDoc(userRef, { credits: credits + amount });
};
