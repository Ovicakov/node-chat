import { type ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("refresh_tokens", {
    id: {
      notNull: true,
      primaryKey: true,
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
    },
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users",
    },
    refresh_token: {
      type: "text",
      notNull: true,
    },
    expiration_date: {
      type: "timestamptz",
      notNull: true,
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("refresh_tokens");
}
