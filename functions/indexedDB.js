const namOfIndexedDB = "test";

const connectIndexedDB = () => {
  return window.indexedDB.open(namOfIndexedDB);
};

const createIndexedDB = async () => {
  await window.indexedDB.deleteDatabase(namOfIndexedDB);
  let request = window.indexedDB.open(namOfIndexedDB);
  return new Promise((resolve) => {
    request.onupgradeneeded = function (event) {
      const db = event.target.result;
      let objectStore;
      objectStore = db.createObjectStore("product", { keyPath: "_id" });
      objectStore = db.createObjectStore("cache_product", { keyPath: "_id" });
      objectStore = db.createObjectStore("checked_product", { keyPath: "_id" });
      objectStore = db.createObjectStore("last_used_product", {
        keyPath: "_id",
      });
      objectStore = db.createObjectStore("favourite_product", {
        keyPath: "_id",
      });
      objectStore = db.createObjectStore("exercise", { keyPath: "_id" });
      objectStore = db.createObjectStore("cache_exercise", { keyPath: "_id" });
      objectStore = db.createObjectStore("last_used_exercise", {
        keyPath: "_id",
      });
      objectStore = db.createObjectStore("workout_plan", { keyPath: "_id" });
      objectStore = db.createObjectStore("workout_result", { keyPath: "_id" });
      objectStore = db.createObjectStore("daily_measurement", {
        keyPath: "whenAdded",
      });
      objectStore = db.createObjectStore("last_searched_users", {
        keyPath: "_id",
      });
      objectStore = db.createObjectStore("whatToUpdate", { keyPath: "_id" });
      objectStore.transaction.oncomplete = async () => resolve();
    };
  });
};

const deleteDatabaseIndexedDB = async () => {
  await window.indexedDB.deleteDatabase(namOfIndexedDB);
};

const getAllIndexedDB = async (value) => {
  let request = await connectIndexedDB();
  return new Promise((resolve) => {
    request.onsuccess = async function () {
      let valueITEMS = await request.result
        .transaction(value)
        .objectStore(value)
        .getAll();
      valueITEMS.onsuccess = function () {
        resolve(valueITEMS.result);
      };
    };
  });
};

const getIndexedDBbyID = async (where, id) => {
  let request3 = await connectIndexedDB();
  return new Promise((resolve) => {
    request3.onsuccess = async function () {
      const objectStore = await request3.result
        .transaction(where, "readwrite")
        .objectStore(where);
      const objectStoreTitleRequest = await objectStore.get(id.toString());
      objectStoreTitleRequest.onsuccess = async function () {
        resolve(objectStoreTitleRequest.result);
      };
    };
  });
};

const putIndexedDB = async (where, id, what, value) => {
  await putInformationAboutNeededUpdate(where);
  value = value.toString();
  let request3 = await connectIndexedDB();
  return new Promise((resolve) => {
    request3.onsuccess = async function () {
      const objectStore = await request3.result
        .transaction(where, "readwrite")
        .objectStore(where);
      const objectStoreTitleRequest = await objectStore.get(id.toString());
      objectStoreTitleRequest.onsuccess = async function () {
        const data = await objectStoreTitleRequest.result;
        data[what] = await value;
        await objectStore.put(data);
        resolve();
      };
    };
  });
};

const deleteIndexedDB = async (where, _id) => {
  _id = _id.toString();
  await putInformationAboutNeededUpdate(where);
  let request = await connectIndexedDB();
  return new Promise((resolve) => {
    request.onsuccess = async function () {
      await request.result
        .transaction(where, "readwrite")
        .objectStore(where)
        .delete(_id);
    };
    resolve();
  });
};

const addIndexedDB = async (where, value) => {
  if (value && value.length > 0) {
    await putInformationAboutNeededUpdate(where);
    for (let i = 0; i < value.length; i++) {
      value[i]._id = value[i]._id.toString();
    }
    let request = await connectIndexedDB();
    return new Promise((resolve) => {
      request.onsuccess = function () {
        let objectStore = request.result
          .transaction(where, "readwrite")
          .objectStore(where);
        value.forEach(function (products) {
          objectStore.add(products);
        });
        resolve();
      };
    });
  }
};

