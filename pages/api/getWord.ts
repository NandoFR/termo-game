// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import { randomInt } from "crypto";

type Data = {
  length: number;
  word: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { length } = JSON.parse(req.body);

  if (!length) {
    return res.status(400);
  }
  const prisma = new PrismaClient();

  const word = await prisma.word.findMany({
    where: {
      length: Number(length),
    },
  });

  const key = randomInt(word.length);

  //@ts-ignore
  res.status(200).json({ word: word[key], length });
}