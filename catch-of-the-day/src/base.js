import Rebase from 're-base';

// a base - is a connection to the firebase databse
const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

export const app = firebase.initializeApp({
	apiKey: "AIzaSyDt5MaZVeqyujiVUD8Y3Etckgg77t3yP0k",
    authDomain: "catch-of-the-day-corinne.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-corinne.firebaseio.com",
});
const base = Rebase.createClass(app.database());

export const githubProvider = new firebase.auth.GithubAuthProvider();
export const facebookProvider = new firebase.auth.FacebookAuthProvider();
export const twitterProvider = new firebase.auth.TwitterAuthProvider();
export const auth = firebase.auth();

// so we can access this database connection from any one of our files
// just import base when we need to work with the database, and it will be autmatically be connected
export default base;