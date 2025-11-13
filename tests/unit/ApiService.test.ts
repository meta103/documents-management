import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApiService } from '../../src/services/ApiService';
import type { Document } from '../../src/models/Documents';

describe('ApiService', () => {
  let apiService: ApiService;

  beforeEach(() => {
    apiService = new ApiService();
  });

  it('get documents from server', async () => {
    globalThis.fetch = vi.fn(() => {
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve([
          {
            id: '1',
            title: 'Document 1',
            version: '1.0',
            contributors: [],
            attachments: [],
            createdAt: new Date().toISOString(),
          },
          {
            id: '2',
            title: 'Document 2',
            version: '1.0',
            contributors: [],
            attachments: [],
            createdAt: new Date().toISOString(),
          }
        ]),
      } as Response)
    });

    const docs: Document[] = await apiService.getDocuments();
    expect(docs.length).toBe(2);
    expect(docs[0].title).toBe('Document 1');
    expect(globalThis.fetch).toHaveBeenCalledWith('http://localhost:8080/documents');
  });
});