import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, orderBy } from 'firebase/firestore';

export interface Plan {
  id: string;
  name: string;
  price: number;
  pricePeriod: string;
  description: string;
  isMostPopular: boolean;
  features: string[];
  order: number;
}

export interface Offer {
    id: string;
    code: string;
    title: string;
    description: string;
}

// Fetches all pricing plans, sorted by the 'order' field
export async function getPricingPlans(): Promise<Plan[]> {
  try {
    const plansCollection = collection(db, 'plans');
    const q = query(plansCollection, orderBy('order'));
    const plansSnapshot = await getDocs(q);
    return plansSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Plan));
  } catch (error) {
    console.error("Error fetching pricing plans: ", error);
    return [];
  }
}

// Fetches a single plan by its ID (slug)
export async function getPlanById(id: string): Promise<Plan | null> {
  try {
    const planDocRef = doc(db, 'plans', id);
    const planDoc = await getDoc(planDocRef);
    if (planDoc.exists()) {
      return { id: planDoc.id, ...planDoc.data() } as Plan;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching plan ${id}: `, error);
    return null;
  }
}

// Fetches all active offers
export async function getOffers(): Promise<Offer[]> {
    try {
        const offersCollection = collection(db, 'offers');
        const offersSnapshot = await getDocs(offersCollection);
        return offersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Offer));
    } catch (error) {
        console.error("Error fetching offers: ", error);
        return [];
    }
}