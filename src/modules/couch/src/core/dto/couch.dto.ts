import { Guid } from "guid-typescript";

export class CouchDto {
  id: Guid;

  userId: Guid;

  name: string;

  description: string;

  rooms: number;

  createdAt: Date;

  constructor(props: CouchDto) {
    Object.assign(this, props);
  }
}
