import { RuleTester } from '@typescript-eslint/rule-tester';
import * as parser from '@typescript-eslint/parser';
import { resolve } from "path";

export function createRuleTester({
  filename = resolve("./tests/file.ts"),
  project = resolve("./tests/tsconfig.json"),
}: {
  filename?: string;
  parser?: string;
  project?: string;
} = {}) {
  return function ruleTester({
    comments = false,
    typeScript = true,
    types = true,
  }: {
    comments?: boolean;
    typeScript?: boolean;
    types?: boolean;
  } = {}) {
    const parserOptions = {
      comments,
      ecmaFeatures: { jsx: true },
      ecmaVersion: 2020,
      project: typeScript && types ? project : undefined,
      sourceType: "module",
    } as const;
    const tester = new RuleTester({
      languageOptions: {
        parser: parser,
      },
      ...parserOptions,
    });
    const run = tester.run;
    tester.run = (name: string, rule, { invalid = [], valid = [] }) =>
      run.call(tester, name, rule, {
        invalid: invalid.map((test) => ({ ...test, filename })),
        valid: valid.map((test) =>
          typeof test === "string"
            ? { code: test, filename }
            : { ...test, filename }
        ),
      });
    return tester;
  };
}
