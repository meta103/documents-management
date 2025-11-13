export interface Contributor {
  ID: string;
  Name: string;
}

export interface Document {
  id: string;
  title: string;
  version: string;
  contributors: string[];
  attachments: string[];
  createdAt: string;
}

export interface DocumentRaw {
  ID: string;
  CreatedAt: string;
  UpdatedAt: string;
  Title: string;
  Attachments: string[];
  Contributors: Contributor[];
  Version: string;
}