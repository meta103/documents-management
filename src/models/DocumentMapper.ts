import type { DocumentRaw, Document } from "./Documents";

export class DocumentMapper {
  static toDomain({ ID, Title, Version, Contributors, Attachments, CreatedAt }: DocumentRaw): Document {
    return {
      id: ID,
      title: Title,
      version: Version,
      contributors: Contributors.map(contributor => contributor.Name),
      attachments: Attachments,
      createdAt: new Date(CreatedAt).toISOString(),
    }
  }

  static toDomainArray(rawDocuments: DocumentRaw[]): Document[] {
    return rawDocuments.map(this.toDomain);
  }
};