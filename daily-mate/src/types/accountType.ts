export interface accountByMonthResponse {
  totalInput: number | null;
  totalOutput: number | null;
  inputs: (number | null)[];
  outputs: (number | null)[];
}
