/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 */

"use strict";

let PropTypes = require("../index");

function resetWarningCache() {
  jest.resetModules();
}

function getPropTypeWarningMessage(propTypes, object, componentName) {
  if (!console.error.calls) {
    spyOn(console, "error");
  } else {
    console.error.calls.reset();
  }
  resetWarningCache();

  PropTypes.checkPropTypes(propTypes, object, "prop", componentName);
  const callCount = console.error.calls.count();
  if (callCount > 1) {
    throw new Error("Too many warnings.");
  }
  const message = console.error.calls.argsFor(0)[0] || null;
  console.error.calls.reset();

  return message;
}

function typeCheckPass(declaration, value) {
  const propTypes = {
    testProp: declaration,
  };
  const props = {
    testProp: value,
  };
  const message = getPropTypeWarningMessage(propTypes, props, "testComponent");
  expect(message).toBe(null);
}

describe("PropTypesDevelopmentReact15", () => {
  beforeEach(() => {
    resetWarningCache();
  });

  describe("React Component Types", () => {
    it("should not warn for React 19 element", () => {
      typeCheckPass(PropTypes.node, {
        $$typeof: Symbol.for("react.transitional.element"),
      });
    });
  });
});
