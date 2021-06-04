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

const getAllEmotionsWithEntries = (userId: number): Promise<Emotion[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${emotionsUrl}/all-with-entries/${userId}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const getPublicEmotions = (): Promise<Emotion[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${emotionsUrl}/public`)
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

const getEmotionsWithFrequencyByDateRange = (
  userId: number,
  startDate: string,
  endDate: string
): Promise<Emotion[]> =>
  new Promise((resolve, reject) => {
    axios
      .get(`${emotionsUrl}/date/${userId}/${startDate}/${endDate}`)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

const addEmotion = (emotion: Emotion): Promise<Emotion> =>
  new Promise((resolve, reject) => {
    axios
      .post(`${emotionsUrl}`, emotion)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });

export default {
  getEmotions,
  getAllEmotionsWithEntries,
  getPublicEmotions,
  getEmotionById,
  getEmotionsWithFrequencyByDateRange,
  addEmotion,
};
