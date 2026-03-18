#!/usr/bin/env python3
"""下载并拆分 CodePen 示例源码。

用法：
  python3 tools/codepen_downloader.py "https://codepen.io/KevinGutowski/pen/QwNZYzL"
  python3 tools/codepen_downloader.py "<url>" -o downloads/codepen_QwNZYzL --save-raw
"""

from __future__ import annotations

import argparse
import datetime as dt
import html
import re
import sys
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path
from typing import Iterable
from urllib.error import HTTPError, URLError
from urllib.parse import urlparse
from urllib.request import Request, urlopen


DEFAULT_TIMEOUT = 30
DEFAULT_USER_AGENT = (
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
  "AppleWebKit/537.36 (KHTML, like Gecko) "
  "Chrome/123.0.0.0 Safari/537.36"
)


@dataclass(frozen=True)
class PenInfo:
  user: str
  pen_id: str
  referer_url: str
  fullpage_url: str


@dataclass(frozen=True)
class ExtractedPen:
  title: str
  body_html: str
  style_css: str
  script_js: str
  script_type: str
  external_head_tags: tuple[str, ...]
  external_body_tags: tuple[str, ...]


class IframeSrcdocParser(HTMLParser):
  def __init__(self) -> None:
    super().__init__()
    self.srcdoc: str | None = None

  def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
    if tag.lower() != "iframe" or self.srcdoc is not None:
      return
    attributes = dict(attrs)
    srcdoc = attributes.get("srcdoc")
    if srcdoc:
      self.srcdoc = srcdoc


def parse_args() -> argparse.Namespace:
  parser = argparse.ArgumentParser(description="下载并拆分 CodePen 示例源码")
  parser.add_argument("url", help="CodePen 链接")
  parser.add_argument(
    "-o",
    "--output",
    help="输出目录，默认 downloads/<页面标题>_<时间戳>",
  )
  parser.add_argument(
    "--save-raw",
    action="store_true",
    help="额外保存抓取到的 fullpage 原始 HTML",
  )
  parser.add_argument(
    "--timeout",
    type=int,
    default=DEFAULT_TIMEOUT,
    help=f"网络超时秒数，默认 {DEFAULT_TIMEOUT}",
  )
  return parser.parse_args()


def parse_codepen_url(url: str) -> PenInfo:
  parsed = urlparse(url)
  host = parsed.netloc.lower()
  if host not in {"codepen.io", "www.codepen.io", "cdpn.io", "www.cdpn.io"}:
    raise ValueError(f"不支持的域名: {parsed.netloc}")

  path = parsed.path.strip("/")
  parts = [part for part in path.split("/") if part]
  if len(parts) < 3:
    raise ValueError("无法从链接中识别 user 和 pen_id")

  user = parts[0]
  mode = parts[1]
  pen_id = parts[2]
  supported_modes = {"pen", "full", "fullpage", "debug"}
  if mode not in supported_modes:
    raise ValueError(f"暂不支持的 CodePen 链接类型: {mode}")

  referer_url = f"https://codepen.io/{user}/pen/{pen_id}"
  fullpage_url = f"https://cdpn.io/{user}/fullpage/{pen_id}"
  return PenInfo(user=user, pen_id=pen_id, referer_url=referer_url, fullpage_url=fullpage_url)


def fetch_text(url: str, timeout: int, referer: str | None = None) -> str:
  headers = {
    "User-Agent": DEFAULT_USER_AGENT,
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.9",
  }
  if referer:
    headers["Referer"] = referer

  request = Request(url, headers=headers)
  try:
    with urlopen(request, timeout=timeout) as response:
      charset = response.headers.get_content_charset() or "utf-8"
      return response.read().decode(charset, errors="replace")
  except HTTPError as exc:
    raise RuntimeError(f"请求失败: {exc.code} {exc.reason}") from exc
  except URLError as exc:
    raise RuntimeError(f"网络错误: {exc.reason}") from exc


def extract_srcdoc(fullpage_html: str) -> str:
  parser = IframeSrcdocParser()
  parser.feed(fullpage_html)
  if parser.srcdoc:
    return html.unescape(parser.srcdoc)

  # 某些响应会直接返回最终渲染页，而不是外层 iframe 包装页。
  lowered = fullpage_html.lower()
  if "<html" in lowered and "<body" in lowered:
    return fullpage_html

  raise RuntimeError("未在 fullpage 页面中找到 iframe srcdoc，页面结构可能已变化")


def match_first(pattern: str, text: str, default: str = "", flags: int = re.IGNORECASE | re.DOTALL) -> str:
  match = re.search(pattern, text, flags)
  return match.group(1).strip() if match else default


