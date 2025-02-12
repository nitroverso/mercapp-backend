export class DomainEvent {
  constructor(
    public id: string,
    public user_id: string,
    public name: string,
    public date: string,
    public completed: boolean = false,
    public precio_total: number = 0
  ) {}
}
