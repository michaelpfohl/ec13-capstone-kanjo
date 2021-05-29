import axios from "axios";
import { BaseURL } from "../config.json";
import { EntryEmotion } from "../Types/EntryEmotionTypes";

const entryEmotionsUrl = `${BaseURL}/entry_emotions`;

const addEntryEmotion = (entryEmotion: EntryEmotion): Promise<EntryEmotion> =>
  new Promise((resolve, reject) => {
      axios.post(`${entryEmotionsUrl}`, entryEmotion).then((response) => {
          resolve(response);
      }).catch((error) => reject(error));
  });

const getEntryEmotionsByEntryId = (entryId: number): Promise<EntryEmotion[]> => 
  new Promise((resolve, reject) => {
      axios.get(`${entryEmotionsUrl}/entry/${entryId}`).then((response) => {
          resolve(response.data);
      }).catch((error) => reject(error));
  })

export default { addEntryEmotion, getEntryEmotionsByEntryId };
