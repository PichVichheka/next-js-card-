import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {UAParser} from "ua-parser-js";
import Fingerprintjs from "@fingerprintjs/fingerprintjs";
import { browser } from "process";

type DeviceStore = {
  device_name: string;
  device_type: string;
  ip_address: string;
  browser: string;
  fingerprint: string;
};

type DeviceState = {
  deviceId: DeviceStore | null;
  fetchDeviceInfo: () => void;
}
export const useDeviceStore = create<DeviceState>()(
  devtools((set) => ({
    deviceId: null,
    fetchDeviceInfo: async () => {
      const parser = new UAParser();
      const result = parser.getResult();
      
      // Fetch IP address using FingerprintJS
      const fp = await Fingerprintjs.load();
      const fingerprintjsResult = await fp.get();

     
     //fetch ip
     let ip_address:string | null = null;
     try {
       const response = await fetch('https://api.ipify.org?format=json');
       const data = await response.json();
       ip_address = data.ip;
     } catch (error) {
       console.error(error);
     }

     const deviceId = {
       browser: result.browser.name || "Unknown",
       os: result.os.name || "Unknown",
       device_name: result.device.vendor || "Unknown",
       device_type: result.device.model || "Unknown",
       ip_address: ip_address || "Unknown",
       fingerprint: fingerprintjsResult.visitorId,
     };

     set({ deviceId });
   },
    })), 
);          