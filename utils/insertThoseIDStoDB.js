import { addIndexedDB, deleteIndexedDB } from "./indexedDB"

const insertThoseIDStoDB = async (where, array) => {
    await deleteIndexedDB(where, array[0].whenAdded)
    await addIndexedDB(where, array)
    return []
}
 
export default insertThoseIDStoDB;

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