import axios from "axios";
import { Form } from "../types/form"; // Adjust based on your structure

const API_URL = "https://formbuilder-w78t.onrender.com/";

export const saveForm = async (form: Form) => {
  const res = await axios.post(`${API_URL}`, form);
  return res.data;
};

export const getFormById = async (id: string) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};
