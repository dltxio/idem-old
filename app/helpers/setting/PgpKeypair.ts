import * as openpgp from "openpgp";

type PgpKeypair = {
  name: string;
  email: string;
  passphrase: string | undefined;
};

export const CreatePGPKeypair = async (keypair: PgpKeypair) => {
  const { privateKey, publicKey, revocationCertificate } =
    await openpgp.generateKey({
      type: "ecc", // Type of the key, defaults to ECC
      curve: "curve25519", // ECC curve name, defaults to curve25519
      userIDs: [{ name: keypair.name, email: keypair.email }], // you can pass multiple user IDs
      passphrase: keypair.passphrase, // protects the private key
      format: "armored", // output key format, defaults to 'armored' (other options: 'binary' or 'object')
    });

  return {
    privateKey,
    publicKey,
    revocationCertificate,
  };
};
