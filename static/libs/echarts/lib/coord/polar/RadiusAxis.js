var zrUtil = require("zrender/lib/core/util");

var Axis = require("../Axis");

function RadiusAxis(scale, radiusExtent) {
  Axis.call(this, 'radius', scale, radiusExtent);
  /**
   * Axis type
   *  - 'category'
   *  - 'value'
   *  - 'time'
   *  - 'log'
   * @type {string}
   */

  this.type = 'category';
}

RadiusAxis.prototype = {
  constructor: RadiusAxis,

  /**
   * @override
   */
  pointToData: function (point, clamp) {
    return this.polar.pointToData(point, clamp)[this.dim === 'radius' ? 0 : 1];
  },
  dataToRadius: Axis.prototype.dataToCoord,
  radiusToData: Axis.prototype.coordToData
};
zrUtil.inherits(RadiusAxis, Axis);
var _default = RadiusAxis;
module.exports = _default;