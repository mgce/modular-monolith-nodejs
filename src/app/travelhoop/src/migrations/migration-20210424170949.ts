import { Migration } from '@mikro-orm/migrations';

export class Migration20210424170949 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Couch" ("id" uuid not null, "userId" uuid not null, "name" varchar(255) not null, "description" varchar(255) not null, "rooms" int4 not null, "createdAt" timestamptz(0) not null);');
    this.addSql('alter table "Couch" add constraint "Couch_pkey" primary key ("id");');
  }

}
