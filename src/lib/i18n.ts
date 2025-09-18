type Dict = Record<string, string>;
type Dictionaries = Record<string, Dict>;

const en: Dict = {
	'nav.home': 'Home',
	'nav.docs': 'Docs',
	'nav.builder': 'Builder',
	'nav.validate': 'Validate',

	'hero.title': 'HeartCheck: a simple /heart endpoint',
	'hero.desc':
		'One lightweight JSON-LD response for ethics transparency — governance links, key contacts, and optional self‑assessed metrics.',
	'hero.cta': 'Deploy your /heart',
	'hero.subhead': 'Ready in minutes. No backend required.',

	'docs.sidebar.rfc': 'RFC',
	'docs.sidebar.spec': 'Spec',
	'docs.sidebar.examples': 'Examples',
	'docs.sidebar.faq': 'FAQ',
	'docs.sidebar.validate': 'Validate',
	'docs.sidebar.viral': 'Viral Toolkit',
	'docs.sidebar.present': 'Present',
	'docs.sidebar.print': 'Print'
};

const es: Dict = {
	'nav.home': 'Inicio',
	'nav.docs': 'Docs',
	'nav.builder': 'Constructor',
	'nav.validate': 'Validar',

	'hero.title': 'HeartCheck: un endpoint /heart simple',
	'hero.desc':
		'Una respuesta JSON-LD ligera para transparencia ética — enlaces de gobernanza, contactos clave y métricas autoevaluadas opcionales.',
	'hero.cta': 'Implementa tu /heart',
	'hero.subhead': 'Listo en minutos. No se requiere backend.',

	'docs.sidebar.rfc': 'RFC',
	'docs.sidebar.spec': 'Especificación',
	'docs.sidebar.examples': 'Ejemplos',
	'docs.sidebar.faq': 'Preguntas',
	'docs.sidebar.validate': 'Validar',
	'docs.sidebar.viral': 'Kit Viral',
	'docs.sidebar.present': 'Presentar',
	'docs.sidebar.print': 'Imprimir'
};

const dictionaries: Dictionaries = { en, es };

let currentLocale = 'en';
export function initI18n() {
	try {
		const stored = localStorage.getItem('locale');
		if (stored && dictionaries[stored]) currentLocale = stored;
		else if (navigator.language?.startsWith('es')) currentLocale = 'es';
	} catch {}
	try {
		document.documentElement.lang = currentLocale;
	} catch {}
}

export function setLocale(locale: string) {
	if (dictionaries[locale]) {
		currentLocale = locale;
		try {
			localStorage.setItem('locale', locale);
			document.documentElement.lang = locale;
		} catch {}
	}
}

export function getLocale() {
	return currentLocale;
}

export function t(key: string): string {
	const dict = dictionaries[currentLocale] || dictionaries.en;
	return dict[key] || dictionaries.en[key] || key;
}
