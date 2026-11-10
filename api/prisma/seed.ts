
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create four book genres
  const genres = [
    { name: 'Technology', slug: 'technology' },
    { name: 'Fiction', slug: 'fiction' },
    { name: 'History', slug: 'history' },
    { name: 'Science', slug: 'science' },
  ];

  for (const genre of genres) {
    await prisma.genre.upsert({
      where: { slug: genre.slug },
      update: { name: genre.name },
      create: genre,
    });
  }

  // Create sixteen books across the four genres
  const books = [
    {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      isbn: '9780132350884',
      genreSlug: 'technology',
    },
    {
      title: 'The Pragmatic Programmer',
      author: 'David Thomas and Andrew Hunt',
      isbn: '9780135957059',
      genreSlug: 'technology',
    },
    {
      title: 'Introduction to Algorithms',
      author: 'Thomas H. Cormen',
      isbn: '9780262046305',
      genreSlug: 'technology',
    },
    {
      title: 'Design Patterns',
      author: 'Erich Gamma',
      isbn: '9780201633610',
      genreSlug: 'technology',
    },
    {
      title: 'Things Fall Apart',
      author: 'Chinua Achebe',
      isbn: '9780385474542',
      genreSlug: 'fiction',
    },
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '9780743273565',
      genreSlug: 'fiction',
    },
    {
      title: '1984',
      author: 'George Orwell',
      isbn: '9780451524935',
      genreSlug: 'fiction',
    },
    {
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '9780061120084',
      genreSlug: 'fiction',
    },
    {
      title: 'A Brief History of Time',
      author: 'Stephen Hawking',
      isbn: '9780553380163',
      genreSlug: 'science',
    },
    {
      title: 'The Selfish Gene',
      author: 'Richard Dawkins',
      isbn: '9780198788607',
      genreSlug: 'science',
    },
    {
      title: 'Cosmos',
      author: 'Carl Sagan',
      isbn: '9780345539434',
      genreSlug: 'science',
    },
    {
      title: 'The Origin of Species',
      author: 'Charles Darwin',
      isbn: '9781509827695',
      genreSlug: 'science',
    },
    {
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      isbn: '9780062316097',
      genreSlug: 'history',
    },
    {
      title: 'The Art of War',
      author: 'Sun Tzu',
      isbn: '9781590302255',
      genreSlug: 'history',
    },
    {
      title: 'Long Walk to Freedom',
      author: 'Nelson Mandela',
      isbn: '9780316548182',
      genreSlug: 'history',
    },
    {
      title: 'The Diary of a Young Girl',
      author: 'Anne Frank',
      isbn: '9780553296983',
      genreSlug: 'history',
    },
  ];

  for (const book of books) {
    const { genreSlug, ...bookData } = book;

    const genre = await prisma.genre.findUniqueOrThrow({
      where: { slug: genreSlug },
    });

    await prisma.book.upsert({
      where: { isbn: book.isbn },
      update: {
        ...bookData,
        genreId: genre.id,
      },
      create: {
        ...bookData,
        genreId: genre.id,
      },
    });
  }

  console.log('Seed completed: 4 genres and 16 books.');
}

main()
  .catch((error) => {
    console.error('Seed failed:', error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
