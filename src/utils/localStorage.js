import AsyncStorage from '@react-native-community/async-storage';

// Load data from local storage
export async function loadDataFromLocalStorage(address) {
  try {    
    const value = await AsyncStorage.getItem(address);

    if (value !== null) {
      let userData = JSON.parse(value);
      return userData;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

// Save user data to local storage
export async function saveDataToStorage(address, data) {
  try {
    await AsyncStorage.setItem(address, JSON.stringify(data));
  } catch(err) {
    console.log(err)
  }
}

// Clear storage
export async function clearLocalStorage() {
  try {
    // Take all async storage keys and remove them
    let keysToRemove = [];
    await AsyncStorage.getAllKeys((err, keys)=>{ keysToRemove = keys });
    keysToRemove.map(async (item)=>{ await AsyncStorage.removeItem(item) });
  } catch(err) {
    console.log(err);
  }
}

// Console all keys of AsyncStorage
export async function logAsyncStorageKeys() {
  await AsyncStorage.getAllKeys((err, keys)=>{ console.log('AsyncStorage keys: ', keys) });
}
