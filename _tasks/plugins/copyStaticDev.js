/**
 * Created by js5323 on 18/5/08.
 */
var util = require('./../lib/util');

module.exports = function(){
  util.exists('./static','./dev', util.copy)
}