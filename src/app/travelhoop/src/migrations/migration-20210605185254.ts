import { Migration } from '@mikro-orm/migrations';

export class Migration20210605185254 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "BookableCouch" add column "state" text check ("state" in (\'Active\', \'Archived\')) not null;');
  }

}
