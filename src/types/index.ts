import { DATA_TYPE } from "../constant";

export interface Option {
  value: string;
  label: string;
  hint: string;
}

export type FileInput = {
  headers: Header[];
};

export type Header = {
  name: string | symbol;
  dataType: DATA_TYPE;
  option?: string[];
};

export type getHeader = {
  name: string;
  type: DATA_TYPE;
  options?: string[];
}[];
