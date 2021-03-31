import { types, Instance, flow } from "mobx-state-tree";
import { AssetType, fetchAssets } from "../helpers/assets";

export const Claim = types
  .model({
    key: types.identifier,
    type: types.string,
    description: types.string,
  })
  .actions((self) => ({
    update(values: Partial<typeof self>) {
      self = { ...self, ...values };
    },
  }));
export interface IClaim extends Instance<typeof Claim> {}

export const Vendor = types
  .model({
    key: types.identifier,
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
  .volatile((self) => ({
    selectedClaimKey: "",
  }))
  .views((self) => ({
    get selectedClaim() {
      return self.claims.find((claim) => claim.key === self.selectedClaimKey);
    },
  }))
  .actions((self) => ({
    setClaimKey: (key: string) => {
      self.selectedClaimKey = key;
    },
    loadClaims: flow(function* () {
      self.claims = yield fetchAssets(AssetType.Claims);
    }),
    loadVendors: flow(function* () {
      const vendors = yield fetchAssets(AssetType.Vendors);
      self.vendors = vendors;
    }),
  }));
