#!/usr/bin/env node

import { access, readFile, readdir } from "node:fs/promises";
import { constants } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const errors = [];
const markerStart = "<!-- chapter-navigation:start -->";
const markerEnd = "<!-- chapter-navigation:end -->";

const exists = async (path) => {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
};

const markdownFiles = async () => {
  const files = [
    join(root, "README.md"),
    join(root, "CONTRIBUTING.md"),
    join(root, "STYLE_GUIDE.md"),
    join(root, "diagrams", "README.md"),
  ];

  for (const book of ["book1", "book2"]) {
    const entries = await readdir(join(root, book));
    files.push(
      ...entries
        .filter((entry) => extname(entry) === ".md")
        .sort()
        .map((entry) => join(root, book, entry)),
    );
  }
  return files;
};

const localLinks = (markdown) => {
  const links = [];
  const pattern = /!?\[[^\]]*]\(([^)]+)\)/g;
  for (const match of markdown.matchAll(pattern)) {
    const target = match[1].trim().replace(/^<|>$/g, "");
    if (
      target.startsWith("http://") ||
      target.startsWith("https://") ||
      target.startsWith("mailto:") ||
      target.startsWith("#")
    ) {
      continue;
    }
    links.push(target.split("#", 1)[0]);
  }
  return links;
};

const checkMarkdown = async (file) => {
  const markdown = await readFile(file, "utf8");
  const name = relative(root, file);
  const headings = markdown.match(/^# .+$/gm) ?? [];
  if (headings.length !== 1) {
    errors.push(`${name}: expected one H1, found ${headings.length}`);
  }

  const fences = markdown.match(/^```/gm) ?? [];
  if (fences.length % 2 !== 0) {
    errors.push(`${name}: unclosed fenced code block`);
  }

  if (/[ \t]+$/m.test(markdown)) {
    errors.push(`${name}: trailing whitespace`);
  }
  if (!markdown.endsWith("\n")) {
    errors.push(`${name}: missing final newline`);
  }
  if (/\]\(\.\.\/book\//.test(markdown) || /\]\(book\//.test(markdown)) {
    errors.push(`${name}: contains a link to the retired book/ directory`);
  }

  for (const target of localLinks(markdown)) {
    const resolved = resolve(file, "..", target);
    if (!(await exists(resolved))) {
      errors.push(`${name}: broken local link ${target}`);
    }
  }

  if (/^book[12]\/(?!README\.md)/.test(name)) {
    const starts = markdown.match(new RegExp(markerStart, "g")) ?? [];
    const ends = markdown.match(new RegExp(markerEnd, "g")) ?? [];
    if (starts.length !== 1 || ends.length !== 1) {
      errors.push(`${name}: missing or duplicated chapter navigation`);
    }
  }
};

const checkDiagrams = async () => {
  const sources = (await readdir(join(root, "diagrams", "source")))
    .filter((name) => name.endsWith(".mmd"))
    .map((name) => name.replace(/\.mmd$/, ""))
    .sort();
  const svgs = (await readdir(join(root, "diagrams", "svg")))
    .filter((name) => name.endsWith(".svg"))
    .map((name) => name.replace(/\.svg$/, ""))
    .sort();

  const missingSvg = sources.filter((name) => !svgs.includes(name));
  const missingSource = svgs.filter((name) => !sources.includes(name));
  for (const name of missingSvg) errors.push(`diagrams: missing SVG for ${name}`);
  for (const name of missingSource) {
    errors.push(`diagrams: missing Mermaid source for ${name}`);
  }
};

for (const file of await markdownFiles()) await checkMarkdown(file);
await checkDiagrams();

if (errors.length > 0) {
  console.error(`Content check failed with ${errors.length} issue(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log("Content check passed.");
