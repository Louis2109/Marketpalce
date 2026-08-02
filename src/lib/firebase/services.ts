import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  serverTimestamp,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './config';
import { UserProfile, Store, Product, Category, SubscriptionPlan, Subscription, UserRole, OperatingCity } from '../../types';
import { INITIAL_CATEGORIES, SUBSCRIPTION_PLANS } from '../../config/site';

// MOCK DATA FALLBACKS (Used if Firestore data is empty or during offline/demo mode)
export const DEMO_STORES: Store[] = [
  {
    id: 'store-demo-1',
    ownerId: 'merchant-demo-uid',
    name: 'Boutique Elegance Yaoundé',
    slug: 'elegance-yaounde',
    description: 'Boutique spécialisée dans la mode camerounaise moderne et tissus pagne haut de gamme.',
    logoUrl: 'https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?w=200&auto=format&fit=crop&q=80',
    whatsappNumber: '237699001122',
    city: 'Yaoundé',
    address: 'Bastos, face Ambassade',
    isVerified: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'store-demo-2',
    ownerId: 'merchant-demo-uid-2',
    name: 'Tech & Mobiles Douala',
    slug: 'tech-mobiles-douala',
    description: 'Vente de smartphones, accessoires et gadgets high-tech d’origine garantis.',
    logoUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&auto=format&fit=crop&q=80',
    whatsappNumber: '237677889900',
    city: 'Douala',
    address: 'Akwa, Boulevard de la Liberté',
    isVerified: true,
    status: 'active',
    createdAt: new Date().toISOString(),
  },
];

export const DEMO_PRODUCTS: Product[] = [
  {
    id: 'prod-demo-1',
    storeId: 'store-demo-1',
    ownerId: 'merchant-demo-uid',
    name: 'Robe en Pagne Afritude Moderne',
    description: 'Robe sur-mesure confectionnée en tissu pagne véritable avec finitions soignées.',
    price: 25000,
    currency: 'XAF',
    categoryId: 'cat-mode',
    images: ['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80'],
    isPublished: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-demo-2',
    storeId: 'store-demo-1',
    ownerId: 'merchant-demo-uid',
    name: 'Sac à Main Artisanal Cuir & Pagne',
    description: 'Sac fait main en cuir véritable et motifs imprimés traditionnels.',
    price: 18000,
    currency: 'XAF',
    categoryId: 'cat-mode',
    images: ['https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80'],
    isPublished: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'prod-demo-3',
    storeId: 'store-demo-2',
    ownerId: 'merchant-demo-uid-2',
    name: 'Smartphone Galaxy S23 Ultra (Neuf)',
    description: 'Smartphone haut de gamme 256Go, disponible immédiatement à Akwa Douala.',
    price: 550000,
    currency: 'XAF',
    categoryId: 'cat-high-tech',
    images: ['https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&auto=format&fit=crop&q=80'],
    isPublished: true,
    createdAt: new Date().toISOString(),
  },
];

/* ==========================================================================
   USER PROFILE SERVICES
   ========================================================================== */

export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(db, 'users', uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data() as UserProfile;
    }
    return null;
  } catch (err) {
    console.warn('Could not fetch user profile from Firestore, using fallback:', err);
    return null;
  }
}

export async function createUserProfile(profile: UserProfile): Promise<void> {
  const path = `users/${profile.uid}`;
  try {
    const userRef = doc(db, 'users', profile.uid);
    await setDoc(userRef, {
      ...profile,
      createdAt: profile.createdAt || new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function updateUserProfile(uid: string, data: Partial<UserProfile>): Promise<void> {
  const path = `users/${uid}`;
  try {
    const userRef = doc(db, 'users', uid);
    await updateDoc(userRef, {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

/* ==========================================================================
   STORE SERVICES
   ========================================================================== */

export async function getStoresByOwner(ownerId: string): Promise<Store[]> {
  try {
    const q = query(collection(db, 'stores'), where('ownerId', '==', ownerId));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => d.data() as Store);
    }
    // Fallback demo matching
    return DEMO_STORES.filter((s) => s.ownerId === ownerId);
  } catch (err) {
    console.warn('Firestore store query error, returning fallback:', err);
    return DEMO_STORES.filter((s) => s.ownerId === ownerId);
  }
}

export async function getAllStores(): Promise<Store[]> {
  try {
    const snap = await getDocs(collection(db, 'stores'));
    if (!snap.empty) {
      return snap.docs.map((d) => d.data() as Store);
    }
    return DEMO_STORES;
  } catch (err) {
    console.warn('Error fetching all stores, returning fallback demo:', err);
    return DEMO_STORES;
  }
}

export async function createStore(store: Omit<Store, 'id' | 'createdAt'>): Promise<Store> {
  const newId = `store-${Date.now()}`;
  const path = `stores/${newId}`;
  const newStore: Store = {
    ...store,
    id: newId,
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'stores', newId), newStore);
    return newStore;
  } catch (err) {
    console.warn('Firestore store creation failed, returning local state:', err);
    return newStore;
  }
}

export async function updateStore(storeId: string, data: Partial<Store>): Promise<void> {
  const path = `stores/${storeId}`;
  try {
    await updateDoc(doc(db, 'stores', storeId), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Firestore update store failed:', err);
  }
}

/* ==========================================================================
   PRODUCT SERVICES
   ========================================================================== */

export async function getProductsByStore(storeId: string): Promise<Product[]> {
  try {
    const q = query(collection(db, 'products'), where('storeId', '==', storeId));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs.map((d) => d.data() as Product);
    }
    return DEMO_PRODUCTS.filter((p) => p.storeId === storeId);
  } catch (err) {
    console.warn('Error fetching products by store:', err);
    return DEMO_PRODUCTS.filter((p) => p.storeId === storeId);
  }
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const snap = await getDocs(collection(db, 'products'));
    if (!snap.empty) {
      return snap.docs.map((d) => d.data() as Product);
    }
    return DEMO_PRODUCTS;
  } catch (err) {
    return DEMO_PRODUCTS;
  }
}

export async function createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const newId = `prod-${Date.now()}`;
  const newProduct: Product = {
    ...product,
    id: newId,
    createdAt: new Date().toISOString(),
  };

  try {
    await setDoc(doc(db, 'products', newId), newProduct);
    return newProduct;
  } catch (err) {
    console.warn('Firestore product creation failed, returning optimistic product:', err);
    return newProduct;
  }
}

export async function updateProduct(productId: string, data: Partial<Product>): Promise<void> {
  try {
    await updateDoc(doc(db, 'products', productId), {
      ...data,
      updatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Firestore update product failed:', err);
  }
}

export async function deleteProduct(productId: string): Promise<void> {
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (err) {
    console.warn('Firestore delete product failed:', err);
  }
}

/* ==========================================================================
   CATEGORIES & PLANS
   ========================================================================== */

export async function getCategories(): Promise<Category[]> {
  return INITIAL_CATEGORIES;
}

export async function getSubscriptionPlans(): Promise<SubscriptionPlan[]> {
  return SUBSCRIPTION_PLANS;
}
