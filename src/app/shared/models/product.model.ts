export class Product {
  public _id: string | undefined;
  public name: string | undefined;
  public description?: string;
  public category?: string;
  public tags?: string[];
  public price:
    | {
        sale: number;
        previous?: number;
      }
    | undefined;
  public ratings?: {
    rating: number;
    ratingCount: number;
  };
  public features?: string[];
  public photo?: string;
  public gallery?: string[];
  public badge?: { text: string; color?: string };
}
