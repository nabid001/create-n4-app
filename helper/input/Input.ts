import { text, select, confirm } from "@clack/prompts";
import color from "picocolors";
import figlet from "figlet";
import gradient from "gradient-string";

type InputTypes = {
  projectName: string;
  useAuth: boolean;
  authType?: "Clerk" | "Auth.js";
  authenticationType?: "Credentials" | "OAuth";
  database: boolean;
  selectDatabase?: "MongoDB" | "Drizzle";
  databaseType?: "Neon(PostgreSQL)";
};

async function Input(): Promise<InputTypes> {
  console.clear();
  const banner = figlet.textSync("CREATE N4 APP");
  console.log(gradient.vice.multiline(banner));

  const projectName = String(
    await text({
      message: color.bold("What will your project be called?"),
      validate: (value: string) =>
        value.trim() ? undefined : "Project name cannot be empty",
    })
  );

  const useAuth = Boolean(
    await confirm({
      message: color.bold("Do you want to add Authentication?"),
      initialValue: true,
    })
  );

  let authType;
  let authenticationType;

  if (useAuth) {
    authType = (await select({
      message: color.bold(
        "What authentication provider would you like to use?"
      ),
      options: [
        { value: "Clerk", label: "Clerk" },
        { value: "Auth.js", label: "Auth.js" },
      ],
    })) as "Clerk" | "Auth.js" | undefined;

    if (authType === "Auth.js") {
      authenticationType = (await select({
        message: color.bold(
          "Which authentication method would you like to use?"
        ),
        options: [
          { value: "Credentials", label: "Credentials" },
          { value: "OAuth", label: "OAuth" },
        ],
      })) as "Credentials" | "OAuth" | undefined;
    }
  }

  const database = Boolean(
    await confirm({
      message: color.bold("Would you like to add a Database?"),
      initialValue: true,
    })
  );

  let selectDatabase;
  let databaseType;

  if (database) {
    selectDatabase = (await select({
      message: color.bold("What database ORM would you like to use?"),
      options: [
        { value: "MongoDB", label: "MongoDB" },
        { value: "Drizzle", label: "Drizzle" },
      ],
    })) as "MongoDB" | "Drizzle" | undefined;

    if (selectDatabase === "Drizzle") {
      databaseType = (await select({
        message: color.bold("Which type of database would you like to use?"),
        options: [{ value: "Neon(PostgreSQL)", label: "Neon(PostgreSQL)" }],
      })) as "Neon(PostgreSQL)" | undefined;
    }
  }

  return {
    projectName,
    useAuth,
    authType,
    authenticationType,
    database,
    selectDatabase,
    databaseType,
  };
}

export default Input;
