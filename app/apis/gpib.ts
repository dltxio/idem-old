import axios from "axios";
import { REACT_APP_GPIB_URL } from "@env";
const open = axios.create({
  baseURL: REACT_APP_GPIB_URL,
  headers: {
    "Cache-Control": "no-store",
  },
});

export default { open };
