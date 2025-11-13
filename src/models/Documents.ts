export interface Contributor {
  id: string;
  name: string;
}

export interface Attachment {
  name: string;
}

export interface Document {
  id: string;
  title: string;
  version: string;
  contributors: Contributor[];
  attachments: Attachment[];
  createdAt: string;
}