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

const putIndexedDB = async (isOnline, where, id, what, value) => {
    await putInformationAboutNeededUpdate(isOnline, where);
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

const deleteIndexedDB = async (isOnline, where, _id) => {
    console.log(isOnline, where, _id)
    _id = _id.toString();
    await putInformationAboutNeededUpdate(isOnline, where);
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

const addIndexedDB = async (isOnline, where, value) => {
    if (value && value.length > 0) {
        await putInformationAboutNeededUpdate(isOnline, where);
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

const putInformationAboutNeededUpdate = async (isOnline, where) => {
    return new Promise((resolve) => {
        (async () => {
            if (where != "nutrition_diary_connections" && where != "whatToUpdate") {
                if (isOnline) {
                    if (!await getIndexedDBbyID("whatToUpdate", where)) {
                        await addIndexedDB(isOnline, "whatToUpdate", [
                            {
                                _id: where,
                            },
                        ]);
                    }
                } else {
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