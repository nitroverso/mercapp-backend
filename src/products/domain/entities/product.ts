export class Product {
  constructor(
    public user_id: string,
    public name: string,
    public category_id: string,
    public unit_id: string,
    public quantity: number
  ) {}
}
