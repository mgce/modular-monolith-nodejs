import { Migration } from "@mikro-orm/migrations";

export class Migration20210604132200 extends Migration {
  async up(): Promise<void> {
    this.addSql(
      'create table "ReviewDetails" ("id" uuid not null, "comment" varchar(255) not null, "rate" int4 not null, "fullfiledAt" timestamptz(0) not null);',
    );
    this.addSql('alter table "ReviewDetails" add constraint "ReviewDetails_pkey" primary key ("id");');

    this.addSql(
      'create table "BookingReview" ("id" uuid not null, "reviewerId" uuid not null, "revieweeId" uuid not null, "reviewDetailsId" uuid null);',
    );
    this.addSql('alter table "BookingReview" add constraint "BookingReview_pkey" primary key ("id");');
    this.addSql(
      'alter table "BookingReview" add constraint "BookingReview_reviewDetailsId_unique" unique ("reviewDetailsId");',
    );

    this.addSql(
      'alter table "BookingReview" add constraint "BookingReview_reviewDetailsId_foreign" foreign key ("reviewDetailsId") references "ReviewDetails" ("id") on update cascade on delete set null;',
    );
  }
}
