export interface HttpResponse {
    statusCode?: number;
    path: string;
    status?: string;
    message?: string;
    developerMessage?: string;
    timeStamp?: Date;
    data?: any;
  }