const putInformationAboutNeededUpdate = async (where) => {
  return new Promise((resolve) => {
    (async () => {
      if (where != "nutrition_diary_connections" && where != "whatToUpdate") {
        if (false) {
          let indexedDB = await getIndexedDBbyID("whatToUpdate", where);
          if (!indexedDB) {
            let array = [
              {
                _id: where,
              },
            ];
            await addIndexedDB("whatToUpdate", array);
          }
        } else {
          console.log('change putInformationAboutNeededUpdate to care about online + after offline should also update checked and favourite products?')
          localStorage.setItem("lastUpdated", new Date().getTime());
        }
      }
      resolve();
    })();
  });
};

export {
  createIndexedDB,
  deleteDatabaseIndexedDB,
  getAllIndexedDB,
  getIndexedDBbyID,
  addIndexedDB,
  deleteIndexedDB,
  putIndexedDB,
};

// Vue.prototype.$deleteThoseIDSfromDB = async (where, array, isNewValueInDB) => {
//     if(isNewValueInDB){ // if there is new value in DB, check if still need to request delete
//         for(let i=0;i<array.length;i++){
//             if(!await Vue.prototype.$getIndexedDBbyID(where, array[i]._id)) array.splice(i, 1)
//         }
//     }
//     return new Promise(resolve => {
//         (async () => {
//             if(array.length > 0){
//                 const originalArray = JSON.parse(JSON.stringify(array));
//                 for(let i=0;i<array.length;i++){
//                     array[i].deleted = true
//                     await Vue.prototype.$deleteIndexedDB(where, array[i]._id)
//                     if(where == 'daily_measurement' && store.state.online) array[i] = await Vue.prototype.$prepareDailyToSend(array[i], true)
//                 }
//                 if(store.state.online){
//                     if(await Vue.prototype.$is_id(array[0]._id)){
//                         await Vue.prototype.$http.post('requests/delete', {
//                             where: where,
//                             array: array
//                         })
//                         .then(async (response) => {
//                             await Vue.prototype.$gotNewToken(response.data.tokenGenerated, response.data.tokenRefreshGenerated)
//                             await Vue.prototype.$tellAboutSynchronization(where,"delete",array)
//                         })
//                         .catch(async (err) => {
//                             store.state.online = false
//                             await Vue.prototype.$catchThis(err)
//                             return await Vue.prototype.$deleteThoseIDSfromDB(where, originalArray, isNewValueInDB)
//                         })
//                     }
//                 }else{
//                     for(let i=0;i<array.length;i++){
//                         if(!await Vue.prototype.$is_id(array[i]._id)){
//                             await Vue.prototype.$deleteIndexedDB(where, array[i]._id)
//                             array.splice(i, 1)
//                         }
//                     }
//                     if(array.length>0) await Vue.prototype.$addIndexedDB(where, array)
//                 }
//             }
//             resolve();
//         })();
//     })
// }

// Vue.prototype.$overwriteThoseIDSinDB = async (where, array, requireONLINE, uniquePARAM) => {
//     if(!uniquePARAM) uniquePARAM = "_id"
//     let canIwork = true
//     if((requireONLINE) && (requireONLINE == true) && (!store.state.online)) canIwork = false
//     return new Promise(resolve => {
//         (async () => {
//             let originalArray = JSON.parse(JSON.stringify(array.map((x) => {
//                 x.changed = true
//                 x.user_ID = store.state.userToken._id
//                 return x
//             })));
//             if(canIwork){
//                 for(let i=0;i<array.length;i++){
//                     await Vue.prototype.$deleteIndexedDB(where, array[i][uniquePARAM])
//                     if(where == 'daily_measurement' && store.state.online) array[i] = await Vue.prototype.$prepareDailyToSend(array[i], true)
//                 }
//                 if(store.state.online){
//                     await Vue.prototype.$http.post('requests/update/' + where, {
//                         array: array
//                     })
//                     .then(async (response) => {
//                         await Vue.prototype.$gotNewToken(response.data.tokenGenerated, response.data.tokenRefreshGenerated)
//                         let originalSentArray = JSON.parse(JSON.stringify(array));
//                         array = JSON.parse(JSON.stringify(response.data.arrayNEWvalues));
//                         if(where == 'daily_measurement'){
//                             for(let i=0; i<originalSentArray.length; i++){
//                                 if(originalSentArray[i].nutrition_diary && originalSentArray[i].nutrition_diary.length>0){
//                                     for(let a=0; a<originalSentArray[i].nutrition_diary.length; a++){
//                                         originalSentArray[i].nutrition_diary[a]._id = array[i].nutrition_diary[a]._id
//                                         array[i].nutrition_diary[a] = originalSentArray[i].nutrition_diary[a]
//                                     }
//                                 }
//                             }
//                         }
//                         await Vue.prototype.$tellAboutSynchronization(where, "change", array)
//                     })
//                     .catch(async (err) => {
//                         store.state.online = false
//                         await Vue.prototype.$catchThis(err)
//                         return await Vue.prototype.$overwriteThoseIDSinDB(where, originalArray, requireONLINE, uniquePARAM)
//                     })
//                 }
//                 await Vue.prototype.$addIndexedDB(where, array)
//             }else Vue.prototype.$notification("alert", Vue.prototype.$t('error_notify.not_available_in_offline'))
//             resolve(array);
//         })();
//     })
// }

