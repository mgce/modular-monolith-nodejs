import { Migration } from '@mikro-orm/migrations';

export class Migration20210426194938 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "BookableCouch" ("id" uuid not null, "version" int4 not null default 1, "quantity" int4 not null);');
    this.addSql('alter table "BookableCouch" add constraint "BookableCouch_pkey" primary key ("id");');
  }

}
