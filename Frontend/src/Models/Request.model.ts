export interface Request {
  requestId: number;
  userId: number;
  userName: string;
  tableName: string;
  message:string;
  canRead: boolean;
  canWrite: boolean;
  canUpdate: boolean;
  canDelete: boolean;
  requestType: string;
  date: string;
  status: string;
}


