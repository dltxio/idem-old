import { types, Instance } from "mobx-state-tree";
import { Claim, Vendor } from "./assetStore";

export const UIStore = types
  .model({
    selectedClaim: Claim,
    selectedVendor: Vendor,
  })
  .actions((self) => ({
    update(values: Partial<typeof self>) {
      self = { ...self, ...values };
    },
  }));

export interface IUIStore extends Instance<typeof UIStore> {}
