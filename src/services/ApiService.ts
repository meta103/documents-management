import type { Document } from "../models/Documents";

const API_URL = "http://localhost:8080";

export class ApiService {
  async getDocuments(): Promise<Document[]> {
    try {
      const response = await fetch(`${API_URL}/documents`);
      return response.json();
    } catch (error) {
      console.error("Failed to get documents:", error);
      throw new Error("Network error while fetching documents");
    }
  }
}