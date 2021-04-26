import { Migration } from "@mikro-orm/migrations";

export class Migration20210426194902 extends Migration {
  async up(): Promise<void> {
    this.addSql('alter table "Couch" rename column "rooms" to "quantity";');
  }
}
