type Block =
  | { type: "heading"; level: 2 | 3; content: string }
  | { type: "paragraph"; content: string }
  | { type: "blockquote"; content: string }
  | { type: "list"; items: string[]; ordered: boolean }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "divider" };

export function normalizeBlogContent(content: string) {
  const normalizedLineEndings = content.replace(/\r\n/g, "\n");
  const decodedContent = decodeMojibake(normalizedLineEndings);

  return decodedContent
    .replace(/\p{Extended_Pictographic}/gu, "")
    .replace(/[\u201c\u201d]/g, '"')
    .replace(/[\u2019]/g, "'")
    .replace(/[\u2013\u2014]/g, "-")
    .replace(/\u2026/g, "...")
    .replace(/\\([.+\-])/g, "$1")
    .trim();
}

export function BlogMarkdownContent({ content }: { content: string }) {
  const blocks = parseBlocks(normalizeBlogContent(content));

  return (
    <div className="space-y-6">
      {blocks.map((block, index) => {
        if (block.type === "divider") {
          return <hr key={`divider-${index}`} className="border-border/80" />;
        }

        if (block.type === "heading") {
          if (block.level === 2) {
            return (
              <h2
                key={`heading-${index}`}
                className="border-l-4 border-accent/60 pl-4 text-xl font-semibold leading-tight tracking-tight text-foreground md:text-2xl"
                dangerouslySetInnerHTML={{ __html: formatInline(block.content) }}
              />
            );
          }

          return (
            <h3
              key={`heading-${index}`}
              className="text-lg font-semibold leading-tight text-foreground/90 md:text-xl"
              dangerouslySetInnerHTML={{ __html: formatInline(block.content) }}
            />
          );
        }

        if (block.type === "paragraph") {
          return (
            <p
              key={`paragraph-${index}`}
              className="text-base leading-8 text-muted-foreground md:text-[1.02rem]"
              dangerouslySetInnerHTML={{ __html: formatInline(block.content) }}
            />
          );
        }

        if (block.type === "blockquote") {
          return (
            <blockquote
              key={`blockquote-${index}`}
              className="relative overflow-hidden rounded-[1.75rem] border border-accent/20 bg-gradient-card px-6 py-6 shadow-card md:px-8"
            >
              <div className="absolute left-5 top-4 text-6xl font-semibold leading-none text-accent/20">
                "
              </div>
              <p
                className="relative pl-5 text-lg leading-8 text-foreground md:text-xl"
                dangerouslySetInnerHTML={{ __html: formatInline(block.content) }}
              />
            </blockquote>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";

          return (
            <ListTag
              key={`list-${index}`}
              className={
                block.ordered
                  ? "list-decimal space-y-3 pl-5 text-base leading-7 text-muted-foreground"
                  : "list-disc space-y-3 pl-5 text-base leading-7 text-muted-foreground"
              }
            >
              {block.items.map((item, itemIndex) => (
                <li
                  key={`list-item-${index}-${itemIndex}`}
                  dangerouslySetInnerHTML={{ __html: formatInline(item) }}
                />
              ))}
            </ListTag>
          );
        }

        return (
          <div
            key={`table-${index}`}
            className="overflow-hidden rounded-2xl border border-border bg-background shadow-card"
          >
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-surface">
                  <tr>
                    {block.headers.map((header, headerIndex) => (
                      <th
                        key={`table-header-${index}-${headerIndex}`}
                        className="px-4 py-3 text-left text-sm font-semibold text-foreground"
                        dangerouslySetInnerHTML={{ __html: formatInline(header) }}
                      />
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {block.rows.map((row, rowIndex) => (
                    <tr key={`table-row-${index}-${rowIndex}`}>
                      {row.map((cell, cellIndex) => (
                        <td
                          key={`table-cell-${index}-${rowIndex}-${cellIndex}`}
                          className="px-4 py-3 text-sm leading-6 text-muted-foreground"
                          dangerouslySetInnerHTML={{ __html: formatInline(cell) }}
                        />
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function parseBlocks(content: string) {
  const lines = content.split("\n");
  const blocks: Block[] = [];
  let index = 0;

  while (index < lines.length) {
    const rawLine = lines[index];
    const line = rawLine.trim();

    if (!line) {
      index += 1;
      continue;
    }

    if (/^[-_]{3,}$/.test(line)) {
      blocks.push({ type: "divider" });
      index += 1;
      continue;
    }

    if (isTableLine(line) && index + 1 < lines.length && isTableDivider(lines[index + 1].trim())) {
      const tableLines = [line];
      index += 2;

      while (index < lines.length && isTableLine(lines[index].trim())) {
        tableLines.push(lines[index].trim());
        index += 1;
      }

      const [headerLine, ...rowLines] = tableLines;
      blocks.push({
        type: "table",
        headers: splitTableLine(headerLine),
        rows: rowLines.map(splitTableLine),
      });
      continue;
    }

    if (isListItem(line)) {
      const ordered = /^\d+\./.test(line);
      const items: string[] = [];

      while (index < lines.length) {
        const currentLine = lines[index].trim();
        if (!currentLine) {
          index += 1;
          break;
        }

        if (isListItem(currentLine)) {
          items.push(stripListMarker(currentLine));
          index += 1;
          continue;
        }

        if (/^\s{2,}[*-]\s+/.test(lines[index]) && items.length > 0) {
          items[items.length - 1] = `${items[items.length - 1]}<br />${stripListMarker(currentLine)}`;
          index += 1;
          continue;
        }

        break;
      }

      blocks.push({ type: "list", items, ordered });
      continue;
    }

    if (line.startsWith(">")) {
      const quoteLines = [line.replace(/^>\s?/, "").trim()];
      index += 1;

      while (index < lines.length) {
        const nextLine = lines[index].trim();
        if (!nextLine.startsWith(">")) {
          break;
        }
        quoteLines.push(nextLine.replace(/^>\s?/, "").trim());
        index += 1;
      }

      blocks.push({
        type: "blockquote",
        content: quoteLines.join(" "),
      });
      continue;
    }

    const heading = getHeading(line);
    if (heading) {
      blocks.push(heading);
      index += 1;
      continue;
    }

    const paragraphLines = [line];
    index += 1;

    while (index < lines.length) {
      const nextLine = lines[index].trim();
      if (!nextLine || isListItem(nextLine) || getHeading(nextLine) || /^[-_]{3,}$/.test(nextLine)) {
        break;
      }
      if (isTableLine(nextLine) && index + 1 < lines.length && isTableDivider(lines[index + 1].trim())) {
        break;
      }
      paragraphLines.push(nextLine);
      index += 1;
    }

    blocks.push({
      type: "paragraph",
      content: paragraphLines.join(" "),
    });
  }

  return blocks;
}

function getHeading(line: string): Block | null {
  const markdownHeading = line.match(/^(#{1,6})\s+(.+)$/);
  if (markdownHeading) {
    return {
      type: "heading",
      level: markdownHeading[1].length <= 2 ? 2 : 3,
      content: markdownHeading[2].trim(),
    };
  }

  const emphasizedHeading = line.match(/^\*\*(.+)\*\*$/);
  if (emphasizedHeading) {
    const content = emphasizedHeading[1].trim();
    return {
      type: "heading",
      level: content.length > 72 ? 3 : 2,
      content,
    };
  }

  if (/^blog\s+\d+/i.test(line)) {
    return {
      type: "heading",
      level: 3,
      content: line,
    };
  }

  if (/^[A-Z][A-Za-z0-9\s:&(),"'.?-]{6,80}$/.test(line) && !line.endsWith(":")) {
    return {
      type: "heading",
      level: 3,
      content: line,
    };
  }

  return null;
}

function formatInline(text: string) {
  return escapeHtml(text)
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      (_, label: string, href: string) =>
        `<a href="${sanitizeUrl(href)}" class="text-accent underline underline-offset-4" target="_blank" rel="noopener noreferrer">${label}</a>`,
    )
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(
      /`([^`]+)`/g,
      '<code class="rounded bg-surface px-1.5 py-0.5 text-sm text-foreground">$1</code>',
    )
    .replace(/\n/g, "<br />");
}

function escapeHtml(text: string) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function sanitizeUrl(value: string) {
  const decoded = value.trim();

  if (/^(https?:|mailto:)/i.test(decoded)) {
    return decoded.replace(/"/g, "%22");
  }

  return "#";
}

function isListItem(line: string) {
  return /^([*-]|\d+\.)\s+/.test(line);
}

function stripListMarker(line: string) {
  return line.replace(/^([*-]|\d+\.)\s+/, "").trim();
}

function isTableLine(line: string) {
  return line.startsWith("|") && line.endsWith("|");
}

function isTableDivider(line: string) {
  return /^\|(?:\s*[-:]+\s*\|)+$/.test(line);
}

function splitTableLine(line: string) {
  return line
    .slice(1, -1)
    .split("|")
    .map((cell) => cell.trim());
}

function decodeMojibake(value: string) {
  try {
    return decodeURIComponent(escape(value));
  } catch {
    return value;
  }
}
