const { PrismaClient } = require("@prisma/client");

const client = new PrismaClient();

const postsToCreate = [
  {
    id: 1,
    title: "First Post :)",
    content: "The first post made",
  },
  {
    id: 2,
    title: "My Second Post Ever",
    content: "Only my second post, still working on this",
  },
  {
    id: 3,
    title: "One more for good measure",
    content: "I don't  write a lot but when I do, we end up with this many posts",
  },
  {
    id: 4,
    title: "Final Post, Thank You",
    content: "This should be enough posts for testing!",
  },
];

const seed = async (posts) => {
  console.log("creating posts....");
  for (let i = 0; i < posts.length; i++) {
    await client.post.upsert({
      where: { id: posts[i].id },
      update: posts[i],
      create: posts[i],
    });
  }
};

seed(postsToCreate)
  .then(() => {
    console.log("Created/Updated posts successfully");
  })
  .catch((err) => {
    console.error("err:", err);
  })
  .finally(() => {
    client.$disconnect();
    console.log("Disconnected Prisma Client, exiting.");
  });
