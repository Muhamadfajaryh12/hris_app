import prisma from "@/lib/prisma";

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      const sections = await prisma.section.findMany();
      return res.json(sections);
    case "POST":
      const { section } = req.body;
      try {
        const insert = await prisma.section.create({
          data: {
            section,
          },
        });
        return res.status(201).json(insert);
      } catch (error) {
        return res.status(400).json({ error: error });
      }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