def extract_body_html(inner_html: str) -> str:
  open_tags = list(re.finditer(r"<body\b[^>]*>", inner_html, re.IGNORECASE))
  close_tags = list(re.finditer(r"</body>", inner_html, re.IGNORECASE))
  if not open_tags or not close_tags:
    raise RuntimeError("未找到 body 内容，无法拆分页面")

  start = open_tags[0].end()
  end = close_tags[-1].start()
  body_html = inner_html[start:end].strip()

  while True:
    updated = re.sub(r"^\s*<body\b[^>]*>", "", body_html, count=1, flags=re.IGNORECASE | re.DOTALL)
    if updated == body_html:
      break
    body_html = updated.strip()

  while True:
    updated = re.sub(r"</body>\s*$", "", body_html, count=1, flags=re.IGNORECASE | re.DOTALL)
    if updated == body_html:
      break
    body_html = updated.strip()

  body_html = re.sub(
    r"<script\b[^>]*>.*?</script>",
    "",
    body_html,
    flags=re.IGNORECASE | re.DOTALL,
  ).strip()

  html_close = re.search(r"</html>", body_html, re.IGNORECASE)
  if html_close:
    body_html = body_html[: html_close.start()].strip()

  body_html = re.sub(r"</body>\s*$", "", body_html, flags=re.IGNORECASE | re.DOTALL).strip()
  body_html = re.sub(r"</html>\s*$", "", body_html, flags=re.IGNORECASE | re.DOTALL).strip()

  return body_html


def extract_inline_styles(inner_html: str) -> str:
  matches = re.findall(r"<style\b[^>]*>(.*?)</style>", inner_html, re.IGNORECASE | re.DOTALL)
  cleaned = [match.strip() for match in matches if match.strip()]
  return "\n\n".join(cleaned)


def is_codepen_asset(url: str) -> bool:
  lowered = url.lower()
  return any(
    key in lowered
    for key in (
      "cpwebassets.codepen.io",
      "codepen.io/assets/",
      "stopexecutionontimeout",
      "favicon",
    )
  )


def extract_external_head_tags(inner_html: str) -> tuple[str, ...]:
  head_html = match_first(r"<head\b[^>]*>(.*?)</head>", inner_html)
  if not head_html:
    return tuple()

  tags: list[str] = []
  meta_charset = match_first(r"<meta\b[^>]*charset=[\"']?([^\"'>\s]+)[^>]*>", head_html)
  if meta_charset:
    tags.append(f'<meta charset="{meta_charset}">')

  viewport_tag = match_first(r"(<meta\b[^>]*name=[\"']viewport[\"'][^>]*>)", head_html)
  if viewport_tag:
    tags.append(viewport_tag)

  for link_tag in re.findall(r"<link\b[^>]*>", head_html, re.IGNORECASE):
    href_match = re.search(r"href=[\"']([^\"']+)[\"']", link_tag, re.IGNORECASE)
    href = href_match.group(1) if href_match else ""
    if not href or is_codepen_asset(href):
      continue
    tags.append(link_tag)

  for script_tag in re.findall(r"<script\b[^>]*src=[^>]*></script>", head_html, re.IGNORECASE | re.DOTALL):
    src_match = re.search(r"src=[\"']([^\"']+)[\"']", script_tag, re.IGNORECASE)
    src = src_match.group(1) if src_match else ""
    if not src or is_codepen_asset(src):
      continue
    tags.append(script_tag)

  unique_tags: list[str] = []
  seen: set[str] = set()
  for tag in tags:
    if tag not in seen:
      seen.add(tag)
      unique_tags.append(tag)
  return tuple(unique_tags)


def extract_inline_scripts(inner_html: str) -> tuple[str, str, tuple[str, ...]]:
  script_pattern = re.compile(r"<script\b([^>]*)>(.*?)</script>", re.IGNORECASE | re.DOTALL)
  inline_parts: list[str] = []
  external_body_tags: list[str] = []
  script_type = "text/javascript"

  for attrs, content in script_pattern.findall(inner_html):
    src_match = re.search(r"src=[\"']([^\"']+)[\"']", attrs, re.IGNORECASE)
    if src_match:
      src = src_match.group(1)
      if not is_codepen_asset(src):
        external_body_tags.append(f"<script{attrs}></script>")
      continue

    cleaned = content.strip()
    if not cleaned:
      continue
    if "window.console = window.console || function" in cleaned:
      continue
    if "//# sourceURL=pen.js" in cleaned:
      cleaned = cleaned.replace("//# sourceURL=pen.js", "").strip()

    type_match = re.search(r"type=[\"']([^\"']+)[\"']", attrs, re.IGNORECASE)
    current_type = (type_match.group(1).strip().lower() if type_match else "text/javascript")
    if current_type == "module":
      script_type = "module"
    inline_parts.append(cleaned)

  unique_body_tags: list[str] = []
  seen: set[str] = set()
  for tag in external_body_tags:
    if tag not in seen:
      seen.add(tag)
      unique_body_tags.append(tag)

  return "\n\n".join(inline_parts).strip(), script_type, tuple(unique_body_tags)


