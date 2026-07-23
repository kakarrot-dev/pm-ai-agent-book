#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import { basename, join, relative, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const markerStart = "<!-- chapter-navigation:start -->";
const markerEnd = "<!-- chapter-navigation:end -->";

const books = [
  {
    directory: "book1",
    nextBook: "../book2/00-introduction.md",
    nextBookLabel: "继续阅读进阶篇",
    chapters: [
      "00-introduction.md",
      "01-ai-agent-product-basics.md",
      "02-opportunity-and-scenario-selection.md",
      "03-user-research-and-task-modeling.md",
      "04-agent-product-definition.md",
      "05-interaction-trust-and-control.md",
      "06-from-requirements-to-capabilities.md",
      "07-agent-evaluation.md",
      "08-reliability-safety-and-cost.md",
      "09-launch-operations-and-iteration.md",
      "10-roadmap-and-collaboration.md",
      "11-afterword.md",
    ],
  },
  {
    directory: "book2",
    nextBook: "../README.md",
    nextBookLabel: "返回项目首页",
    chapters: [
      "00-introduction.md",
      "01-prompt-and-context-engineering.md",
      "02-retrieval-and-knowledge-engineering.md",
      "03-memory-engineering.md",
      "04-tool-loop-engineering.md",
      "05-graph-engineering.md",
      "06-agent-experience-engineering.md",
      "07-harness-and-eval-engineering.md",
      "08-reliability-engineering.md",
      "09-safety-engineering.md",
      "10-production-engineering.md",
      "11-afterword.md",
    ],
  },
];

const titleOf = async (file) => {
  const markdown = await readFile(file, "utf8");
  const heading = markdown.match(/^# (.+)$/m);
  if (!heading) throw new Error(`Missing H1: ${relative(root, file)}`);
  return heading[1];
};

for (const book of books) {
  const paths = book.chapters.map((chapter) =>
    join(root, book.directory, chapter),
  );
  const titles = await Promise.all(paths.map(titleOf));

  for (let index = 0; index < paths.length; index += 1) {
    const file = paths[index];
    const original = await readFile(file, "utf8");
    const withoutNavigation = original.includes(markerStart)
      ? original.slice(0, original.indexOf(markerStart)).trimEnd()
      : original.trimEnd();

    const previous = index === 0
      ? `[项目首页](../README.md)`
      : `[上一篇：${titles[index - 1]}](${basename(paths[index - 1])})`;
    const next = index === paths.length - 1
      ? `[${book.nextBookLabel}](${book.nextBook})`
      : `[下一篇：${titles[index + 1]}](${basename(paths[index + 1])})`;

    const navigation = [
      markerStart,
      "---",
      "",
      `${previous} · [篇章目录](README.md) · ${next}`,
      markerEnd,
      "",
    ].join("\n");

    await writeFile(file, `${withoutNavigation}\n\n${navigation}`, "utf8");
  }
}

console.log("Updated navigation for 24 chapters.");
