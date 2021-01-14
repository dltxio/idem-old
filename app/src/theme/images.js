import { Asset } from "expo-asset";
import LogoSvg from "../../assets/images/logo.svg";
import LogoPng from "../../assets/images/logo.png";

export const svgs = {
  logo: LogoSvg,
};

export const images = {
  logo: LogoPng,
};

// Asset preloading.
export const imageAssets = Object.keys(images).map((key) =>
  Asset.fromModule(images[key]).downloadAsync()
);
