import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../firebase";

import { type OrderItem } from "../backend/Products";

export const ordersCollection = collection(db, "orders");

export async function getOrders(): Promise<OrderItem[]> {
  const snapshot = await getDocs(ordersCollection);

  return snapshot.docs.map((document) => document.data() as OrderItem);
}

export async function saveOrder(order: OrderItem): Promise<void> {
  await setDoc(doc(db, "orders", String(order.id)), order);
}

export async function updateOrderStatus(
  orderId: string,
  status: OrderItem["status"],
): Promise<void> {
  await updateDoc(doc(db, "orders", orderId), {
    status,
  });
}
