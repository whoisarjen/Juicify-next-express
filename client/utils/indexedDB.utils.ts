import { getOnline } from "./db.utils";
const namOfIndexedDB = "test";

const connectIndexedDB = async () => indexedDB.open(namOfIndexedDB);

export const createIndexedDB = async (): Promise<any> => {
  await deleteDatabaseIndexedDB();
  await window.indexedDB.deleteDatabase(namOfIndexedDB);
  let request = window.indexedDB.open(namOfIndexedDB);
  return new Promise((resolve) => {
    request.onupgradeneeded = function (event: any) {
      const db = event.target.result;
      let objectStore;
      objectStore = db.createObjectStore("product", { keyPath: "_id" });
      objectStore = db.createObjectStore("cache_product", { keyPath: "_id" });
      objectStore = db.createObjectStore("checked_product", { keyPath: "_id" });
      objectStore = db.createObjectStore("last_used_product", { keyPath: "_id", });
      objectStore = db.createObjectStore("favourite_product", { keyPath: "_id", });

      objectStore = db.createObjectStore("exercise", { keyPath: "_id" });
      objectStore = db.createObjectStore("cache_exercise", { keyPath: "_id" });
      objectStore = db.createObjectStore("checked_exercise", { keyPath: "_id", });
      objectStore = db.createObjectStore("last_used_exercise", { keyPath: "_id", });
      objectStore = db.createObjectStore("favourite_exercise", { keyPath: "_id", });

      objectStore = db.createObjectStore("workout_plan", { keyPath: "_id" });
      objectStore = db.createObjectStore("workout_result", { keyPath: "_id" });
      objectStore = db.createObjectStore("daily_measurement", { keyPath: "whenAdded", });
      objectStore = db.createObjectStore("last_searched_users", { keyPath: "_id", });

      objectStore = db.createObjectStore("whatToUpdate", { keyPath: "_id" });
      objectStore = db.createObjectStore("socketUpdated", { keyPath: "_id" });
      objectStore.transaction.oncomplete = async () => resolve(true);
    };
  });
};

export const deleteDatabaseIndexedDB = async () => window.indexedDB.deleteDatabase(namOfIndexedDB)

export const getAllIndexedDB = async (value: string): Promise<any> => {
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

export const getIndexedDBbyID = async (where: string, id: string): Promise<any> => {
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

export const putIndexedDB = async (
  where: string,
  id: string,
  what: string,
  value: any
): Promise<any> => {
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
        resolve(true);
      };
    };
  });
};

export const deleteIndexedDB = async (where: string, _id: string): Promise<any> => {
  let request = await connectIndexedDB();
  request.onsuccess = async function () {
    await request.result
      .transaction(where, "readwrite")
      .objectStore(where)
      .delete(_id.toString());
  };
  return true;
};

export const addIndexedDB = async (where: string, value: Array<any>): Promise<any> => {
  if (value && value.length > 0) {
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
        resolve(true);
      };
    });
  }
};

export const putInformationAboutNeededUpdate = async (where: string, time?: number): Promise<any> => {
  if (!getOnline()) {
    if (!(await getIndexedDBbyID("whatToUpdate", where))) {
      await addIndexedDB("whatToUpdate", [{ _id: where, },]);
    }
  }
  return true;
};