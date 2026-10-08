import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import { type Product } from "../backend/Products";

export const productsCollection = collection(db, "products");

export async function getProducts(): Promise<Product[]> {
  const snapshot = await getDocs(productsCollection);

  return snapshot.docs.map((document) => document.data() as Product);
}

export async function saveProduct(product: Product): Promise<void> {
  await setDoc(doc(db, "products", String(product.id)), product);
}

export async function deleteProduct(productId: number): Promise<void> {
  await deleteDoc(doc(db, "products", String(productId)));
}
