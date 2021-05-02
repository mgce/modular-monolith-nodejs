import { Migration } from '@mikro-orm/migrations';

export class Migration20210502195615 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "CouchBookingRequest" ("id" uuid not null, "version" int4 not null default 1, "bookableCouchId" uuid not null, "guestId" uuid not null, "quantity" int4 not null, "dateFrom" timestamptz(0) not null, "dateTo" timestamptz(0) not null, "decisionDate" timestamptz(0) not null, "status" text check ("status" in (\'Pending\', \'Accepted\', \'Rejected\')) not null, "rejectionReason" varchar(255) not null);');
    this.addSql('alter table "CouchBookingRequest" add constraint "CouchBookingRequest_pkey" primary key ("id");');

    this.addSql('create table "Booking" ("id" uuid not null, "dateFrom" timestamptz(0) not null, "dateTo" timestamptz(0) not null, "discr" text check ("discr" in (\'couchBooking\', \'unavailableBooking\')) not null, "guestId" uuid null, "quantity" int4 null);');
    this.addSql('alter table "Booking" add constraint "Booking_pkey" primary key ("id");');
    this.addSql('create index "Booking_discr_index" on "Booking" ("discr");');

    this.addSql('create table "BookingCancellation" ("id" uuid not null, "version" int4 not null default 1, "guestId" uuid not null, "quantity" int4 not null, "dateFrom" timestamptz(0) not null, "dateTo" timestamptz(0) not null, "reason" varchar(255) not null);');
    this.addSql('alter table "BookingCancellation" add constraint "BookingCancellation_pkey" primary key ("id");');

    this.addSql('alter table "Couch" rename column "userId" to "hostId";');
  }

}
