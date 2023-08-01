import { FileInput } from "../types";
import { Workbook, Worksheet } from "exceljs";
import { v4 as uuidv4 } from "uuid";
import { Header } from "../types";
import { CURRENCY, DATA_TYPE, UOM } from "../constant";
import { cars, randomDate } from "./data";

export function generateString(length: number) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const getRandomValue = (index: number, values: any[]) => {
  return values[Math.floor(index % values.length)];
};

export const generateXLSXFile = async (
  input: FileInput,
  name: string,
  numberOfRows: number
) => {
  const workbook: Workbook = new Workbook();
  const worksheet: Worksheet = workbook.addWorksheet("sheet1");

  const columnsHeader: { key: string; header: string }[] = [];
  const finalData: { [key: string]: any }[] = [];

  input.headers.forEach((item) => {
    const name: string = item.name as string;
    columnsHeader.push({
      key: name,
      header: name,
    });
  });

  worksheet.columns = columnsHeader;

  for (let i = 1; i <= numberOfRows; i++) {
    const tempData: { [key: string]: any } = {};
    input.headers.forEach((item) => {
      const key = item.name.toString();
      tempData[key] = getValues(i, item, item.option || []);
    });
    finalData.push(tempData);
  }

  finalData.forEach((item) => {
    worksheet.addRow(item);
  });

  await workbook.xlsx.writeFile(`./public/files/${name}-${uuidv4()}.xlsx`);
};

export const getValues = (index: number, header: Header, option: string[]) => {
  switch (header.dataType) {
    case DATA_TYPE.text:
      return getRandomValue(index, cars);
    case DATA_TYPE.number:
      return Math.floor(Math.random() * 100) + 1;
    case DATA_TYPE.dropdown:
      if (option && option.length > 0) {
        return getRandomValue(index, option);
      }
      break;
    case DATA_TYPE.date:
      return randomDate();
    case DATA_TYPE.email:
      return `${generateString(10)}@sameer.com`;
    case DATA_TYPE.currency:
      return getRandomValue(index, CURRENCY);
    case DATA_TYPE.uom:
      return getRandomValue(index, UOM);
    default:
      break;
  }
};
