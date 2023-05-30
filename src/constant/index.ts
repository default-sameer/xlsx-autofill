export enum DATA_TYPE {
  text = "text",
  number = "number",
  email = "email",
  date = "date",
  currency = "currency",
  uom = "uom",
  dropdown = "dropdown",
}

export const UOM = [
  "unit/units",
  "unit/dozen",
  "weight/gram",
  "weight/kilogram",
  "weight/tonne",
  "weight/pound",
  "weight/ounce",
  "volume/millilitre",
  "volume/litre",
  "volume/gallon",
  "length/millimetre",
  "length/centimetre",
  "length/metre",
  "length/kilometre",
  "length/inch",
  "length/foot",
  "length/yard",
  "length/mile",
];

export const CURRENCY = ["USD", "GBP", "AUD", "INR"];

export const Pricing = ["Enterprise", "Platinum", "Gold", "Silver"];

export const Options = ["Option 1", "Option 2", "Option 3", "Option 4"];

//Dropdown options with different subtcatagories like if we select weight then we have to show all the options related to weight
export const DROPDOWN_OPTIONS = {
  uom: UOM,
  currency: CURRENCY,
  pricing: Pricing,
  options: Options,
};
