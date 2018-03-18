export enum TourStatus { Create = 1, Running = 2, End = 3 }

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "HEAD";

export enum OptionType {
    Empty = 0,
    Room = 1,
    Bus = 2,
    Food = 4,
}

export enum IncomeStatus {
    Settled = 1,
    Unsettled = 2,
  }