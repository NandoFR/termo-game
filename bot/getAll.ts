import puppeteer from "puppeteer";
import { PrismaClient } from "@prisma/client";
(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });

  const page = await browser.newPage();

  await page.goto("https://pt.bab.la/dicionario/portugues-ingles/");

  const linksEl = await page.$$("ul.nav.nav-pills > li > a");

  const links = await Promise.all(
    //@ts-ignore
    linksEl.map<Promise<string>>(async (e) => {
      const handle = await e.getProperty("href");
      return await handle.jsonValue();
    })
  );

  while (true) {
    const letter = links.shift();
    if (!letter) break;
    if (letter.includes("0-9")) continue;

    await page.goto(letter);
    const maxPages = (await page.$("div.dict-pag > a:nth-child(3)")) || null;

    //@ts-ignore
    const maxPagesHref: string = maxPages
      ? await (await maxPages.getProperty("href")!).jsonValue()
      : letter;

    let number = maxPagesHref.split("/").pop();
    let index = 1;

    while (true) {
      if (index > Number(number)) break;

      let letterLink = letter.split("/");
      letterLink.pop();
      letterLink.push(String(index));
      let link = letterLink.join("/");

      await page.goto(link, { waitUntil: "load", timeout: 0 });

      const allWords = page.$$("div.dict-select-column > ul > li > a");

      while (true) {
        const word = (await allWords).shift();
        if (!word) break;

        //@ts-ignore
        const wordTextLikeAShit = await word.evaluate((el) => el.textContent);

        const wordTextAlmostNotLikeAShit = wordTextLikeAShit?.split(" ");
        wordTextAlmostNotLikeAShit?.shift();
        const wordText = wordTextAlmostNotLikeAShit?.join(" ").toLowerCase();

        if (wordText?.includes(" ")) continue;
        if (wordText?.includes(",")) continue;
        if (wordText?.includes(".")) continue;
        if (wordText?.includes("!")) continue;
        if (wordText?.includes("-")) continue;
        if (wordText?.includes("(")) continue;
        if (wordText?.includes(")")) continue;
        if (wordText?.includes("'")) continue;
        if (wordText?.length! <= 3) continue;
        if (wordText?.length! > 10) continue;

        const a = ["á", "â", "à", "ã"];
        const e = ["é", "ê", "è", "ẽ"];
        const i = ["í", "î", "ì", "ĩ"];
        const o = ["ó", "ô", "ò", "õ"];
        const u = ["ú", "û", "ù", "ũ"];

        let finalWord = wordText;

        a.map((v) => {
          if (wordText?.includes(v)) {
            finalWord = wordText.replace(v, "a");
          }
        });

        e.map((v) => {
          if (wordText?.includes(v)) {
            finalWord = wordText.replace(v, "e");
          }
        });
        i.map((v) => {
          if (wordText?.includes(v)) {
            finalWord = wordText.replace(v, "i");
          }
        });
        o.map((v) => {
          if (wordText?.includes(v)) {
            finalWord = wordText.replace(v, "o");
          }
        });
        u.map((v) => {
          if (wordText?.includes(v)) {
            finalWord = wordText.replace(v, "o");
          }
        });
        const prisma = new PrismaClient();

        console.log(finalWord);
        await prisma.word.create({
          data: {
            name: finalWord!,
            length: finalWord!.length,
          },
        });
      }

      index++;
    }
  }

  browser.close();
})();
