import type { Document } from "./Documents";

//Tipo para las funciones que se suscriben a cambios
type Observer = (documents: Document[]) => void;

export class DocumentsStore {
  private documents: Document[] = [];
  private observers: Observer[] = [];

  /* Suscribe una vista a cambios de documents */
  subscribe(observer: Observer): () => void {
    this.observers.push(observer);
    /* Retorna funcion para desuscribirse  */
    return () => {
      this.observers = this.observers.filter((obs) => obs !== observer);
    }
  }

  /* Notifica a todas las vistas suscritas sobre un cambio en documents */
  private notify(): void {
    for (const observer of this.observers) {
      observer([...this.documents]);
    }
  }

  /* Añade un documento arriba */
  addDocument(documents: Document): void {
    this.documents = [documents, ...this.documents];
    this.notify();
  }

  /* Reemplaza toda la lista de documents */
  setDocuments(documents: Document[]): void {
    this.documents = [...documents];
    this.notify();
  }

  /* Obtiene la lista actual de documentos */
  getDocuments(): Document[] {
    return this.documents;
  }

  /* Borra todos los documentos */
  /* clearDocuments(): void {
    this.documents = [];
    this.notify();
  } */
}