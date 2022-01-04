import {Search} from "./search.model";

export interface History {
  data: Search[];
  count: number;
  total: number;
  next: string;
}
