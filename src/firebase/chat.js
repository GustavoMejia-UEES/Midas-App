import { db } from './config';
import { 
  addDoc, 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  onSnapshot, 
  serverTimestamp, 
  setDoc, 
  updateDoc 
} from 'firebase/firestore';

export const listenForChats = (setChats) => {
  const chatsRef = collection(db, "chats");
  return onSnapshot(chatsRef, (snapshot) => {
    const chats = [];
    snapshot.forEach((doc) => {
      chats.push({ id: doc.id, ...doc.data() });
    });
    setChats(chats);
  });
};

export const sendMessage = async (messageText, chatId, user1, user2) => {
  try {
    const messagesRef = collection(db, "chats", chatId, "messages");
    const newMessage = {
      text: messageText,
      sender: user1,
      receiver: user2,
      timestamp: serverTimestamp(),
    };
    await addDoc(messagesRef, newMessage);
    return { success: true };
  } catch (error) {
    console.error("Error sending message:", error);
    return { success: false, error };
  }
};

export const listenForMessages = (chatId, setMessages) => {
  const messagesRef = collection(db, "chats", chatId, "messages");
  return onSnapshot(messagesRef, (snapshot) => {
    const messages = [];
    snapshot.forEach((doc) => {
      messages.push({ id: doc.id, ...doc.data() });
    });
    setMessages(messages);
  });
}; 