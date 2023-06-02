import { select, text, isCancel, cancel } from "@clack/prompts";
import { DATA_TYPE } from "../constant";
import pc from "picocolors";
import { getHeader } from "../types";
import { DEFAULT_PRODUCT_DATA, DEFAULT_SERVICE_DATA } from "../data/default";

export const getHeaders = async (option: string) => {
  const headers: getHeader = [];

  const addDefaultHeaders = await select({
    message: `Do you want to include ${pc.italic(
      pc.yellow("default")
    )} headers?`,
    options: [
      {
        value: "Yes",
        label: "Yes",
        hint: "Include default headers.",
      },
      {
        value: "No",
        label: "No",
        hint: "Do not include default headers.",
      },
    ],
  });
  if (isCancel(addDefaultHeaders)) {
    return cancel(pc.red("Operation Cancelled"));
  }

  if (addDefaultHeaders === "Yes") {
    switch (option) {
      case "Product":
        headers.push(...DEFAULT_PRODUCT_DATA);
        break;
      case "Service":
        headers.push(...DEFAULT_SERVICE_DATA);
        break;
      default:
        break;
    }
    const addHeader = await select({
      message: `Do you want to add ${pc.italic(
        pc.yellow("additional")
      )} headers?`,
      options: [
        {
          value: "Yes",
          label: "Yes",
          hint: "Add a header.",
        },
        {
          value: "No",
          label: "No",
          hint: "Finish adding headers.",
        },
      ],
    });

    if (addHeader === "No") {
      return headers;
    }
    if (isCancel(addHeader)) {
      return cancel(pc.red("Operation Cancelled"));
    }
  }

  while (true) {
    const headerName = (await text({
      message: "Enter a header name:",
      validate: (input) => {
        if (isCancel(input)) {
          cancel("Operation cancelled.");
          process.exit(0);
        }
        if (input.trim() === "") {
          return pc.red("Header name cannot be empty.");
        }
        const formattedInput = input.trim().toUpperCase();
        if (
          headers.some((header) => header.name.toUpperCase() === formattedInput)
        ) {
          return pc.red("Header name already exists.");
        }
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

    const hasDuplicateValues = (arr: string[]) => {
      const lowerCaseOptions = arr.map((option) =>
        option.toLowerCase().replace(/\s{2,}/g, " ")
      );
      const uniqueOptions = new Set(lowerCaseOptions);
      return lowerCaseOptions.length !== uniqueOptions.size;
    };

    if (headerType === DATA_TYPE.dropdown) {
      const dropdownOptions = (await text({
        message: "Enter dropdown options separated by commas:",
        validate: (input) => {
          const options = input.trim().split(",");
          if (options.some((option) => option.trim() === "")) {
            return pc.red("Dropdown options cannot be empty.");
          }
          if (hasDuplicateValues(options)) {
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
      if (num > 10000) {
        return (
          pc.yellow("Warning: ") + "Currently only supports up to 10,000 rows."
        );
      }
      return "";
    },
  });
  return parseInt(response! as string);
};
