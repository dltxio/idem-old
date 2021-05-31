import React from "react";
import SvgQRCode from 'react-native-qrcode-svg';

const Qrcode = () => {
    
  return (
    <SvgQRCode value="https//google.com/{user name}" />
  );
};

export default Qrcode;
