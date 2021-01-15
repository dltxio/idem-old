import AsyncStorage from "@react-native-async-storage/async-storage";
import * as secp from "noble-secp256k1";
import crypto from "crypto";

const PairStorageKey = "@storage_ETH_PAIR";
const PairStorageEncryptionAlgorithm = "aes-256-gcm";

const storePair = async (pair, storageKey, encryptionKey = null) => {
  let content = JSON.stringify(pair);
  if (encryptionKey != null) {
    const iv = new Buffer(crypto.randomBytes(8)).toString("hex");
    const cipher = crypto.createCipheriv(
      PairStorageEncryptionAlgorithm,
      encryptionKey,
      iv
    );
    content = iv + Buffer.concat([
      cipher.update(content),
      cipher.final()
    ]).toString("hex");
  }
  await AsyncStorage.setItem(storageKey, content);
};

const retrievePair = async (storageKey, encryptionKey) => {
  let content = await AsyncStorage.getItem(storageKey);
  if (content == null || encryptionKey == null)
    return content;
  const iv = content.substr(0, 16);
  content = content.substr(16);
  const decipher = crypto.createDecipheriv(
    PairStorageEncryptionAlgorithm,
    encryptionKey,
    iv
  );
  content = Buffer.concat([
    decipher.update(
      Buffer.from(content, "hex")
    ),
    decipher.final()
  ]).toString();
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
