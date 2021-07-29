declare namespace server {
  type SuccessResponse = { success: boolean };

  type MnemonicKey = { mnemonicKey: string };

  type Keypairs = {
    address: string;
    publicKey: string;
    privateKey: string;
  };
}
