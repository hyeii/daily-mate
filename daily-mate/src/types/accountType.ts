export interface accountByMonthResponse {
  totalInput: number | null;
  totalOutput: number | null;
  inputs: (number | null)[];
  outputs: (number | null)[];
}

export interface CategoryByMonthMap {
  식비?: number;
  카페?: number;
  교통?: number;
  생활?: number;
  기타?: number;
}

export const accountCategories: string[] = [
  "식비",
  "카페",
  "생활",
  "교통",
  "기타",
];
