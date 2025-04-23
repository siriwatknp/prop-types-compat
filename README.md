# prop-types-compat

This is a fork of React [prop-types](https://github.com/facebook/prop-types) to fix version compatibility issue.

## Context

The original issue is from [Material UI](https://github.com/mui/material-ui/issues/45432) when using Material UI v6 or v7 with React <= 18.

The issue occur because Material UI has `react-is` v19 as a dependency but the `prop-types` still relies on `react-is` v16.

Since `react-is` v16 and v19 are checking different symbol for React element, the `PropTypes.node` throw an error if `react-is` v19 is picked up.

## Solution

This repo release a package `prop-types-compat` that works with all React versions.

`react-is` is removed from the dependency of this package.

## Usage

```diff
- import PropTypes from 'prop-types';
+ import PropTypes from 'prop-types-compat';
```

All signature remains the same, only 3 methods are updated because they rely on `react-is`:

- `PropTypes.node`
- `PropTypes.element`
- `PropTypes.elementType`
