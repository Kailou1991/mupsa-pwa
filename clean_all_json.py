#!/usr/bin/env python3
import json
import re
import zipfile
from dataclasses import dataclass
from pathlib import Path
from typing import Any


@dataclass
class Stats:
    files_analyzed: int = 0
    files_valid: int = 0
    files_corrected: int = 0
    files_invalid: int = 0
    fragments_removed: int = 0
    lines_merged: int = 0


def should_merge_lines(current: str, nxt: str) -> bool:
    if not current or not nxt:
        return False
    if re.match(r"^\s*([-*•]|\d+[.)-])\s+", current):
        return False
    if re.match(r"^\s*([-*•]|\d+[.)-])\s+", nxt):
        return False
    if re.search(r"[.!?:;]\s*$", current):
        return False
    if current.endswith("-"):
        return True
    if re.search(r"[A-Za-zÀ-ÿ]$", current) and re.match(r"^[a-zà-ÿ]", nxt):
        return True
    return False


def clean_text(text: str, stats: Stats) -> str:
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    text = text.replace("\u00A0", " ").replace("\u200B", "")

    text, n = re.subn(r"(?:\.\s*){5,}|\.{5,}", " ", text)
    stats.fragments_removed += n

    text, n = re.subn(r"\(\s*\d{2,4}\s*\)", " ", text)
    stats.fragments_removed += n

    text, n = re.subn(r"(?im)^\s*[Yy]{1,2}\s+", "", text)
    stats.fragments_removed += n

    lines = text.split("\n")
    compact_lines = []
    for line in lines:
        line = re.sub(r"[ \t]{2,}", " ", line).strip()
        if not line:
            stats.fragments_removed += 1
            continue

        # Remove numeric prefixes left by PDF extraction (e.g. "203 Texte", "12. Texte")
        new_line, n = re.subn(r"^\d{1,4}\s*[-.:)]\s*", "", line)
        if n:
            line = new_line.strip()
            stats.fragments_removed += 1
        else:
            new_line, n2 = re.subn(r"^\d{1,4}\s+", "", line)
            if n2:
                line = new_line.strip()
                stats.fragments_removed += 1

        if re.fullmatch(r"\d{1,4}", line):
            stats.fragments_removed += 1
            continue
        if re.fullmatch(r"[\W_]+", line):
            stats.fragments_removed += 1
            continue

        m = re.match(r"^(.*\D)\s+(\d{1,4})$", line)
        if m:
            left = m.group(1).strip()
            if len(left.split()) >= 2 and not re.search(r"\d", left):
                line = left
                stats.fragments_removed += 1

        compact_lines.append(line)

    merged_lines = []
    i = 0
    while i < len(compact_lines):
        if i + 1 < len(compact_lines) and should_merge_lines(compact_lines[i], compact_lines[i + 1]):
            left = compact_lines[i].rstrip()
            right = compact_lines[i + 1].lstrip()
            if left.endswith("-"):
                merged = f"{left[:-1]}{right}"
            else:
                merged = f"{left} {right}"
            merged_lines.append(merged.strip())
            stats.lines_merged += 1
            i += 2
            continue
        merged_lines.append(compact_lines[i])
        i += 1

    text = "\n".join(merged_lines)
    text = re.sub(r"\s+([,;:.!?])", r"\1", text)
    text = re.sub(r"[ \t]{2,}", " ", text)
    text = re.sub(r"\n{2,}", "\n", text)
    return text.strip()


def clean_value(value: Any, stats: Stats) -> Any:
    if isinstance(value, str):
        return clean_text(value, stats)

    if isinstance(value, list):
        cleaned_items = [clean_value(item, stats) for item in value]

        if all(isinstance(item, str) for item in cleaned_items):
            seen = set()
            deduped = []
            for item in cleaned_items:
                item = item.strip()
                if not item:
                    stats.fragments_removed += 1
                    continue
                if item in seen:
                    stats.fragments_removed += 1
                    continue
                seen.add(item)
                deduped.append(item)
            return deduped
        return cleaned_items

    if isinstance(value, dict):
        return {k: clean_value(v, stats) for k, v in value.items()}

    return value


def make_zip(folder: Path, zip_path: Path) -> None:
    if zip_path.exists():
        zip_path.unlink()
    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for file_path in folder.rglob("*"):
            if file_path.is_file():
                zf.write(file_path, file_path.relative_to(folder.parent))


def main() -> None:
    root = Path(__file__).resolve().parent
    out_root = root / "clean_json"
    out_root.mkdir(parents=True, exist_ok=True)

    stats = Stats()
    invalid_files: list[str] = []

    json_files = sorted(
        p for p in root.rglob("*.json") if out_root not in p.parents
    )

    for json_file in json_files:
        stats.files_analyzed += 1
        rel = json_file.relative_to(root)

        data = None
        load_error = None
        for encoding in ("utf-8", "utf-8-sig"):
            try:
                with json_file.open("r", encoding=encoding) as f:
                    data = json.load(f)
                load_error = None
                break
            except Exception as exc:
                load_error = exc

        if load_error is not None:
            stats.files_invalid += 1
            invalid_files.append(str(rel))
            continue

        stats.files_valid += 1
        cleaned = clean_value(data, stats)
        if cleaned != data:
            stats.files_corrected += 1

        out_file = out_root / rel
        out_file.parent.mkdir(parents=True, exist_ok=True)
        with out_file.open("w", encoding="utf-8") as f:
            json.dump(cleaned, f, ensure_ascii=False, indent=2)
            f.write("\n")

    zip_path = root / "clean_json_package.zip"
    make_zip(out_root, zip_path)

    print("=== RAPPORT FINAL ===")
    print(f"Fichiers JSON analyses : {stats.files_analyzed}")
    print(f"Fichiers JSON valides   : {stats.files_valid}")
    print(f"Fichiers JSON corriges  : {stats.files_corrected}")
    print(f"Fichiers JSON ignores   : {stats.files_invalid}")
    print(f"Fragments supprimes     : {stats.fragments_removed}")
    print(f"Lignes fusionnees       : {stats.lines_merged}")
    print(f"Dossier de sortie       : {out_root}")
    print(f"ZIP genere              : {zip_path}")

    if invalid_files:
        print("\nJSON invalides ignores :")
        for path in invalid_files:
            print(f"- {path}")


if __name__ == "__main__":
    main()



