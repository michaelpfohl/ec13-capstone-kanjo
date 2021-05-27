import axios from "axios";
import { BaseURL } from "../config.json";
import { Emotion } from "../Types/EmotionTypes";

const emotionsUrl = `${BaseURL}/emotions`;

const getEmotions = (userId: number): Promise<Emotion[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${emotionsUrl}/all/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const getEmotionById = (id: number): Promise<Emotion> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${emotionsUrl}/${id}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const addEmotion = (emotion: Emotion): Promise<Emotion> => 
  new Promise((resolve, reject) => {
    axios.post(`${emotionsUrl}`, emotion).then((response) => {
        resolve(response.data)
    }).catch((error) => reject(error));
  });

export default {
  getEmotions,
  getEmotionById,
  addEmotion,
};
