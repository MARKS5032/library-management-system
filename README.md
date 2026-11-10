# library-management-system
A Library Management System API built with NestJS, PostgreSQL and Prisma ORM.

## Schema Decisions

### Why Book References Genre

The Book model uses a foreign key (`genreId`) to reference the Genre model instead of storing the genre details directly inside each book.

This design was chosen because:

1. **Data consistency:** Genre information is stored once, preventing different books from having inconsistent genre names.
2. **Reduced duplication:** Multiple books can reference the same genre without repeating its details.
3. **Easy updates:** Updating a genre name requires changing it in only one record.
4. **Referential integrity:** The foreign key ensures that each book references an existing genre.
5. **Relational database design:** This approach follows database normalization principles and is suitable for PostgreSQL.

The relationship is one-to-many: one genre can have many books, while each book belongs to one genre.
