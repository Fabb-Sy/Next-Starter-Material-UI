import { getToken } from 'firebase/messaging';
import { messaging } from './firebaseConfig';

const generateSwEnv = async () => {
  console.log(process.env.NEXT_PUBLIC_SESSION_PASSWORD);
  try {
    const response = await fetch('/api/generate-sw-env', {
      headers: {
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_SESSION_PASSWORD}`,
      }
    });
    if (!response.ok) {
      throw new Error('Failed to generate SW environment');
    }
  } catch (error) {
    console.error('SW Env generation failed:', error);
  }
};

export const getNotificationToken = async () => {
  try {
    if (!('serviceWorker' in navigator)) {
      return null;
    }

    // Generate SW env file first
    await generateSwEnv();

    // Then register service worker
    const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');

    if (!messaging) {
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
      serviceWorkerRegistration: registration
    });

    return token;
  } catch (error) {
    return null;
  }
};
