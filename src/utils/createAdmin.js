import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const createAdminUser = async (userId, email) => {
  try {
    await setDoc(doc(db, 'users', userId), {
      email: email,
      role: 'admin',
      createdAt: new Date(),
      lastLogin: new Date()
    }, { merge: true });
    
    console.log('Administrador creado exitosamente');
    return true;
  } catch (error) {
    console.error('Error al crear administrador:', error);
    return false;
  }
}; 