import { Migration } from '@mikro-orm/migrations';

export class Migration20210418180053 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Host" ("id" uuid not null);');
    this.addSql('alter table "Host" add constraint "Host_pkey" primary key ("id");');

    this.addSql('create table "Couch" ("id" uuid not null, "hostId" uuid not null, "name" varchar(255) not null, "description" varchar(255) not null, "rooms" int4 not null, "createdAt" timestamptz(0) not null);');
    this.addSql('alter table "Couch" add constraint "Couch_pkey" primary key ("id");');

    this.addSql('alter table "Couch" add constraint "Couch_hostId_foreign" foreign key ("hostId") references "Host" ("id") on update cascade;');
  }

}
