import { Migration } from '@mikro-orm/migrations';

export class Migration20210504171406 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "CouchBookingRequest" drop constraint if exists "CouchBookingRequest_decisionDate_check";');
    this.addSql('alter table "CouchBookingRequest" alter column "decisionDate" type timestamptz(0) using ("decisionDate"::timestamptz(0));');
    this.addSql('alter table "CouchBookingRequest" alter column "decisionDate" drop not null;');
    this.addSql('alter table "CouchBookingRequest" drop constraint if exists "CouchBookingRequest_rejectionReason_check";');
    this.addSql('alter table "CouchBookingRequest" alter column "rejectionReason" type varchar(255) using ("rejectionReason"::varchar(255));');
    this.addSql('alter table "CouchBookingRequest" alter column "rejectionReason" drop not null;');
  }

}
