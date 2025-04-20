import { TSESTree as es } from "@typescript-eslint/utils";

export function getParent(node: es.Node): es.Node | undefined {
  return (node as any).parent;
}
