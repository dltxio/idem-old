import { types, Instance, flow } from "mobx-state-tree";
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
    loadClaims: flow(function* () {
      const claims = yield fetchAssets(AssetType.Claims);
      self.claims = claims;
    }),
    loadVendors: flow(function* () {
      const vendors = yield fetchAssets(AssetType.Vendors);
      self.vendors = vendors;
    }),
  }));