def extract_title(inner_html: str, pen_id: str) -> str:
  title = match_first(r"<title>(.*?)</title>", inner_html)
  return title or f"CodePen {pen_id}"


def build_index_html(extracted: ExtractedPen) -> str:
  head_parts = ["<meta charset=\"UTF-8\">", f"<title>{html.escape(extracted.title)}</title>"]

  for tag in extracted.external_head_tags:
    if tag.startswith("<meta charset"):
      continue
    head_parts.append(tag)

  if extracted.style_css:
    head_parts.append('<link rel="stylesheet" href="./style.css">')

  body_parts = [extracted.body_html]
  body_parts.extend(extracted.external_body_tags)
  if extracted.script_js:
    script_attr = ' type="module"' if extracted.script_type == "module" else ""
    body_parts.append(f'<script{script_attr} src="./script.js"></script>')

  joined_head = "\n  ".join(head_parts)
  joined_body = "\n  ".join(part for part in body_parts if part.strip())
  return (
    "<!DOCTYPE html>\n"
    "<html lang=\"en\">\n"
    "<head>\n"
    f"  {joined_head}\n"
    "</head>\n"
    "<body>\n"
    f"  {joined_body}\n"
    "</body>\n"
    "</html>\n"
  )


def extract_pen(inner_html: str, pen_id: str) -> ExtractedPen:
  body_html = extract_body_html(inner_html)
  style_css = extract_inline_styles(inner_html)
  script_js, script_type, external_body_tags = extract_inline_scripts(inner_html)
  external_head_tags = extract_external_head_tags(inner_html)
  title = extract_title(inner_html, pen_id)
  return ExtractedPen(
    title=title,
    body_html=body_html,
    style_css=style_css,
    script_js=script_js,
    script_type=script_type,
    external_head_tags=external_head_tags,
    external_body_tags=external_body_tags,
  )


def write_text(file_path: Path, content: str) -> None:
  file_path.write_text(content.rstrip() + "\n", encoding="utf-8")


def sanitize_dir_name(name: str) -> str:
  cleaned = re.sub(r"[\\/:*?\"<>|]", " ", name).strip()
  cleaned = re.sub(r"\s+", " ", cleaned)
  cleaned = cleaned.rstrip(". ")
  return cleaned


def build_default_dir_name(title: str, pen_id: str) -> str:
  base_name = sanitize_dir_name(title) or f"codepen_{pen_id}"
  timestamp = dt.datetime.now().strftime("%Y%m%d_%H%M%S")
  return f"{base_name}_{timestamp}"


def ensure_output_dir(output_arg: str | None, title: str, pen_id: str) -> Path:
  if output_arg:
    output_dir = Path(output_arg)
  else:
    base_dir_name = build_default_dir_name(title, pen_id)
    output_dir = Path("downloads") / base_dir_name
    counter = 1
    while output_dir.exists():
      output_dir = Path("downloads") / f"{base_dir_name}_{counter:02d}"
      counter += 1

  output_dir.mkdir(parents=True, exist_ok=True)
  return output_dir.resolve()


def print_saved_files(files: Iterable[Path]) -> None:
  print("已生成文件：")
  for file_path in files:
    print(f"- {file_path}")


def main() -> int:
  args = parse_args()

  try:
    pen_info = parse_codepen_url(args.url)

    fullpage_html = fetch_text(
      pen_info.fullpage_url,
      timeout=args.timeout,
      referer=pen_info.referer_url,
    )
    srcdoc_html = extract_srcdoc(fullpage_html)
    extracted = extract_pen(srcdoc_html, pen_info.pen_id)
    index_html = build_index_html(extracted)
    output_dir = ensure_output_dir(args.output, extracted.title, pen_info.pen_id)

    saved_files: list[Path] = []

    index_path = output_dir / "index.html"
    write_text(index_path, index_html)
    saved_files.append(index_path)

    if extracted.style_css:
      style_path = output_dir / "style.css"
      write_text(style_path, extracted.style_css)
      saved_files.append(style_path)

    if extracted.script_js:
      script_path = output_dir / "script.js"
      write_text(script_path, extracted.script_js)
      saved_files.append(script_path)

    if args.save_raw:
      raw_path = output_dir / "raw_fullpage.html"
      write_text(raw_path, fullpage_html)
      saved_files.append(raw_path)

    print(f"下载成功: {pen_info.referer_url}")
    print(f"输出目录: {output_dir}")
    print_saved_files(saved_files)
    return 0
  except Exception as exc:  # noqa: BLE001 - 极简脚本，统一出口更直观
    print(f"错误: {exc}", file=sys.stderr)
    return 1


if __name__ == "__main__":
  raise SystemExit(main())
