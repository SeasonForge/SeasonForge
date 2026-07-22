// Service for loading and accessing season data.
import { CONFIG } from '../config.js';

export class SeasonService {
  /**
   * @param {string} [seasonsPath] - Optional override for the data path.
   *   Used by detail pages (game-page.js) that live in a subdirectory and need
   *   a relative path different from the default CONFIG value.
   *   Avoids mutating the shared CONFIG object.
   */
  constructor(seasonsPath) {
    this.seasonsPath = seasonsPath || CONFIG.data.seasonsPath;
  }

  async loadSeasons() {
    let fetchPath = this.seasonsPath || './data/seasons.json';
    if (typeof window !== 'undefined') {
      const isGamesSubdir = window.location.pathname.includes('/games/');
      if (isGamesSubdir && !fetchPath.startsWith('http') && !fetchPath.startsWith('/')) {
        fetchPath = '../../data/seasons.json';
      }
    }

    const response = await fetch(fetchPath);

    if (!response.ok) {
      throw new Error(`Unable to load season data: ${response.status}`);
    }

    return response.json();
  }

  async getGames() {
    const data = await this.loadSeasons();
    return Array.isArray(data.games) ? data.games : [];
  }

  async getGameById(id) {
    const games = await this.getGames();
    return games.find((game) => game.id === id || game.slug === id) ?? null;
  }

  async getActiveGame() {
    const games = await this.getGames();
    return games[0] ?? null;
  }
}
