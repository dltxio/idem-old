import { types, Instance } from "mobx-state-tree";
import { Claim, Vendor } from "./assetStore";

export const UIStore = types
  .model({
    selectedClaim: types.maybe(Claim),
    selectedVendor: types.maybe(Vendor),
  })
  .actions((self) => ({
    update(values: Partial<typeof self>) {
      self = { ...self, ...values };
    },
  }));

export interface IUIStore extends Instance<typeof UIStore> {}
