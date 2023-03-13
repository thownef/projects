// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyBDilR5OmA3FOY57yodbX44nf6JSC4u3-Q',
    authDomain: 'testpro-19a77.firebaseapp.com',
    databaseURL: 'https://testpro-19a77-default-rtdb.firebaseio.com',
    projectId: 'testpro-19a77',
    storageBucket: 'testpro-19a77.appspot.com',
    messagingSenderId: '319325802967',
    appId: '1:319325802967:web:773f56eb9bbfbeffab7b92',
    measurementId: 'G-57432K0BFW',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const database = getDatabase(app)
