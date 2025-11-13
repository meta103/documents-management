import type { Document } from "../models/Documents";

export class DocumentCard extends HTMLElement {
  private document: Document | null = null;

  constructor(document?: Document) {
    super();
    if (document) {
      this.document = document;
      this.render();
    }
  }
  /* Lifecycle hook: cuando el elemento se enserte en el DOM */
  connectCallback() {
    this.render();
  }

  setDocument(doc: Document): void {
    this.document = doc;
    this.render();
  }

  /* renderiza el shadow DOM con los estilos encapsulados */
  private render(): void {
    if (!this.document) {
      this.innerHTML = '<p>No document available.</p>';
      return;
    }

    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = this.getTemplate();
    //TODO: agregar estilos
    shadow.appendChild(this.getStyles());
  }

  private getTemplate(): string {
    if (!this.document) return '';

    return `
      <div class="document-card">
        <div class="card-header">
          <h3 class="document-title">${this.document.title}</h3>
          <p class="document-version">Versión: ${this.document.version}</p>
          <p class="document-date">Creado el: ${new Date(this.document.createdAt).toLocaleDateString()}</p>
        </div>
        <div class="card-content">
          <p class="document-date"> <strong>Created: ${this.document.createdAt}</strong></p>
          <div class="document-contributors">
            <ul class="contributors-list">${this.document.contributors.map(contributor => `<li>${contributor}</li>`)}</ul>
          </div>  
          <div class="document-attachments">
            <ul class="attachments-list">${this.document.attachments.map(attachment => `<li>${attachment}</li>`)}</ul>
          </div> 
        </div>
      </div>
    `;
  }

  private getStyles(): HTMLStyleElement {
    const style = document.createElement('style');
    style.textContent = `
      .document-card {
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 16px;
        margin: 8px;
        box-shadow: 2px 2px 6px rgba(0,0,0,0.1);
        font-family: Arial, sans-serif;
      }
      .document-card:hover {
        border-color: #ccccccff;
        box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.1);
        transform: translateY(-2px);
      }
      .card-header {
        border-bottom: 1px solid #eee;
        margin-bottom: 12px;
        padding-bottom: 8px;
      }
      .document-title {
        margin: 0;
        font-size: 1.2em;
      }
      .document-version, .document-date {
        margin: 4px 0;
        color: #666;
        font-size: 0.9em;
      }
      .contributors-list, .attachments-list {
        list-style-type: disc;
        padding-left: 20px;
      }
    `;
    return style;
  }
}
customElements.define('document-card', DocumentCard);