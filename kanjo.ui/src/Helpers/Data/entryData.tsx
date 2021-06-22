import axios from "axios";
import config from "../config";
import { Entry } from "../Types/EntryTypes";

const entriesUrl = `${config.BaseURL}/entries`;

const addEntry = (entry: Entry): Promise<Entry> =>
  new Promise((resolve, reject) => {
    axios
      .post(`${entriesUrl}`, entry)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });

const getMostRecent = (id: number): Promise<Entry> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${entriesUrl}/most-recent/${id}`)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });

const getAllEntriesByUser = (userId: number): Promise<Entry[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${entriesUrl}/all/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const getAllEntriesByUserWithinDateRange = (
  userId: number,
  startDate: string,
  endDate: string
): Promise<Entry[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${entriesUrl}/date/${userId}/${startDate}/${endDate}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const getEntry = (entryId: number): Promise<Entry> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${entriesUrl}/${entryId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const deleteEntry = (id: number): Promise<Entry> =>
  axios.put(`${entriesUrl}/delete/${id}`);


const entryData = {
  addEntry,
  getMostRecent,
  getAllEntriesByUser,
  getAllEntriesByUserWithinDateRange,
  getEntry,
  deleteEntry,
};

export default entryData;