// Vue.prototype.$insertThoseIDStoDB = async (where, array, whatToUpdate, value, uniquePARAM, whatToUpdate2) => {
//     if(!uniquePARAM) uniquePARAM = "_id"
//     return new Promise(resolve => {
//         (async () => {
//             let whatToUpdateARRAY = false
//             let whatToUpdateARRAY2 = false
//             let arrayIDSbeforeInsert = []
//             const originalArray = JSON.parse(JSON.stringify(array));
//             for(let i=0;i<array.length;i++){
//                 if(array[i]._id){
//                     await Vue.prototype.$deleteIndexedDB(where, array[i][uniquePARAM])
//                     arrayIDSbeforeInsert.push(array[i]._id)
//                     delete array[i]._id
//                 }
//                 if(where == 'daily_measurement' && store.state.online) array[i] = await Vue.prototype.$prepareDailyToSend(array[i], true)
//             }
//             if(store.state.online){
//                 if(whatToUpdate) whatToUpdateARRAY = await Vue.prototype.$getAllIndexedDB('daily_measurement')
//                 if(whatToUpdate2) whatToUpdateARRAY2 = await Vue.prototype.$getAllIndexedDB(whatToUpdate2)
//                 await Vue.prototype.$http.post('requests/insert/' + where, {
//                     array: array
//                 })
//                 .then(async (response) => {
//                     await Vue.prototype.$gotNewToken(response.data.tokenGenerated, response.data.tokenRefreshGenerated)
//                     array = JSON.parse(JSON.stringify(response.data.model));
//                     if(where == 'daily_measurement'){
//                         for(let i=0; i<array.length; i++){
//                             if(await Vue.prototype.$getIndexedDBbyID(where, array[i].whenAdded)) await Vue.prototype.$deleteIndexedDB(where, array[i].whenAdded) // Server can return existing date
//                         }
//                     }
//                     if(whatToUpdate && whatToUpdateARRAY.length>0){
//                         for(let i=0;i<array.length;i++){
//                             for(let a=0;a<whatToUpdateARRAY.length;a++){
//                                 let checker = 0
//                                 for(let b=0;b<whatToUpdateARRAY[a][whatToUpdate].length;b++){
//                                     if(whatToUpdateARRAY[a][whatToUpdate][b][value] == arrayIDSbeforeInsert[i]){
//                                         whatToUpdateARRAY[a][whatToUpdate][b][value] = array[i]._id
//                                         checker++
//                                     }
//                                 }
//                                 if(checker>0){
//                                     await Vue.prototype.$deleteIndexedDB('daily_measurement', new Date(whatToUpdateARRAY[a].whenAdded).toISOString())
//                                     await Vue.prototype.$addIndexedDB('daily_measurement', [whatToUpdateARRAY[a]])
//                                 }
//                             }
//                         }
//                     }
//                     if(whatToUpdate2 && whatToUpdateARRAY2.length>0){
//                         for(let i=0;i<array.length;i++){
//                             for(let a=0;a<whatToUpdateARRAY2.length;a++){
//                                 if(whatToUpdateARRAY2[a][value] == arrayIDSbeforeInsert[i]){
//                                     await Vue.prototype.$putIndexedDB(whatToUpdate2, whatToUpdateARRAY2[a]._id, value, array[i]._id)
//                                 }
//                             }
//                         }
//                     }
//                     await Vue.prototype.$tellAboutSynchronization(where, "add", array)
//                 })
//                 .catch(async (err) => {
//                     store.state.online = false
//                     await Vue.prototype.$catchThis(err)
//                     return await Vue.prototype.$insertThoseIDStoDB(where, originalArray, whatToUpdate, value, uniquePARAM, whatToUpdate2)
//                 })
//             }else{
//                 for(let i=0;i<array.length;i++){
//                     array[i]._id = "XD" + await Vue.prototype.$currentTime() + i
//                 }
//             }
//             await Vue.prototype.$addIndexedDB(where, array)
//             resolve(array);
//         })();
//     })
// }

