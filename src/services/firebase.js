import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import {
  getDatabase,
  ref,
  update,
  set,
  connectDatabaseEmulator,
} from "firebase/database";

export const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);

export const updateProjectsData = (userId, data) => {
  const projectsMetadata = data.map((p) => p.id);
  const updates = {};
  updates["projects/" + userId] = data;
  updates["users/" + userId + "/projects"] = projectsMetadata;
  update(ref(database), updates);
};

export const writeFoldersData = (userId, data) => {
  set(ref(database, "folders/" + userId), data);
};
export const writeUsersData = (userId, data) => {
  set(ref(database, "users/" + userId), data);
};
export const writeQuestionsData = (userId, data) => {
  set(ref(database, "questions/" + userId), data);
};
export const writeAnswersData = (userId, data) => {
  set(ref(database, "answers/" + userId), data);
};
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // dev code
} else if (process.env.NODE_ENV === "test") {
  // test code
  connectAuthEmulator(auth, "http://localhost:9099");
  connectDatabaseEmulator(database, "localhost", 9000);
} else {
  // production code
}
