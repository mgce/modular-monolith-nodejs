import { Migration } from '@mikro-orm/migrations';

export class Migration20210417182945 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "Profile" ("id" uuid not null, "firstName" varchar(255) null, "lastName" varchar(255) null, "location" varchar(255) null, "aboutMe" varchar(255) null);');
    this.addSql('alter table "Profile" add constraint "Profile_pkey" primary key ("id");');

    this.addSql('create table "User" ("id" uuid not null, "profileId" uuid not null, "email" varchar(255) not null, "password" varchar(255) not null, "isActive" bool not null, "createdAt" timestamptz(0) not null);');
    this.addSql('alter table "User" add constraint "User_pkey" primary key ("id");');
    this.addSql('alter table "User" add constraint "User_profileId_unique" unique ("profileId");');

    this.addSql('alter table "User" add constraint "User_profileId_foreign" foreign key ("profileId") references "Profile" ("id") on update cascade;');
  }

}
