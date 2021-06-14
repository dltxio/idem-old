import config from "../../app/config.dev.json";
import axios from "axios";
const open = axios.create({
  baseURL: config.REACT_APP_GPIB_URL.endpoint,
  headers: {
    "Cache-Control": "no-store",
  },
});

export default { open };
