/* Orquestador MVC: connecta StorageEvent, services y views */

import { DocumentMapper } from "../models/DocumentMapper";
import type { Document } from "../models/Documents";
import type { DocumentsStore } from "../models/DocumentsStore";
import type { ApiService } from "../services/ApiService";
import type { WebSocketNotificationService, WebSocketService } from "../services/WebSocketService";
import type { DocumentsGridView } from "../views/DocumentsGridView";
import { NotificationView } from '../views/NotificationView';

export class DocumentController {
  private documentsStore: DocumentsStore;
  private apiService: ApiService;
  private webSocketService: WebSocketService;
  private gridView: DocumentsGridView;
  private notificationView: NotificationView

  constructor(
    documentsStore: DocumentsStore,
    apiService: ApiService,
    webSocketService: WebSocketService,
    gridView: DocumentsGridView,
    notificationView: NotificationView
  ) {
    this.documentsStore = documentsStore;
    this.apiService = apiService;
    this.webSocketService = webSocketService;
    this.gridView = gridView;
    this.notificationView = notificationView;
  }

  async initialize(): Promise<void> {
    try {
      const rawDocuments = await this.apiService.getDocuments();

      //Mapeo para formatear
      const documents: Document[] = DocumentMapper.toDomainArray(rawDocuments);
      // Suscripción a cambios en el store para actualizar la vista
      this.documentsStore.subscribe((documents: Document[]) => {
        this.gridView.render(documents);
      });

      // Carga inicial de documentos desde API
      this.documentsStore.setDocuments(documents.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));

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
    const message = `Nuevo documento: ${notification.DocumentTitle} por ${notification.UserName}`;

    this.notificationView.info(message, 6000);
  }

}
