// worker.js
importScripts('https://cdn.jsdelivr.net/npm/near-api-js@0.44.2/dist/near-api-js.min.js');

const worker = self;

worker.onmessage = async function(e) {
  const {wallet, contractId, args, method, callType} = e.data;

  try {
    if (callType == "call") {
      const result = wallet.viewMethod({contractId, method, args});
      worker.postMessage(result);
    } else if(callType == "view") {
      const result = wallet.callMethod({contractId, method, args});
      worker.postMessage(result);
    }
  } catch (error) {
    console.error(error);
  }
}
