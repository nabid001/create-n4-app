import { relations } from "drizzle-orm";
import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { createdAt, id, updatedAt } from "./schemaHelpers.js";

export const UserTable = pgTable("users", {
  id,
  name: varchar("name").notNull(),
  email: varchar("email").notNull().unique(),
  createdAt,
  updatedAt,
});

export const UserRelations = relations(UserTable, ({ many }) => ({
  PostTable: many(PostTable),
}));

export const PostTable = pgTable("posts", {
  id: id,
  title: varchar("title").notNull(),
  authorId: uuid("authorId").notNull(),
  createdAt,
  updatedAt,
});

export const PostRelations = relations(PostTable, ({ one }) => ({
  UserTable: one(UserTable, {
    fields: [PostTable.authorId],
    references: [UserTable.id],
  }),
}));
