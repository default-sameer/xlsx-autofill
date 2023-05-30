import { intro, outro, select, text } from "@clack/prompts";
import { DATA_TYPE } from "./constant";
import { generateXLSXFile } from "./utils/generateXlsx";
import { FileInput } from "./types";
import { askNumRows, getHeaders } from "./utils/getheaders";

import pc from "picocolors";

async function run() {
  intro(
    pc.green(
      "Welcome, Add Product or Service Configuration to generate xlsx file"
    )
  );

  const option = await select({
    message: "Choose an option",
    options: [
      {
        value: "Product",
        label: "Product",
        hint: "Generate a product xlsx file.",
      },
      {
        value: "Service",
        label: "Service",
        hint: "Create a service xlsx file.",
      },
    ],
  });

  if (option === "Product") {
    const headers = await getHeaders();
    const number = await askNumRows();
    const input: FileInput = {
      headers: headers.map((header) => ({
        name: header.name,
        dataType: header.type as DATA_TYPE,
      })),
    };
    await generateXLSXFile(input, "Product", number);
  } else if (option === "Service") {
    const headers = await getHeaders();
    const number = await askNumRows();
    const input: FileInput = {
      headers: headers.map((header) => ({
        name: header.name,
        dataType: header.type as DATA_TYPE,
        option: header?.options,
      })),
    };
    await generateXLSXFile(input, "Service", number);
  }

  outro("Configuration completed.");
}

run().catch((error) => {
  console.error(pc.red(error));
  process.exit(1);
});
