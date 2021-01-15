import AsyncStorage from "@react-native-async-storage/async-storage";
import * as secp from "noble-secp256k1";
import CryptoES from 'crypto-es';

const PairStorageKey = "@storage_ETH_PAIR";

const storePair = async (pair, storageKey, encryptionKey = null) => {
  let content = JSON.stringify(pair);
  if (encryptionKey != null)
    content = CryptoES.enc.Hex.stringify(CryptoES.AES.encrypt(content, encryptionKey).ciphertext.words);
  console.log("encrypted content: " + content);
  await AsyncStorage.setItem(storageKey, content);
};

const retrievePair = async (storageKey, encryptionKey) => {
  let content = await AsyncStorage.getItem(storageKey);
  if (content == null || encryptionKey == null)
    return content;
  content = CryptoES.AES.decrypt(content, encryptionKey);
  console.log("decrypted content: ", content);
  return content;
};

const createNew = () => {
  const privateKey = secp.utils.randomPrivateKey();
  const publicKey = secp.getPublicKey(privateKey);
  return {
    privateKey,
    publicKey,
  };
};

const toHexString = (byteArray) => Buffer.from(byteArray).toString("hex");

/**
 * @returns {Promise<{
 *   privateKey: string,
 *   publicKey: string,
 * }>}
 */
const getFromStorage = async (storageKey = PairStorageKey, encryptionKey = null) => {
  const jsonValue = await retrievePair(storageKey, encryptionKey);
  
  if (jsonValue != null)
    return JSON.parse(jsonValue);
  
  const pair = createNew();
  await storePair(pair, storageKey, encryptionKey);
  return pair;
};

export default {
  getFromStorage,
  toHexString
};
