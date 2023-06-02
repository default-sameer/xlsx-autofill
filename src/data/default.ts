import { DATA_TYPE } from "../constant";

export const DEFAULT_PRODUCT_DATA = [
  {
    name: "MANUFACTURER NAME",
    type: DATA_TYPE.text,
  },
  {
    name: "MANUFACTURER SKU",
    type: DATA_TYPE.text,
  },
  {
    name: "DESCRIPTION",
    type: DATA_TYPE.text,
  },
  {
    name: "UNIT OF MEASURE",
    type: DATA_TYPE.uom,
  },
  {
    name: "UOM QUANTITY",
    type: DATA_TYPE.number,
  },
  {
    name: "ORDER QUANTITY",
    type: DATA_TYPE.number,
  },
];

export const DEFAULT_SERVICE_DATA = [
  {
    name: "SKU",
    type: DATA_TYPE.text,
  },
  {
    name: "DESCRIPTION",
    type: DATA_TYPE.text,
  },
];
