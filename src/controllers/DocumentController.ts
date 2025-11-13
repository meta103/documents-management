/* Orquestador MVC: connecta StorageEvent, services y views */

import type { DocumentsStore } from "../models/DocumentsStore";
import type { ApiService } from "../services/ApiService";
import type { WebSocketNotificationService, WebSocketService } from "../services/WebSocketService";
import type { Document } from "../models/Documents";
import type { DocumentsGridView } from "../views/DocumentsGridView";

export class DocumentController {
  private documentsStore: DocumentsStore;
  private apiService: ApiService;
  private webSocketService: WebSocketService;
  private gridView: DocumentsGridView;

  constructor(
    documentsStore: DocumentsStore,
    apiService: ApiService,
    webSocketService: WebSocketService,
    gridView: DocumentsGridView
  ) {
    this.documentsStore = documentsStore;
    this.apiService = apiService;
    this.webSocketService = webSocketService;
    this.gridView = gridView;
  }

  async initialize(): Promise<void> {
    try {
      const documents = await this.apiService.getDocuments();
      // Carga inicial de documentos desde API
      this.documentsStore.setDocuments(documents);


      // Suscripción a cambios en el store para actualizar la vista
      this.documentsStore.subscribe((documents: Document[]) => {
        this.gridView.render(documents);
      });

      // Conexión al WebSocket para notificaciones en tiempo real
      try {
        await this.webSocketService.connect();
        //Suscribir a notificaciones:
        this.webSocketService.subscribe((notification: WebSocketNotificationService) => {
          this.handleNewDocumentNotification(notification);
        });
      } catch (error) {
        console.error("WebSocket connection failed:", error);
      }
    } catch (error) {
      console.error("Failed to initialize DocumentController:", error);
    }

  }

  //manejar notificaciones de nuevos documentos
  private handleNewDocumentNotification(notification: WebSocketNotificationService): void {
    const message = `Nuevo documento añadido: ${notification.DocumentTitle} por ${notification.UserName} a las ${notification.Timestamp}`;
    this.showNotification(message);
  }

  //TODO: implementar UI chula
  private showNotification(message: string): void {
    console.log(message);

    /* alert(message); */
  }
}
