export enum ProcessCategory {
  Washed = 'Washed',
  Natural = 'Natural',
  Experimental = 'Experimental',
  Unknown = 'Unknown',
}

export enum ProductType {
  RoastedWholeBean = 'Roasted Whole Bean',
  GreenWholeBean = 'Green Whole Bean',
  Capsule = 'Capsule',
  Instant = 'Instant',
  Unknown = 'Unknown',
}

export interface ProductRequest {
  brand: string;
  countryOfOrigin: string;
  vendor: string;
  processCategory: ProcessCategory;
  productType: ProductType;
  title: string;
  weight: number;
  process: string;
  productUrl: string;
  imageUrl: string;
  soldOut: boolean;
  discoveredDateTime: Date;
  handle: string;
  price: number;
  decaf: boolean;
  tastingNote: string[];
  variety: string[];
}

export interface ObjectIdAndName {
  id: number;
  name: string;
}

export interface ConnectedIds {
  varietyEntities: ObjectIdAndName[];
  tastingNoteEntities: ObjectIdAndName[];
}
