
/**
 * Secure encryption and hashing utilities for private messages.
 */

const encoder = new TextEncoder();
const decoder = new TextDecoder();

// Simple SHA-256 hash for password verification in DB
export async function hashPassword(password: string): Promise<string> {
  const msgUint8 = encoder.encode(password);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function getKey(password: string, salt: Uint8Array) {
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: 100000,
      hash: "SHA-256",
    },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptMessage(message: string, password: string): Promise<string> {
  const salt = window.crypto.getRandomValues(new Uint8Array(16));
  const iv = window.crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey(password, salt);

  const encryptedContent = await window.crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    encoder.encode(message)
  );

  const combined = new Uint8Array(salt.length + iv.length + encryptedContent.byteLength);
  combined.set(salt, 0);
  combined.set(iv, salt.length);
  combined.set(new Uint8Array(encryptedContent), salt.length + iv.length);

  return btoa(String.fromCharCode(...combined));
}

export async function decryptMessage(payload: string, password: string): Promise<string | null> {
  try {
    const combined = new Uint8Array(
      atob(payload)
        .split("")
        .map((c) => c.charCodeAt(0))
    );

    const salt = combined.slice(0, 16);
    const iv = combined.slice(16, 28);
    const data = combined.slice(28);

    const key = await getKey(password, salt);

    const decryptedContent = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      data
    );

    return decoder.decode(decryptedContent);
  } catch (e) {
    console.error("Decryption failed", e);
    return null;
  }
}
