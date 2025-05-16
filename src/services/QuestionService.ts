import { Question } from "../data/objects";
import api from "../utils/axiosInstance";

export const QuestionService = {
  async addQuestion(path: string, payload: Question) {
    const res = await api.post(`${path}/addQuestion`, payload);
    return res;
  },
  async deleteQuestion(path: string, id: number) {
    const res = await api.delete(`${path}/deleteQuestion/${id}`);
    return res;
  },

  async getQuestion(path: string, id: number) {
    const res = await api.get(`${path}/getQuestion/${id}`);
    return res;
  },

  async getQuestions(path: string) {
    const res = await api.get(`${path}/getAllQuestions`);
    return res;
  },

  async getCategories(path: string) {
    const res = await api.get(`${path}/getCategories`);
    return res;
  },
};

export type ApiResponse = {
  success: boolean;
  message: string;
  data: object;
  errorCode: string;
  timestamp: string;
};
