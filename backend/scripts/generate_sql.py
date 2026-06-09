import re
import json
from pathlib import Path

path = Path('src/app/data/questions.ts')
text = path.read_text(encoding='utf-8')
pattern = re.compile(
    r"\{\s*id\s*:\s*(?P<id>\d+),\s*category\s*:\s*'(?P<category>(?:\\'|[^'])*)',\s*question\s*:\s*'(?P<question>(?:\\'|[^'])*)',\s*answer\s*:\s*'(?P<answer>(?:\\'|[^'])*)'\s*\}",
    re.S,
)
records = []
for m in pattern.finditer(text):
    rec = {
        'id': int(m.group('id')),
        'category': m.group('category').replace("\\'", "'"),
        'question': m.group('question').replace("\\'", "'"),
        'answer': m.group('answer').replace("\\'", "'"),
    }
    records.append(rec)
if not records:
    raise SystemExit('no questions parsed')
Path('backend/sqlgen.json').write_text(json.dumps(records, ensure_ascii=False, indent=2), encoding='utf-8')

categories = []
category_ids = {}
for rec in records:
    name = rec['category']
    if name not in category_ids:
        category_ids[name] = len(categories) + 1
        categories.append(name)

lines = [
    'create table if not exists categories (',
    '  id serial primary key,',
    '  name text not null unique',
    ');',
    '',
    'create table if not exists questions (',
    '  id integer primary key,',
    '  category_id integer not null references categories(id),',
    '  question text not null,',
    '  answer text',
    ');',
    '',
]
for cid, name in enumerate(categories, start=1):
    escaped = name.replace("'", "''")
    lines.append(f"insert into categories (id, name) values ({cid}, '{escaped}');")
lines.append('')
for rec in records:
    qid = rec['id']
    cid = category_ids[rec['category']]
    question = rec['question'].replace("'", "''")
    answer = rec['answer'].replace("'", "''") if rec['answer'] is not None else ''
    lines.append(
        f"insert into questions (id, category_id, question, answer) values ({qid}, {cid}, '{question}', '{answer}');"
    )
sql_text = '\n'.join(lines) + '\n'
output_path = Path('backend/src/main/resources/db/migration/V1__create_questions_categories.sql')
output_path.parent.mkdir(parents=True, exist_ok=True)
output_path.write_text(sql_text, encoding='utf-8')
print(f'Generated {len(records)} records to backend/sqlgen.json and SQL migration file at {output_path}')
