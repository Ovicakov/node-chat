import { type ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.renameColumn("users", "createdAt", "created_at");
  pgm.renameColumn("messages", "createdAt", "created_at");
  pgm.renameColumn("messages", "userId", "user_id");
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.renameColumn("users", "created_at", "createdAt");
  pgm.renameColumn("messages", "created_at", "createdAt");
  pgm.renameColumn("messages", "user_id", "userId");
}
