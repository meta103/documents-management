import { DocumentController } from "./controllers/DocumentController";
import { DocumentsStore } from "./models/DocumentsStore";
import { ApiService } from "./services/ApiService";
import { WebSocketService } from "./services/WebSocketService";
import { DocumentsGridView } from "./views/DocumentsGridView";
import { NotificationView } from "./views/NotificationView";

export class App {
  private rootElement: HTMLElement;
  private apiService: ApiService;
  private webSocketService: WebSocketService;
  private documentsStore: DocumentsStore;
  private documentsController: DocumentController;
  private notificationView: NotificationView;

  constructor(rootElement: HTMLElement) {
    this.rootElement = rootElement;
    //Iniciar services
    this.apiService = new ApiService();
    this.webSocketService = new WebSocketService();
    //Iniciar modelo (store con patron Observer)
    this.documentsStore = new DocumentsStore();
    //Iniciar vista
    const gridView = new DocumentsGridView(this.rootElement);
    this.notificationView = new NotificationView();

    //Iniciar controlador
    this.documentsController = new DocumentController(
      this.documentsStore,
      this.apiService,
      this.webSocketService,
      gridView,
      this.notificationView,
    );
  }

  async initialize(): Promise<void> {
    try {
      //Inicializa el controlador, que hace todo lo demas.
      await this.documentsController.initialize();
    } catch (error) {
      console.error("Failed to initialize app:", error);
      throw error;
    }
  }
}