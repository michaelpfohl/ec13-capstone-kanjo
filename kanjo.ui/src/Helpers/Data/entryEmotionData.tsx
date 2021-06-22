import axios from "axios";
import config from "../config";
import { EntryEmotion } from "../Types/EntryEmotionTypes";

const entryEmotionsUrl = `${config.BaseURL}/entry_emotions`;

const addEntryEmotion = (entryEmotion: EntryEmotion): Promise<EntryEmotion> =>
  new Promise((resolve, reject) => {
    axios
      .post(`${entryEmotionsUrl}`, entryEmotion)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });

const getEntryEmotionsByEntryId = (entryId: number): Promise<EntryEmotion[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${entryEmotionsUrl}/entry/${entryId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const updateEntryEmotion = (
  entryEmotion: EntryEmotion
): Promise<EntryEmotion> =>
  new Promise((resolve, reject) => {
    axios
      .put(`${entryEmotionsUrl}/${entryEmotion.id}`, entryEmotion)
      .then((response) => {
        resolve(response);
      })
      .catch((error) => reject(error));
  });

const deleteEntryEmotion = (entryEmotionId: number): Promise<EntryEmotion> =>
  axios.put(`${entryEmotionsUrl}/delete/${entryEmotionId}`);

export default {
  addEntryEmotion,
  getEntryEmotionsByEntryId,
  updateEntryEmotion,
  deleteEntryEmotion,
};
