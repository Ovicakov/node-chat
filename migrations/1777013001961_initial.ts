import { type ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("users", {
    username: { notNull: true, type: "text", unique: true },
    id: {
      notNull: true,
      primaryKey: true,
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.createTable("messages", {
    content: { notNull: true, type: "text" },
    id: {
      notNull: true,
      primaryKey: true,
      type: "uuid",
      default: pgm.func("gen_random_uuid()"),
    },
    userId: {
      notNull: true,
      type: "uuid",
      references: "users",
    },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("messages");
  pgm.dropTable("users");
}
