import axios from "axios";
import { REACT_APP_API_URL } from "@env";
const open = axios.create({
  baseURL: REACT_APP_API_URL,
  headers: {
    "Cache-Control": "no-store",
  },
});

export default { open };
