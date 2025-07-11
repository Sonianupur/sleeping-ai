import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

// Deduct 1 credit if available
export const deductCredit = async (uid: string) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    console.warn('User does not exist in Firestore');
    return;
  }

  const credits = userSnap.data().credits || 0;

  if (credits > 0) {
    await updateDoc(userRef, { credits: credits - 1 });
    console.log(`Deducted 1 credit. New balance: ${credits - 1}`);
  } else {
    console.warn('Not enough credits to deduct');
  }
};

// Add credits (e.g. after purchase or sharing)
export const addCredit = async (uid: string, amount: number) => {
  const userRef = doc(db, 'users', uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    // Create user record if missing
    await setDoc(userRef, {
      credits: amount,
      createdAt: new Date().toISOString(),
    });
    console.log(`User record created with ${amount} credits.`);
    return;
  }

  const currentCredits = userSnap.data().credits || 0;
  await updateDoc(userRef, { credits: currentCredits + amount });
  console.log(`Added ${amount} credits. New balance: ${currentCredits + amount}`);
};