// Vue.prototype.$prepareDailyToSend = async (daily_measurement, removeDeleted) => {
//     return new Promise(resolve => {
//         (async () => {
//             if(daily_measurement._id && !await Vue.prototype.$is_id(daily_measurement._id)) delete daily_measurement._id
//             if(daily_measurement.nutrition_diary && daily_measurement.nutrition_diary.length>0){
//                 for(let i=0;i<daily_measurement.nutrition_diary.length;i++){
//                     if(removeDeleted && daily_measurement.nutrition_diary[i].deleted) daily_measurement.nutrition_diary.splice(i, 1)
//                     else if(daily_measurement.nutrition_diary[i]._id && !await Vue.prototype.$is_id(daily_measurement.nutrition_diary[i]._id)) delete daily_measurement.nutrition_diary[i]._id
//                 }
//             }
//             if(daily_measurement.workout_result && daily_measurement.workout_result.length>0){
//                 for(let i=0;i<daily_measurement.workout_result.length;i++){
//                     if(removeDeleted && daily_measurement.workout_result[i].deleted) daily_measurement.workout_result.splice(i, 1)
//                     else if(daily_measurement.workout_result[i]._id && !await Vue.prototype.$is_id(daily_measurement.workout_result[i]._id)) delete daily_measurement.workout_result[i]._id
//                 }
//             }
//             resolve(daily_measurement);
//         })();
//     });
// }

// Vue.prototype.$daily_measurement = async (array, where, whatTOdo) => {
//     return new Promise(resolve => {
//         (async () => {

//             if(new Date(await Vue.prototype.$dateTOiso(array[0].whenAdded)).getTime() > new Date(Vue.prototype.$dateMAXlimit).getTime()){
//                 Vue.prototype.$notification("alert", Vue.prototype.$t("error_notify.dateMAXlimit"))
//                 resolve()
//             }

//             let timeNOW = await Vue.prototype.$currentTime()

//             let itsNewValue = false

//             // Sprawdzanie, czy istnieje
//             let NEWdaily_measurement = await Vue.prototype.$getIndexedDBbyID('daily_measurement', await Vue.prototype.$dateTOiso(array[0].whenAdded))

//             // Generowanie nowego schema
//             if(!NEWdaily_measurement){
//                 NEWdaily_measurement = {
//                     "_id": "XD" + timeNOW,
//                     "user_ID": store.state.userToken._id,
//                     "whenAdded": await Vue.prototype.$dateTOiso(array[0].whenAdded)
//                 }
//                 itsNewValue = true
//             }else NEWdaily_measurement.changed = true

//             // Wprowadzanie zmian
//             if(where == 'weight'){
//                 NEWdaily_measurement.weight = array[0].weight
//                 array[0].weight_description ? NEWdaily_measurement.weight_description = array[0].weight_description : delete NEWdaily_measurement.weight_description
//                 array[0].neck ? NEWdaily_measurement.neck = array[0].neck : delete NEWdaily_measurement.neck
//                 array[0].shoulders ? NEWdaily_measurement.shoulders = array[0].shoulders : delete NEWdaily_measurement.shoulders
//                 array[0].chest ? NEWdaily_measurement.chest = array[0].chest : delete NEWdaily_measurement.chest
//                 array[0].biceps ? NEWdaily_measurement.biceps = array[0].biceps : delete NEWdaily_measurement.biceps
//                 array[0].waist ? NEWdaily_measurement.waist = array[0].waist : delete NEWdaily_measurement.waist
//                 array[0].hips ? NEWdaily_measurement.hips = array[0].hips : delete NEWdaily_measurement.hips
//                 array[0].thigh ? NEWdaily_measurement.thigh = array[0].thigh : delete NEWdaily_measurement.thigh
//                 array[0].calf ? NEWdaily_measurement.calf = array[0].calf : delete NEWdaily_measurement.calf
//             }

