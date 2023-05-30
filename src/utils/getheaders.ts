import { select, text } from "@clack/prompts";
import { DATA_TYPE } from "../constant";
import pc from "picocolors";
import { getHeader } from "../types";

export const getHeaders = async () => {
  const headers: getHeader = [];

  while (true) {
    const headerName = (await text({
      message: "Enter a header name:",
      validate: (input) => {
        if (input.trim() === "") {
          return pc.red("Header name cannot be empty.");
        }
        const formattedInput = input.trim().toUpperCase();
        if (
          headers.some((header) => header.name.toUpperCase() === formattedInput)
        ) {
          return pc.red("Header name already exists.");
        }

        // const words = formattedInput.split(/\s+/);
        // if (words.length !== input.trim().split(/\s+/).length) {
        //   return pc.yellow("Only one space allowed between each word.");
        // }
        // return "";
      },
    })) as string;

    if (headerName && headerName.trim() === "") {
      break;
    }
    const headerType = (await select({
      message: "Choose a header type:",
      options: Object.keys(DATA_TYPE).map((key) => ({
        value: DATA_TYPE[key as keyof typeof DATA_TYPE],
        label: key.toUpperCase(),
      })),
    })) as DATA_TYPE;

    if (headerType === DATA_TYPE.dropdown) {
      const dropdownOptions = (await text({
        message: "Enter dropdown options separated by commas:",
        validate: (input) => {
          const options = input.trim().split(",");
          if (options.some((option) => option.trim() === "")) {
            return pc.red("Dropdown options cannot be empty.");
          }
          if (new Set(options).size !== options.length) {
            return pc.red("Dropdown options cannot be the same.");
          }
          return "";
        },
      })) as string;

      const options = dropdownOptions.split(",").map((option) => option.trim());
      headers.push({ name: headerName, type: headerType, options });
    } else {
      headers.push({ name: headerName, type: headerType });
    }

    const addAnother = await select({
      message: "Do you want to add another header?",
      options: [
        {
          value: "Yes",
          label: "Yes",
          hint: "Add another header.",
        },
        {
          value: "No",
          label: "No",
          hint: "Finish adding headers.",
        },
      ],
    });

    if (addAnother === "No") {
      break;
    }
  }

  return headers;
};

export const askNumRows = async () => {
  const response = await text({
    message: "Enter the number of rows to populate!",
    validate: (input) => {
      if (!/^\d+$/.test(input)) {
        return "Please enter a valid number.";
      }
      const num = parseInt(input);
      if (isNaN(num) || num <= 0) {
        return "Please enter a valid number greater than zero.";
      }
      return "";
    },
  });
  return parseInt(response! as string);
};
