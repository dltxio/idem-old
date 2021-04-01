import { types, Instance, flow } from "mobx-state-tree";
import { AssetType, fetchAssets } from "../helpers/assets";

export const Claim = types
  .model({
    key: types.identifier,
    type: types.string,
    description: types.string,
    value: types.maybe(types.string),
    verifiedBy: types.array(types.string),
  })
  .actions((self) => ({
    setValue(value: any) {
      self.value = value;
    },
  }));
export interface IClaim extends Instance<typeof Claim> {}

export const Vendor = types.model({
  // TODO: make this non optional once vendor keys exist
  key: types.optional(
    types.identifier,
    `${Math.floor(Math.random() * 100000)}`,
  ),
  url: types.string,
  name: types.string,
  description: types.string,
  registration: types.string,
  affiliation: types.maybe(types.string),
});

export const AssetStore = types
  .model({
    claims: types.array(Claim),
    vendors: types.array(Vendor),
  })
  .volatile((self) => ({
    selectedClaimKey: "",
    selectedVendorKey: "",
  }))
  .views((self) => ({
    get selectedClaim() {
      return self.claims.find((claim) => claim.key === self.selectedClaimKey);
    },
    get selectedVendor() {
      return self.vendors.find(
        (vendor) => vendor.key === self.selectedVendorKey,
      );
    },
    get selectedVendorClaims() {
      return self.claims.filter((claim) =>
        claim.verifiedBy.includes(self.selectedVendorKey),
      );
    },
  }))
  .actions((self) => ({
    setClaimKey: (key: string) => {
      self.selectedClaimKey = key;
    },
    setVendorKey: (key: string) => {
      self.selectedVendorKey = key;
    },
    loadClaims: flow(function* () {
      self.claims = yield fetchAssets(AssetType.Claims);
    }),
    loadVendors: flow(function* () {
      const vendors = yield fetchAssets(AssetType.Vendors);
      self.vendors = vendors;
    }),
  }));
