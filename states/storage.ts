import localforage from "localforage";

localforage.config({
  name: "fomplo_storage",
  version: 1,
  storeName: "fomplo",
});

export const storage = localforage;
