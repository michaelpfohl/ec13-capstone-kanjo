import axios from "axios";
import { BaseURL } from "../config.json";
import { Entry } from "../Types/EntryTypes";

const entriesUrl = `${BaseURL}/entries`;

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

export default { addEntry, getMostRecent };
