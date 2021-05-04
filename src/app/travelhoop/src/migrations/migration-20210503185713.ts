import { Migration } from '@mikro-orm/migrations';

export class Migration20210503185713 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "CouchBookingRequest" ("id" uuid not null, "version" int4 not null default 1, "bookableCouchId" uuid not null, "guestId" uuid not null, "quantity" int4 not null, "dateFrom" timestamptz(0) not null, "dateTo" timestamptz(0) not null, "decisionDate" timestamptz(0) not null, "status" text check ("status" in (\'Pending\', \'Accepted\', \'Rejected\')) not null, "rejectionReason" varchar(255) not null);');
    this.addSql('alter table "CouchBookingRequest" add constraint "CouchBookingRequest_pkey" primary key ("id");');

    this.addSql('create table "BookingCancellation" ("id" uuid not null, "version" int4 not null default 1, "guestId" uuid not null, "quantity" int4 not null, "dateFrom" timestamptz(0) not null, "dateTo" timestamptz(0) not null, "reason" varchar(255) not null);');
    this.addSql('alter table "BookingCancellation" add constraint "BookingCancellation_pkey" primary key ("id");');

    this.addSql('create table "BookableCouch" ("id" uuid not null, "version" int4 not null default 1, "quantity" int4 not null, "hostId" uuid not null);');
    this.addSql('alter table "BookableCouch" add constraint "BookableCouch_pkey" primary key ("id");');

    this.addSql('create table "Booking" ("id" uuid not null, "dateFrom" timestamptz(0) not null, "dateTo" timestamptz(0) not null, "bookableCouch" uuid not null, "discr" text check ("discr" in (\'couchBooking\', \'unavailableBooking\')) not null, "guestId" uuid null, "quantity" int4 null);');
    this.addSql('alter table "Booking" add constraint "Booking_pkey" primary key ("id");');
    this.addSql('create index "Booking_discr_index" on "Booking" ("discr");');

    this.addSql('create table "Profile" ("id" uuid not null, "firstName" varchar(255) null, "lastName" varchar(255) null, "location" varchar(255) null, "aboutMe" varchar(255) null);');
    this.addSql('alter table "Profile" add constraint "Profile_pkey" primary key ("id");');

    this.addSql('create table "User" ("id" uuid not null, "profileId" uuid not null, "email" varchar(255) not null, "password" varchar(255) not null, "isActive" bool not null, "createdAt" timestamptz(0) not null);');
    this.addSql('alter table "User" add constraint "User_pkey" primary key ("id");');
    this.addSql('alter table "User" add constraint "User_profileId_unique" unique ("profileId");');

    this.addSql('create table "Couch" ("id" uuid not null, "hostId" uuid not null, "name" varchar(255) not null, "description" varchar(255) not null, "quantity" int4 not null, "createdAt" timestamptz(0) not null);');
    this.addSql('alter table "Couch" add constraint "Couch_pkey" primary key ("id");');

    this.addSql('alter table "Booking" add constraint "Booking_bookableCouch_foreign" foreign key ("bookableCouch") references "BookableCouch" ("id") on update cascade;');

    this.addSql('alter table "User" add constraint "User_profileId_foreign" foreign key ("profileId") references "Profile" ("id") on update cascade;');
  }

}
