const fs = require('fs');
const path = require('path');

const TARGETS = [
  { file: path.join('public', 'data', 'pwa_content.fr.final.json'), lang: 'fr' },
  { file: path.join('public', 'data', 'pwa_content.ar.final.json'), lang: 'ar' }
];

const SECTION_FIELDS = {
  diseases: ['title', 'disease_name', 'title_clean', 'summary', 'field_advice', 'clinical_signs', 'lesions', 'transmission', 'samples', 'treatment', 'notes'],
  procedures: ['title', 'content', 'notes'],
  symptom_maps: ['symptom_title', 'likely_diseases', 'notes']
};

const frExactTitleMap = new Map([
  ['Diagnostiquer une maladie', 'Diagnostiquer une maladie'],
  ["Techniques d’autopsie sur petits ruminants", "Techniques d'autopsie sur petits ruminants"],
  ["Techniques d'autopsie sur petits ruminants", "Techniques d'autopsie sur petits ruminants"],
  ["L’autopsie (ou examen nécropsique) est la continuation de l’examen cli-", "L'autopsie (ou examen nécropsique) est la continuité de l'examen clinique"],
  ["L’examen nécropsique est la continuation de l’examen clinique pratiqué", "Examen nécropsique après examen clinique"]
]);

const frExactSymptomMap = new Map([
  ["d’abattement.", 'Abattement'],
  ['abattement', 'Abattement'],
  ["d’un nombre élevé d’avortements et d’une forte mortalité chez", 'Avortements nombreux et mortalité élevée'],
  ["d’avortements et de métrites ;", 'Avortements et métrites'],
  ['Maladies de peau', 'Maladies cutanées'],
  ['DIARRHÉE ABONDANTE', 'Diarrhée abondante'],
  ['la diarrhée et sont maigres. Une forte infestation de douves du foie peut tuer', 'Diarrhée et amaigrissement']
]);

const arExactTitleMap = new Map([
  ['الفحص السريري', 'الفحص السريري'],
  ['بعض مخابر التشخيص الوطنية والدولية التي تمت تزكيتها', 'بعض مختبرات التشخيص الوطنية والدولية المعتمدة'],
  ['بعض مختبرات التشخيص واملرجعية الوطنية', 'بعض مختبرات التشخيص والمرجعية الوطنية'],
  ['التشخيص؛', 'التشخيص'],
  ['عمليات التشخيص التفريقي', 'التشخيص التفريقي'],
  ['مقدمة- تشريح الجثة', 'مقدمة: تشريح الجثة'],
  ['مقدمة- فحص تشريح الجثة', 'مقدمة: فحص تشريح الجثة'],
  ['طرق التعرف على العالمات السريرية ومن طرق أخذ العينات المناسبة وصوال إلىأخذ القرارات الالزمة وتنفيذها من طرف العاملين في', 'التعرف على العلامات السريرية وأخذ العينات المناسبة واتخاذ القرارات اللازمة']
]);

const arExactSymptomMap = new Map([
  ['مشية عادية دون عرج؛', 'مشية طبيعية دون عرج'],
  ['. وجود تشوهات وعرج وجروح', 'وجود تشوهات وعرج وجروح'],
  ['أمراض الجلد', 'أمراض جلدية'],
  ['إسهال دموي (في المرحلة الحادة).', 'إسهال دموي في المرحلة الحادة']
]);

const FR_REPLACEMENTS = [
  [/\becoulement au niveau du nez\b/gi, 'Écoulement nasal'],
  [/\bécoulement au niveau du nez\b/gi, 'Écoulement nasal'],
  [/\bforte mortalité chez les animaux\b/gi, 'Mortalité élevée'],
  [/\banimal\s+qui\s+ne\s+mange\s+pas\s+bien\b/gi, "Perte d'appétit"],
  [/\banimaux\s+qui\s+ne\s+mangent\s+pas\s+bien\b/gi, "Perte d'appétit"],
  [/\bdifficult[eé]\s+respiratoire\b/gi, 'Difficulté respiratoire'],
  [/\bsalivation\s+excessive\b/gi, 'Salivation excessive'],
  [/\bforte\s+mortalit[eé]\b/gi, 'Mortalité élevée']
];

const AR_REPLACEMENTS = [
  [/موت\s+كثير\s+للحيوانات/g, 'ارتفاع معدل النفوق'],
  [/سيلان\s+من\s+الأنف/g, 'إفرازات أنفية'],
  [/الحيوان\s+لا\s+يأكل\s+جيدا/g, 'فقدان الشهية'],
  [/صعوبة\s+في\s+التنفس/g, 'صعوبة التنفس'],
  [/لعاب\s+كثير/g, 'سيلان اللعاب'],
  [/النص يشير إلى أن العلاج الدوائي يمكن أن يعتمد على\.\.\. \(المعلومة مبتورة في الصفحة\)/g, 'المعلومة العلاجية غير مكتملة في الصفحة المرجعية']
];

