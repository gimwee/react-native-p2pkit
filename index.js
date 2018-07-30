/**
 * @providesModule P2PKit
 * @flow
 */
'use strict';

import {
  NativeModules,
  NativeEventEmitter,
 } from 'react-native';

const { PPKReactBridge } = NativeModules;
const p2pkitCallbackEmitter = new NativeEventEmitter(PPKReactBridge);

export default class P2PKit {

	static LOW_POWER = 'LOW_POWER';
	static HIGH_PERFORMANCE = 'HIGH_PERFORMANCE';
	static p2pkitCallbackHandler_;
	

	static subscription = p2pkitCallbackEmitter.addListener(
		'callback',
		(nativeCallback) => {
			if(P2PKit.p2pkitCallbackHandler_[nativeCallback.methodName]) {
				P2PKit.p2pkitCallbackHandler_[nativeCallback.methodName](nativeCallback.parms);
			}
		}
	) 

  	static enable(appkey, p2pkitCallbackHandler){

		if(!p2pkitCallbackHandler){
        throw 'You must enable p2pkit with appropriate callbacks';
    }

    P2PKit.p2pkitCallbackHandler_ = p2pkitCallbackHandler;

    	PPKReactBridge.enable(appkey);
    }

	static disable(){
      	PPKReactBridge.disable();
    }

	static getMyPeerId(){
      	PPKReactBridge.getMyPeerId();
    }

	static startDiscovery(discoveryInfo, discoveryPowerMode){
      	PPKReactBridge.startDiscovery(discoveryInfo, {discoveryPowerMode: discoveryPowerMode});
    }

	static stopDiscovery(){
      	PPKReactBridge.stopDiscovery();
    }

	static enableProximityRanging(){
      	PPKReactBridge.enableProximityRanging();
    }

	static pushNewDiscoveryInfo(discoveryInfo){
      	PPKReactBridge.pushNewDiscoveryInfo(discoveryInfo);
    }
    
	static getDiscoveryPowerMode() {
      	PPKReactBridge.getDiscoveryPowerMode();
	}
    
	static setDiscoveryPowerMode(discoveryPowerMode) {
      	PPKReactBridge.setDiscoveryPowerMode(discoveryPowerMode);
	}

};
