import { ethers } from "ethers";
import { ValidationSchema } from "./../../utils/validate";
import Joi from "joi";
import { RequestHandler } from "../request-handler-wrapper";
import { badRequest, validationBadRequest } from "../../utils/errors";
import { validate, ValidationSchema } from "../../utils/validate";
import { Wallet } from "ethers";

const bodyValidation: ValidationSchema<server.MnemonicKey> = {
  mnemonicKey: Joi.string().required()
};

const requestGetKeypair: RequestHandler<
  void,
  void,
  server.MnemonicKey,
  server.Keypairs
> = async ({ body }) => {
  const bodyValidationResult = await validate<server.MnemonicKey>(
    body,
    bodyValidation
  );

  if (bodyValidationResult.isInvalid) {
    return validationBadRequest(bodyValidationResult.errors);
  }

  const walletMnemonic = Wallet.fromMnemonic(body.mnemonicKey);
  const walletPrivateKey = new Wallet(walletMnemonic.privateKey);
  if (walletMnemonic.address !== walletPrivateKey.address) {
    return badRequest("Mnemonic is wrong, please try again");
  }
  const address = await walletMnemonic.getAddress();
  const privateKey = walletMnemonic.privateKey;
  const publicKey = walletMnemonic.publicKey;
  return {
    address,
    privateKey,
    publicKey
  };
};

export default requestGetKeypair;
