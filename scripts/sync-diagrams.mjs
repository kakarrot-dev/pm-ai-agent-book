#!/usr/bin/env node

import { access, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { constants } from "node:fs";
import { basename, dirname, join, relative, resolve } from "node:path";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";

const root = resolve(import.meta.dirname, "..");
const sourceDir = join(root, "diagrams", "source");
const svgDir = join(root, "diagrams", "svg");
const configFile = join(root, "diagrams", "mermaid.config.json");
const cssFile = join(root, "diagrams", "mermaid.css");
const cliVersion = "11.16.0";
const maxHeightToWidthRatio = 1.35;
const command = process.argv[2] ?? "sync";

if (!["extract", "render", "sync"].includes(command)) {
  console.error("Usage: node scripts/sync-diagrams.mjs [extract|render|sync]");
  process.exit(2);
}

const exists = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const safeName = (value) =>
  value
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase();

const markdownFiles = async () => {
  const files = [];
  for (const book of ["book1", "book2"]) {
    const names = (await readdir(join(root, book)))
      .filter((name) => name.endsWith(".md") && name !== "README.md")
      .sort();
    for (const name of names) files.push(join(root, book, name));
  }
  return files;
};

const extract = async () => {
  await mkdir(sourceDir, { recursive: true });
  let extracted = 0;

  for (const file of await markdownFiles()) {
    const original = await readFile(file, "utf8");
    const lines = original.split("\n");
    const output = [];
    let heading = basename(file, ".md");
    let diagramIndex = 0;

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const headingMatch = line.match(/^#{2,4}\s+(.+)$/);
      if (headingMatch) heading = headingMatch[1].trim();

      if (line.trim() !== "```mermaid") {
        output.push(line);
        continue;
      }

      const closing = lines.findIndex(
        (candidate, candidateIndex) =>
          candidateIndex > index && candidate.trim() === "```",
      );
      if (closing === -1) {
        throw new Error(`Unclosed Mermaid block: ${relative(root, file)}:${index + 1}`);
      }

      diagramIndex += 1;
      const book = basename(dirname(file));
      const chapter = basename(file, ".md");
      const id = `${book}-${safeName(chapter)}-${String(diagramIndex).padStart(2, "0")}`;
      const sourcePath = join(sourceDir, `${id}.mmd`);
      const svgPath = join(svgDir, `${id}.svg`);
      const mermaid = `${lines.slice(index + 1, closing).join("\n").trim()}\n`;
      const sourceLink = relative(dirname(file), sourcePath).replaceAll("\\", "/");
      const svgLink = relative(dirname(file), svgPath).replaceAll("\\", "/");

      await writeFile(sourcePath, mermaid, "utf8");
      output.push(`![${heading}](${svgLink})`);
      output.push("");
      output.push(`[查看 Mermaid 源码](${sourceLink})`);
      index = closing;
      extracted += 1;
    }

    const updated = output.join("\n");
    if (updated !== original) await writeFile(file, updated, "utf8");
  }

  console.log(`Extracted ${extracted} Mermaid diagrams.`);
};

const chromeExecutable = async () => {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    return process.env.PUPPETEER_EXECUTABLE_PATH;
  }

  const candidates = [
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ];

  for (const candidate of candidates) {
    if (await exists(candidate)) return candidate;
  }
  return null;
};

const run = (program, args) =>
  new Promise((resolveRun, rejectRun) => {
    const child = spawn(program, args, {
      cwd: root,
      stdio: "inherit",
    });
    child.on("error", rejectRun);
    child.on("exit", (code) => {
      if (code === 0) resolveRun();
      else rejectRun(new Error(`${program} exited with code ${code}`));
    });
  });

const validateSvgDimensions = async (file) => {
  const svg = await readFile(file, "utf8");
  const viewBox = svg.match(
    /viewBox="0 0 ([\d.]+) ([\d.]+)"/,
  );

  if (!viewBox) {
    throw new Error(`Missing SVG viewBox: ${relative(root, file)}`);
  }

  const width = Number(viewBox[1]);
  const height = Number(viewBox[2]);
  const ratio = height / width;

  if (ratio > maxHeightToWidthRatio) {
    throw new Error(
      [
        `Diagram is too tall for Markdown: ${relative(root, file)}`,
        `viewBox=${width}x${height}, height/width=${ratio.toFixed(2)}`,
        `maximum allowed ratio=${maxHeightToWidthRatio}`,
        "Rework the Mermaid source into horizontal phases or shorter side branches.",
      ].join("\n"),
    );
  }
};

const render = async () => {
  await mkdir(svgDir, { recursive: true });
  const sources = (await readdir(sourceDir))
    .filter((name) => name.endsWith(".mmd"))
    .sort();

  if (sources.length === 0) {
    throw new Error("No Mermaid sources found. Run extract first.");
  }

  const chrome = await chromeExecutable();
  const puppeteerFile = join(tmpdir(), "pm-ai-agent-book-puppeteer.json");
  const puppeteerArgs = chrome
    ? ["-p", puppeteerFile]
    : [];

  if (chrome) {
    await writeFile(
      puppeteerFile,
      `${JSON.stringify({ executablePath: chrome, args: ["--no-sandbox"] }, null, 2)}\n`,
      "utf8",
    );
  }

  for (const source of sources) {
    const input = join(sourceDir, source);
    const output = join(svgDir, source.replace(/\.mmd$/, ".svg"));
    await run("pnpm", [
      "dlx",
      `@mermaid-js/mermaid-cli@${cliVersion}`,
      ...puppeteerArgs,
      "-c",
      configFile,
      "-C",
      cssFile,
      "-b",
      "#fbfaf7",
      "-i",
      input,
      "-o",
      output,
    ]);
    await validateSvgDimensions(output);
  }

  console.log(`Rendered ${sources.length} SVG diagrams.`);
};

if (command === "extract" || command === "sync") await extract();
if (command === "render" || command === "sync") await render();
