import { type ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.alterColumn("users", "created_at", { type: "timestamptz" });
  pgm.alterColumn("messages", "created_at", { type: "timestamptz" });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.alterColumn("users", "created_at", { type: "timestampt" });
  pgm.alterColumn("messages", "created_at", { type: "timestampt" });
}
