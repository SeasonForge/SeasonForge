import { detectDefaultLocale } from '../i18n/index.js';

// Global application state.
export const state = {
  games: [],
  activeGame: null,
  activeView: 'card', // 'card' or 'timeline'
  loading: false,
  error: null,
  lastUpdate: null,
  rawData: null,
  settings: {
    theme: 'dark',
    autoRefresh: true,
    notificationsEnabled: true,
    lang: detectDefaultLocale()
  }
};

export function setLanguage(lang) {
  if (lang === 'en' || lang === 'ru') {
    state.settings.lang = lang;
    localStorage.setItem('seasonforge_lang', lang);
    document.documentElement.lang = lang;
  }
  return state;
}

export function setGames(games) {
  state.games = Array.isArray(games) ? games : [];
  return state;
}

export function setRawData(data) {
  state.rawData = data || null;
  return state;
}

export function setActiveGame(game, saveToStorage = false) {
  state.activeGame = game ?? null;
  if (saveToStorage && game) {
    localStorage.setItem('lastGame', game.id);
  }
  return state;
}

export function setActiveView(view, saveToStorage = false) {
  if (['timeline', 'card', 'games', 'more'].includes(view)) {
    state.activeView = view;
  } else {
    state.activeView = 'card';
  }
  if (saveToStorage) {
    const mapping = {
      'timeline': 'Timeline',
      'card': 'Game Card',
      'games': 'Games',
      'more': 'More'
    };
    localStorage.setItem('lastView', mapping[state.activeView] || 'Game Card');
  }
  return state;
}

export function setLoading(isLoading) {
  state.loading = Boolean(isLoading);
  return state;
}

export function setError(error) {
  state.error = error ?? null;
  return state;
}

export function getState() {
  return state;
}
