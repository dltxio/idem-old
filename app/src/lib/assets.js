import config from "../../config.json";
import axios from "axios";

const Type = {
  Claims: "claims",
  Vendors: "vendors",
};

/**
 * @param {Type} assetType
 * @returns {Promise<Object>}
 */
const fetch = async (assetType) => {
  const endpoint = `${config.assets.endpoint}${config.assets[assetType]}`;
  const response = await axios.get(endpoint);
  if (response.data == null)
    throw new Error(`Could not fetch asset data from endpoint "${endpoint}"`);
  return response.data;
};

export default { fetch, Type };
