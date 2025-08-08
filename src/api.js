// src/api.js
import { API_BASE_URL } from "./config";

export async function postCustomer(payload) {
  const res = await fetch(`${API_BASE_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export async function getBestRate(provider) {
  const res = await fetch(`${API_BASE_URL}/rates/best/${provider}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
