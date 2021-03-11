import { types, Instance } from "mobx-state-tree";
import { AssetType, fetchAssets } from "../helpers/assets";

export const Claim = types
  .model({
    type: types.string,
    description: types.string,
  })
  .actions((self) => ({
    update(values: Partial<typeof self>) {
      self = { ...self, ...values };
    },
  }));
export interface iClaim extends Instance<typeof Claim> {}

export const Vendor = types
  .model({
    url: types.string,
    name: types.string,
    description: types.string,
  })
  .actions((self) => ({
    update(values: Partial<typeof self>) {
      self = { ...self, ...values };
    },
  }));

export const AssetStore = types
  .model({
    claims: types.array(Claim),
    vendors: types.array(Vendor),
  })
  .actions((self) => ({
    loadClaims: async () => {
      const claims = await fetchAssets(AssetType.Claims);
      self.claims = claims;
    },
    loadVendors: async () => {
      const vendors = await fetchAssets(AssetType.Vendors);
      self.vendors = vendors;
    },
  }));