//             if(where == 'water'){
//                 array[0].water > 0 ? NEWdaily_measurement.water = array[0].water : delete NEWdaily_measurement.water
//             }

//             // Wprowadzanie zmian
//             for(let i=0;i<array.length;i++){
//                 if(!NEWdaily_measurement[where] && where != 'weight' && where != 'water') NEWdaily_measurement[where] = []
//                 if(where == 'nutrition_diary'){
//                     if(whatTOdo == 'add'){
//                         array[i]["_id"] = "XD" + timeNOW++,
//                         NEWdaily_measurement.nutrition_diary.push(array[i])
//                     }
//                     if(whatTOdo == 'change'){
//                         if(NEWdaily_measurement[where].length>0){
//                             for(let a=0; a<NEWdaily_measurement[where].length; a++){
//                                 if(NEWdaily_measurement.nutrition_diary[a]["_id"] == array[i]["_id"]){
//                                     array[i].changed = true;
//                                     NEWdaily_measurement.nutrition_diary[a] = array[i]
//                                     break;
//                                 }
//                             }
//                         }
//                     }
//                     if(whatTOdo == 'delete'){
//                         if(await Vue.prototype.$is_id(array[i]._id)) NEWdaily_measurement.nutrition_diary[NEWdaily_measurement.nutrition_diary.findIndex(x => x._id == array[i]._id)].deleted = true
//                         else NEWdaily_measurement.nutrition_diary.splice(NEWdaily_measurement.nutrition_diary.findIndex(x => x._id == array[i]._id), 1)
//                     }
//                 }
//                 if(where == 'workout_result'){
//                     if(whatTOdo == 'change'){
//                         let checkerResult = 0
//                         if(NEWdaily_measurement.workout_result && NEWdaily_measurement.workout_result.length>0){
//                             for(let a=0;a<NEWdaily_measurement.workout_result.length;a++){
//                                 if(NEWdaily_measurement.workout_result[a]._id == array[i]._id){
//                                     array[i].changed = true
//                                     NEWdaily_measurement.workout_result[a] = array[i]
//                                     checkerResult++
//                                     break;
//                                 }
//                             }
//                         }
//                         if(checkerResult == 0){
//                             NEWdaily_measurement.workout_result.push(array[i])
//                             if(array[i].burned){
//                                 if(!NEWdaily_measurement.nutrition_diary) NEWdaily_measurement.nutrition_diary = []
//                                 NEWdaily_measurement.nutrition_diary.push({
//                                     "activity": array[i].title,
//                                     "calories": -array[i].burned
//                                 })
//                             }
//                         }
//                     }
//                     if(whatTOdo == 'delete'){
//                         if(NEWdaily_measurement.workout_result && NEWdaily_measurement.workout_result.length>0){
//                             for(let a=0;a<NEWdaily_measurement.workout_result.length;a++){
//                                 if(NEWdaily_measurement.workout_result[a]._id == array[i]._id){
//                                     if(await Vue.prototype.$is_id(array[i]._id)) NEWdaily_measurement.workout_result[a].deleted = true
//                                     else NEWdaily_measurement.workout_result.splice(a, 1)
//                                     break;
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }

//             // Wysyłanie do mongoDB
//             if(NEWdaily_measurement._id && await Vue.prototype.$is_id(NEWdaily_measurement._id)) NEWdaily_measurement = await Vue.prototype.$overwriteThoseIDSinDB("daily_measurement", [NEWdaily_measurement], false, 'whenAdded')
//             else NEWdaily_measurement = await Vue.prototype.$insertThoseIDStoDB("daily_measurement", [NEWdaily_measurement], '', '', 'whenAdded')

//             store.state.daily_measurementFLAG = timeNOW
//             if(itsNewValue){
//                 let allDaily = await Vue.prototype.$getAllIndexedDB('daily_measurement')
//                 allDaily = allDaily.filter((x) => new Date(x.whenAdded).getTime() < new Date(Vue.prototype.$dateMINlimit).getTime() || new Date(x.whenAdded).getTime() > new Date(Vue.prototype.$dateMAXlimit).getTime())
//                 if(allDaily.length > 0){
//                     for(let i=0; i<allDaily.length; i++){
//                         await Vue.prototype.$deleteIndexedDB('daily_measurement', allDaily[i].whenAdded)
//                     }
//                 }
//             }
//             resolve(NEWdaily_measurement);
//         })();
//     })
// }
