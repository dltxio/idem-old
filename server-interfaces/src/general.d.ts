declare namespace server {
  type SuccessResponse = { success: boolean };

  type MnemonicKey = { mnemonicKey: string };

  type Keypairs = {
    address: string;
    publicKey: string;
    privateKey: string;
  };

  type PGPKeypairRequest = {
    name: string;
    email: string;
    passphrase: string | undefined;
  };

  type PGPKeypariResponse = {
    privateKey: string;
    publicKey: string;
    revocationCertificate: string;
  };
}
