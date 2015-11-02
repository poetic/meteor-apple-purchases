IAP = { isLoading: false, };

IAP.registerProducts = function(products){
  IAP.list = [];
  products.forEach( function(product){
    if(typeof(product) === 'string'){
      IAP.list.push(product);
    }
  });
};

IAP.onLoad = function(callback){
  IAP.onLoaded = callback;
};

IAP.registerBuyCallback = function(callback){
  IAP.buyCallback = callback;
};

IAP.load = function () {
  // Check availability of the storekit plugin
  if (!window.storekit) {
    console.log("In-App Purchases not available");
    return;
  }

  // Make sure its not already loading or calling this function would cause an
  // objective C null referenced object error
  if(IAP.isLoading) { return; }

  IAP.isLoading = true;
  // Initialize
  storekit.init({
    debug:    true, // Enable IAP messages on the console
    ready:    IAP.onReady,
    purchase: IAP.onPurchase,
    restore:  IAP.onRestore,
    error:    IAP.onError
  });
};

IAP.onReady = function () {
    // Once setup is done, load all product data.
  storekit.load(IAP.list, function (products, invalidIds) {
    IAP.products = products;
    IAP.loaded = true;
    IAP.isLoading = false;
    for (var i = 0; i < invalidIds.length; ++i) {
      console.log("Error: could not load " + invalidIds[i]);
    }
    if(typeof(IAP.onLoaded) === 'function'){
      IAP.onLoaded(products, invalidIds);
    } else {
      console.warn('you did not Pass a onLoaded function which is ok your products are available under IAP.products');
    }
  });
};

IAP.onPurchase = function (transactionId, productId, receipt) {
  if(typeof(IAP.buyCallback) === 'function'){
    IAP.buyCallback(transactionId, productId, receipt);
  } else {
    console.warn('You have not registered a on buy callback if you want to process reciepts please do so with IAP.registerBuyCallback(myCallback)');
  }
};

IAP.onError = function (errorCode, errorMessage) {
  alert('Error: ' + errorMessage);
};

IAP.onRestore = function () {};

IAP.onError = function (err) {
  console.log('an error occured in IAP', err);
};

IAP.buy = function (productId) {
  storekit.purchase(productId);
};
