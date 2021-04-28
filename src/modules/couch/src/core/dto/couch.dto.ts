import { Guid } from "guid-typescript";

export class CouchDto {
  id: Guid;

  hostId: Guid;

  name: string;

  description: string;

  quantity: number;

  createdAt: Date;

  constructor(props: CouchDto) {
    Object.assign(this, props);
  }
}
