/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== "production") {
  function isElement(object) {
    return (
      "object" === typeof object &&
      null !== object &&
      (object.$$typeof === Symbol.for("react.element") || // React <= 18
        object.$$typeof === Symbol.for("react.transitional.element")) // React 19+
    );
  }

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = require("./factoryWithTypeCheckers")(
    isElement,
    throwOnDirectAccess
  );
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = require("./factoryWithThrowingShims")();
}
