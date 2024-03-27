export interface notifyResponse {
  alertId: number;
  toId: number;
  fromId: number;
  content: string | null;
  diaryId: number;
  type: string | null;
  url: string;
}
