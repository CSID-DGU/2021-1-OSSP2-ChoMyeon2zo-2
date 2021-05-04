export const FIREBASE_CONFIG = {
    apiKey: "AIzaSyDAhIfLgwMupDGtxQI5sFAd9v2gI-s_rs8",
    authDomain: "donggukmarket-75f8b.firebaseapp.com",
    databaseURL: "https://donggukmarket-75f8b-default-rtdb.firebaseio.com",
    projectId: "donggukmarket-75f8b",
    storageBucket: "donggukmarket-75f8b.appspot.com",
    messagingSenderId: "590189223772",
    appId: "1:590189223772:web:bef7199db71115d6ebeb99",
    measurementId: "G-XDWXCD6XZC"
};

export const snapshotToArray = snapshot => {
    let returnArray = []
    snapshot.forEach(element => {
        let item = element.val()
        item.key = element.key
        returnArray.push(item)
    });
    return returnArray
}