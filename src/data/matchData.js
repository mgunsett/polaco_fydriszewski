import junior from '@assets/junior.webp'

export function docToMatch(data) {
  return {
    home:      { name: data.home_team, shield: data.home_shield || null },
    away:      { name: data.away_team, shield: data.away_shield || null },
    homeScore: data.home_score ?? null,
    awayScore: data.away_score ?? null,
    date:      data.match_date,
    stadium:   data.stadium || '',
    competition: data.competition || '',
  }
}

// Datos de muestra: los reales se cargan desde /admin (Firebase)
export const defaultMatches = {
  last: {
    home:      { name: 'Junior', shield: junior },
    away:      { name: 'Millonarios', shield: null },
    homeScore: 2,
    awayScore: 1,
    date:      '09 Nov 2026',
    stadium:   'Metropolitano',
    competition: 'Liga BetPlay',
  },
  next: {
    home:      { name: 'Atl. Nacional', shield: null },
    away:      { name: 'Junior', shield: junior },
    homeScore: null,
    awayScore: null,
    date:      '23 Nov 2026 · 20:30',
    stadium:   'Atanasio Girardot',
    competition: 'Liga BetPlay',
  },
}
