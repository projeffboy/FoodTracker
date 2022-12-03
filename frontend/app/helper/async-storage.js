import AsyncStorage from "@react-native-async-storage/async-storage";

// food as in food name
export async function addToDiary(id, food, nutrients) {
  try {
    if (id === undefined || food === undefined || nutrients === undefined) {
      throw Exception("One of id, food, or nutrients is missing.");
    }

    const date = new Date();
    const fmtDate = date.toLocaleDateString();
    const key = "@diary:" + fmtDate;

    let diaryDay = await AsyncStorage.getItem(key);
    diaryDay = JSON.parse(diaryDay) || [];

    const newEntry = { id, food, nutrients };
    diaryDay.push(newEntry);
    await AsyncStorage.setItem(key, JSON.stringify(diaryDay));
    //console.log(JSON.parse(await AsyncStorage.getItem(key)));

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}

export async function getDiaryKey(key) {
  try {
    const food = await AsyncStorage.getItem("@diary:" + key);

    return JSON.parse(food);
  } catch (e) {
    console.error(e);

    return null;
  }
}

export async function deleteKey(key) {
  try {
    await AsyncStorage.removeItem(key);

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}

export async function deleteAll() {
  try {
    await AsyncStorage.clear();

    return true;
  } catch (e) {
    console.error(e);

    return false;
  }
}
