'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var LOBs = new Module('lobs');

/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
LOBs.register(function(app, auth, database) {

  //We enable routing. By default the Package Object is passed to the routes
  LOBs.routes(app, auth, database);

  //We are adding a link to the main menu for all authenticated users
  LOBs.menus.add({
    'roles': ['authenticated'],
    'title': 'LOBs',
    'link': 'all lobs'
  });
  // LOBs.menus.add({
  //   'roles': ['authenticated'],
  //   'title': 'Create New LOB',
  //   'link': 'create lob'
  // });

  //LOBs.aggregateAsset('js','/packages/system/public/services/menus.js', {group:'footer', absolute:true, weight:-9999});
  //LOBs.aggregateAsset('js', 'test.js', {group: 'footer', weight: -1});

  /*
    //Uncomment to use. Requires meanio@0.3.7 or above
    // Save settings with callback
    // Use this for saving data from administration pages
    LOBs.settings({'someSetting':'some value'},function (err, settings) {
      //you now have the settings object
    });

    // Another save settings example this time with no callback
    // This writes over the last settings.
    LOBs.settings({'anotherSettings':'some value'});

    // Get settings. Retrieves latest saved settings
    LOBs.settings(function (err, settings) {
      //you now have the settings object
    });
    */
  LOBs.aggregateAsset('css', 'lobs.css');

  return LOBs;
});
