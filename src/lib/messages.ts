import { prisma } from "@/lib/prisma";

export async function getMessages() {
  return prisma.message.findMany({
    orderBy: { createdAt: "desc" }
  });
}
