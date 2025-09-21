import { mysqlTable, serial, varchar, int, timestamp } from "drizzle-orm/mysql-core";

export const payments = mysqlTable("payments", {
    id: serial("id").primaryKey(),
    player: varchar("player", { length: 255 }).notNull(),
    item: int("item").notNull(),
    operationId: varchar("operation_id", { length: 100 }).notNull(),
    createdAt: timestamp("created_at").defaultNow()
})
