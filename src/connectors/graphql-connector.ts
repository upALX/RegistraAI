import { DocumentNode } from "@apollo/client";
import client from "../apolloClient";

type OperationType = "query" | "mutation";

export const graphqlRequest = async (
  operation: OperationType,
  document: DocumentNode,
  variables?: Record<string, unknown>
) => {
  try {
    const response = await (operation === "mutation"
      ? client.mutate({ mutation: document, variables })
      : client.query({ query: document, variables }));
    return response.data;
  } catch (error) {
    console.error(`Error during ${operation}:`, error);
    throw error;
  }
};
