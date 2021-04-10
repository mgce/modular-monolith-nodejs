import { Migration } from '@mikro-orm/migrations';

export class Migration20210410174311 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" uuid not null, "email" varchar(255) not null, "password" varchar(255) not null, "is_active" bool not null, "created_at" timestamptz(0) not null);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("id");');
  }

}
