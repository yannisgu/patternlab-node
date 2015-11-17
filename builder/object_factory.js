/*
 * patternlab-node - v0.14.0 - 2015
 *
 * Brian Muenzenmeyer, and the web community.
 * Licensed under the MIT license.
 *
 * Many thanks to Brad Frost and Dave Olsen for inspiration, encouragement, and advice.
 *
 */

(function () {
  "use strict";

  var patternEngines = require('./pattern_engines/pattern_engines');
  var path = require('path');

  // oPattern properties

  var oPattern = function(abspath, subdir, filename, data){
    console.log('NEW OPATTERN.  ', 'absPath:', abspath, 'subdir:', subdir, 'filename:', filename, 'data:', data);
    this.fileName = filename.substring(0, filename.indexOf('.'));
    this.fileExtension = path.extname(abspath);
    this.abspath = abspath;
    this.subdir = subdir;
    this.name = subdir.replace(/[\/\\]/g, '-') + '-' + this.fileName; //this is the unique name with the subDir
    this.jsonFileData = data || {};
    this.patternName = this.fileName.replace(/^\d*\-/, '');
    this.patternDisplayName = this.patternName.split('-').reduce(function(val, working){
      return val.charAt(0).toUpperCase() + val.slice(1) + ' ' + working.charAt(0).toUpperCase() + working.slice(1);
    }, '').trim(); //this is the display name for the ui. strip numeric + hyphen prefixes
    this.patternLink = this.name + '/' + this.name + '.html';
    this.patternGroup = this.name.substring(this.name.indexOf('-') + 1, this.name.indexOf('-', 4) + 1 - this.name.indexOf('-') + 1);
    this.patternSubGroup = subdir.substring(subdir.indexOf('/') + 4);
    this.flatPatternPath = subdir.replace(/[\/\\]/g, '-');
    this.key = this.patternGroup + '-' + this.patternName;
    this.template = '';
    this.patternPartial = '';
    this.lineage = [];
    this.lineageIndex = [];
    this.lineageR = [];
    this.lineageRIndex = [];
    this.isPseudoPattern = false;
    this.engine = patternEngines.getEngineForPattern(this);
  };

  // oPattern methods

  // render method on oPatterns; this acts as a proxy for the PatternEngine's
  // render function
  oPattern.prototype.render = function (data, partials) {
    if (this.isPseudoPattern) {
      console.log(this.name + ' is a pseudo-pattern');
    } else {
      console.log('this is NOT a pseudo-pattern');
    }
    // console.log('this does ' + (this.template ? '' : 'NOT ') + 'have template');
    // console.log('this does ' + (this.extendedTemplate ? '' : 'NOT ') + 'have extendedTemplate');

    return this.engine.renderPattern(this.extendedTemplate, data, partials);
  };

  var oBucket = function(name){
    this.bucketNameLC = name;
    this.bucketNameUC = name.split('-').reduce(function(val, working){
      return val.charAt(0).toUpperCase() + val.slice(1) + ' ' + working.charAt(0).toUpperCase() + working.slice(1);
    }, '').trim();
    this.navItems = [];
    this.navItemsIndex = [];
    this.patternItems = [];
    this.patternItemsIndex = [];
  };


  var oNavItem = function(name){
    this.sectionNameLC = name;
    this.sectionNameUC = name.split('-').reduce(function(val, working){
      return val.charAt(0).toUpperCase() + val.slice(1) + ' ' + working.charAt(0).toUpperCase() + working.slice(1);
    }, '').trim();
    this.navSubItems = [];
    this.navSubItemsIndex = [];
  };


  var oNavSubItem = function(name){
    this.patternPath = '';
    this.patternPartial = '';
    this.patternName = name.split(' ').reduce(function(val, working){
      return val.charAt(0).toUpperCase() + val.slice(1) + ' ' + working.charAt(0).toUpperCase() + working.slice(1);
    }, '').trim();
  };


  module.exports = {
    oPattern: oPattern,
    oBucket: oBucket,
    oNavItem: oNavItem,
    oNavSubItem: oNavSubItem
  };

}());
