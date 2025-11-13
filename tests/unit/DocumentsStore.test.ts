import { describe, it, expect } from 'vitest';
import { DocumentsStore } from '../../src/models/DocumentsStore';
import type { Document } from '../../src/models/Documents';

describe('DocumentsStore', () => {
  it('should add a document and notify observers', () => {
    const store = new DocumentsStore();
    let notifications = 0;

    store.subscribe(() => {
      notifications++;
    });

    const doc: Document = {
      id: '1',
      title: 'Test Document',
      version: '1.0',
      contributors: [],
      attachments: [],
      createdAt: new Date().toISOString(),
    };

    store.addDocument(doc);

    expect(notifications).toBe(1);
    expect(store.getDocuments()).toEqual([doc]);
    expect(store.getDocuments()[0].title).toBe('Test Document');
  })
});