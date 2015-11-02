# meteor-apple-purchases
A boilerplate of the code required to setup apple purchasing inside your app.  This is a wrapper for the javascript code required in order to make an apple store in app purchase.  There are many steps outside of this repo for setting up the products for your app.

# helpful links
[Apple store docs](https://developer.apple.com/in-app-purchase/)

# Trouble Shooting

There are MANY things you have to have working before your products array will work so I decided to include a list for those who get stuck.

* Checklist
  1. Create a unique App ID
  2. Enable in-app purchasing for this App ID
  3. Generate and install a new provisioning profile on your device
  4. Update the bundle ID and code signing profile in Xcode
  5. Check that your project’s .plist Bundle ID match your App ID
  6. Complete your contract, tax, and banking Information. You need a VALID contract

If you miss ANY of these steps then your products array will come back empty please ensure all valid settings are correct before reporting any issues.

# Installation

Add the cordova plugin
`meteor add cordova:cc.fovea.cordova.purchase@https://github.com/j3k0/cordova-plugin-purchase.git#3bd13373f6dd0d54128554a8458b4043fbefe45f`

Add the meteor package
`meteor add poetic:meteor-apple-purchasing`

# Usage

Using the IAP interface is fairly simple once all the steps apple requires are completed.

Workflow looks like:
Register Products -> Register Callbacks -> Load -> Buy -> Cash Those Paychecks $$$

A very simple example would be using a template events and onRendered functions to accomplish this workflow.  If you have more than one template using the products then you should probably use Meteor.startup to register and load.  

A sample using Meteor's boilerplate.  

HTML

```
<head>
  <title>In App Purchase Test</title>
</head>

<body>
  <h1>Welcome to In App Purchase!</h1>

  {{> hello}}
</body>

<template name="hello">
  <button class='purchase'>Try Buy</button>
</template>
```

JS

```
Template.hello.events({
  'click .purchase': function (e) {
    IAP.buy(IAP.products[0].id);
  }
});

Template.hello.onRendered( function(){
  IAP.registerProducts(['product1', 'product2']);
  IAP.onLoad(checkProducts);
  IAP.load();
});

function checkProducts(products, invalid){
  console.log('valid products:', products);
  console.log('invalid products:', invalid);
}
```

# After purchase

In some cases you may want to run a function after a purchase was successful such as unlocking features are changing the user's account settings.  In this case you need to register a `IAP.buyCallback` as well.

your callback function passed should expect 3 arguments `transactionId, productId, receipt`
```
IAP.buyCallback( function(transactionId, productId, receipt){
  switch(productId){
    case 'product1': unlockFeatures('product1'); break;
    case 'product2': addCoins('100'); break;
    default: console.warn('a productId was passed that you did not handle');
  }
});
```
