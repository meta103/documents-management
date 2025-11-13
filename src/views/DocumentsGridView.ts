import type { Document } from '../models/Documents';

export class DocumentsGridView {
  private root: HTMLElement;
  private gridContainerSelector: string = '#documents-grid';

  constructor(root: HTMLElement) {
    this.root = root;
  }

  render(documents: Document[]): void {
    this.root.innerHTML = ''; // Limpiar contenido previo

    if (documents.length === 0) {
      this.root.innerHTML = '<p>No hay documentos disponibles.</p>';
      return;
    }

    //Grid: 
    const gridContainer = document.createElement('div');
    gridContainer.className = 'documents-grid';

    //Card para cada document
    documents.forEach((doc: Document) => {
      const card = this.createDocumentCard(doc);
      gridContainer.appendChild(card);
    });

    //Insertar en DOM:
    this.root.appendChild(gridContainer);
  }


  //TODO: mover la card a componente a parte??? 
  private createDocumentCard(doc: Document): HTMLElement {
    const card = document.createElement('div');
    card.className = 'document-card';
    card.setAttribute('data-document-id', doc.id);

    const title = document.createElement('h3');
    title.className = 'document-title';
    title.textContent = doc.title;

    const version = document.createElement('p');
    version.className = 'document-version';
    version.textContent = `Versión: ${doc.version}`;

    const createdAt = document.createElement('p');
    createdAt.className = 'document-date';
    createdAt.textContent = `Creado el: ${new Date(doc.createdAt).toLocaleDateString()}`;

    //TODO: contributos y attachments

    card.appendChild(title);
    card.appendChild(version);
    card.appendChild(createdAt);
    return card;
  }
}