function normalizeCommon(text) {
  return String(text ?? '')
    .replace(/\r\n?/g, '\n')
    .replace(/[\u200e\u200f\ufeff]/g, '')
    .replace(/[•▪◦]/g, ' ')
    .replace(/(?:\.\s*){3,}\s*\d*\s*$/g, '')
    .replace(/\.{3,}\s*\d*\s*$/g, '')
    .replace(/^\s*-{3,}\s*/g, '')
    .replace(/\s*-{3,}\s*/g, ' ')
    .replace(/\s*;\s*$/g, '')
    .replace(/\s+([,;:.!?])/g, '$1')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\s*\n\s*/g, ' ')
    .trim();
}

function applyRegexReplacements(text, replacements) {
  let out = text;
  for (const [re, val] of replacements) out = out.replace(re, val);
  return out;
}

function capitalizeFrench(text) {
  if (!text) return text;
  if (/^[0-9]/.test(text)) return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function cleanFrench(value, field, section) {
  let s = normalizeCommon(value)
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/\bdiagnostic_or_field_procedure\b/g, 'Procédure de terrain');

  s = applyRegexReplacements(s, FR_REPLACEMENTS);

  if (section === 'procedures' && field === 'title') {
    const key = s.replace(/\s+/g, ' ').trim();
    if (frExactTitleMap.has(key)) s = frExactTitleMap.get(key);
  }

  if (section === 'symptom_maps' && field === 'symptom_title') {
    const key = s.replace(/\s+/g, ' ').trim();
    if (frExactSymptomMap.has(key)) s = frExactSymptomMap.get(key);
  }

  if (field !== 'content') s = s.replace(/\s*\.$/, '');
  s = s.replace(/\s+/g, ' ').trim();

  if (['title', 'symptom_title', 'summary', 'field_advice', 'clinical_signs', 'lesions', 'transmission', 'samples', 'treatment', 'notes', 'likely_diseases'].includes(field)) {
    s = capitalizeFrench(s);
  }

  return s;
}

function cleanArabic(value, field, section) {
  let s = normalizeCommon(value)
    .replace(/\)؛112\(\s*/g, '')
    .replace(/\s*-\s*1\s*$/g, '')
    .replace(/^\.\s*/g, '')
    .replace(/\s*؛\s*$/g, '')
    .replace(/\s*\.\s*$/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  s = applyRegexReplacements(s, AR_REPLACEMENTS);

  if (section === 'procedures' && field === 'title') {
    const key = s.replace(/\s+/g, ' ').trim();
    if (arExactTitleMap.has(key)) s = arExactTitleMap.get(key);
    if (/الفحص السريري للحيوان الحي/.test(key)) s = 'الفحص السريري للحيوان الحي';
  }

  if (section === 'symptom_maps' && field === 'symptom_title') {
    const key = s.replace(/\s+/g, ' ').trim();
    if (arExactSymptomMap.has(key)) s = arExactSymptomMap.get(key);
  }

  return s.replace(/\s+/g, ' ').trim();
}

function cleanTextByLang(lang, value, field, section) {
  if (lang === 'fr') return cleanFrench(value, field, section);
  return cleanArabic(value, field, section);
}

function normalizeItem(item, section, lang, changes, file) {
  const fields = SECTION_FIELDS[section] || [];
  for (const field of fields) {
    if (!(field in item)) continue;
    const val = item[field];

    if (typeof val === 'string') {
      const cleaned = cleanTextByLang(lang, val, field, section);
      if (cleaned !== val) {
        changes.push({ file, section, field, before: val, after: cleaned });
        item[field] = cleaned;
      }
      continue;
    }

    if (Array.isArray(val)) {
      const next = val
        .map((entry) => (typeof entry === 'string' ? cleanTextByLang(lang, entry, field, section) : entry))
        .filter((entry) => !(typeof entry === 'string' && !entry.trim()));

      for (let i = 0; i < Math.min(val.length, next.length); i++) {
        if (typeof val[i] === 'string' && typeof next[i] === 'string' && val[i] !== next[i]) {
          changes.push({ file, section, field, before: val[i], after: next[i] });
        }
      }

      if (JSON.stringify(next) !== JSON.stringify(val)) {
        item[field] = next;
      }
    }
  }
}

function run() {
  const allChanges = [];

  for (const target of TARGETS) {
    const raw = fs.readFileSync(target.file, 'utf8');
    const data = JSON.parse(raw);

    for (const section of ['diseases', 'procedures', 'symptom_maps']) {
      const arr = Array.isArray(data[section]) ? data[section] : [];
      arr.forEach((item) => normalizeItem(item, section, target.lang, allChanges, target.file));
    }

    fs.writeFileSync(target.file, JSON.stringify(data, null, 2) + '\n', 'utf8');
  }

  const byFile = allChanges.reduce((acc, c) => {
    acc[c.file] = (acc[c.file] || 0) + 1;
    return acc;
  }, {});

  const report = {
    total_changes: allChanges.length,
    by_file: byFile,
    samples: allChanges.slice(0, 60)
  };

  fs.writeFileSync(path.join('scripts', 'harmonize-report.json'), JSON.stringify(report, null, 2), 'utf8');

  console.log('Total changes:', report.total_changes);
  console.log('By file:', report.by_file);
  console.log('Report:', path.join('scripts', 'harmonize-report.json'));
}

run();
