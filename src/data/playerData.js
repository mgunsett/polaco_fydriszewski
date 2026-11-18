import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoMdStats } from 'react-icons/io'

//Hero
import polaco1 from '@assets/polaco1.png'
import polaco2 from '@assets/polaco2.png'
import argentina from '@assets/argentina.webp'
import junior from '@assets/junior.webp'
import polacoJunior from '@assets/polaco-junior.webp'
//Escudos trayectoria
import escudoIndependiente from '@assets/escudos/escudo_indmedellin.webp'
import escudoNewells from '@assets/escudos/escudo_newells.webp'
import escudoSanlorenzo from '@assets/escudos/escudo_sanlorenzo.webp'
import escudoBarcelona from '@assets/escudos/escudo_barcelona.webp'
import escudoPortoviejo from '@assets/escudos/escudo_portoviejo.webp'
import escudoLugo from '@assets/escudos/escudo_lugo.webp'
import escudoArgentinos from '@assets/escudos/escudo_argentinos.webp'
import escudoAntofagasta from '@assets/escudos/escudo_antofagasta.webp'
import escudoVilladalmine from '@assets/escudos/escudo_villadalmine.webp'
import escudoAucas from '@assets/escudos/escudo_aucas.webp'
//Gallery
import image1 from '@assets/gallery/image1.webp'
import image2 from '@assets/gallery/image2.webp'
import image3 from '@assets/gallery/image3.webp'
import image4 from '@assets/gallery/image4.webp'
import image5 from '@assets/gallery/image5.webp'
import image6 from '@assets/gallery/image6.webp'
import image7 from '@assets/gallery/image7.webp'
//Video
import photoGraph from '@assets/perfil_video.webp'
//Prensa
import logo1 from '@assets/logos/logo1.webp'
import logo2 from '@assets/logos/logo2.webp'
import logo3 from '@assets/logos/logo3.webp'
//Redes
import transfermkt from '@assets/contact2.svg'
import ledsports from '@assets/contact3.webp'
import moon from '@assets/contact4.webp'


const name = 'POLACO'
const fullName = 'FYDRISZEWSKI'

export const playerData = {
  name,
  fullName,
  initials: `${name[0]}${fullName[0]}`, // iniciales para logos (PF)
  displayName: `${name} ${fullName}`,   // nombre completo para textos legales / alt
  number: 19,
  position: 'Delantero',
  positionShort: 'DEL',
  nationality: 'Argentina',
  nationalityFlag: argentina,
  age: 33,
  height: '1.85m',
  weight: '74kg',
  foot: 'Derecho',
  birthDate: '13 / 04 / 1993',
  birthPlace: 'Rosario, Argentina',
  currentClub: 'Junior de Barranquilla',
  logoCurrentClub: junior,
  image: polaco1,
  image2: polaco2,
  heroImage: polacoJunior, // recorte con la camiseta de Junior (Hero)
  heroAlt: 'Polaco Fydriszewski con los brazos cruzados y la camiseta de Junior',
  clubShort: 'Junior',
  season: '2025 | 2026',



  // Logros destacados (Hero). v = número o ícono, u = unidad, l = logro, d = club y año
  highlights: [
    { v: '15', u: 'goles',   l: 'Goleador de la Serie A',   d: 'Aucas · Ecuador 2022' },
    { v: '12', u: 'goles',   l: 'Goleador del Finalización', d: 'Ind. Medellín · Colombia 2025' },
    { v: '★',  u: 'campeón', l: 'Serie A de Ecuador',        d: 'Aucas · 2022' },
  ],

  // Veces goleador (Estadísticas). k: 'torneo' | 'copa' | 'equipo'
  scorer: [
    { goals: 15, title: 'Goleador del torneo', comp: 'Serie A de Ecuador',  club: 'Aucas',              year: '2022',    logo: escudoAucas,         k: 'torneo' },
    { goals: 12, title: 'Goleador del torneo', comp: 'Torneo Finalización', club: 'Ind. Medellín',      year: '2025',    logo: escudoIndependiente, k: 'torneo' },
    { goals: 5,  title: 'Goleador de la copa', comp: 'Copa Colombia',       club: 'Ind. Medellín',      year: '2025',    logo: escudoIndependiente, k: 'copa' },
    { goals: 13, title: 'Goleador del equipo', comp: 'Liga Pro Ecuador',    club: 'Liga Portoviejo',    year: '2020',    logo: escudoPortoviejo,    k: 'equipo' },
    { goals: 13, title: 'Goleador del equipo', comp: 'Primera B Nacional',  club: 'Argentinos Juniors', year: '2016/17', logo: escudoArgentinos,    k: 'equipo' },
  ],

  stats: [
    { label: 'Velocidad',      value: 81 },
    { label: 'Definición',     value: 91 },
    { label: 'Regate',         value: 84 },
    { label: 'Juego Aéreo',    value: 90 },
    { label: 'Presión Alta',   value: 82 },
    { label: 'Visión de Juego',value: 79 },
  ],

  seasonStats: [
    { label: 'Goles',       value: 28 },
    { label: 'Partidos jugados', value: 94 },
    { label: 'Asistencias', value: 2  },
    { label: 'Tiros al árco', value: 61 },
    { label: 'Min / Part.', value: "4,935'" },
    { label: 'Valoración', value: 7.4  },

  ],

  clubs: [
    {
      name:    'Junior de Barranquilla',
      country: 'Colombia',
      years:   '2026 — Actualidad',
      logo:    junior,
      titles:  [],
      info:    '',
    },
    {
      name:    'Independiente Medellín',
      country: 'Colombia',
      years:   '2025 — 2026',
      logo:    escudoIndependiente,
      titles:  [],
      info:    'Goleador del Torneo Finalización (12 goles)',
    },
    {
      name:    'San Lorenzo',
      country: 'Argentina',
      years:   '2024',
      logo:    escudoSanlorenzo,
      titles:  [],
      info:    '',
    },
    {
      name:    'Barcelona SC',
      country: 'Ecuador',
      years:   '2023 — 2024',
      logo:    escudoBarcelona,
      titles:  [],
      info:    '',
    },
    {
      name:    'Aucas',
      country: 'Ecuador',
      years:   '2021 — 2022',
      logo:    escudoAucas,
      titles:  ['Serie A Ecuador 2022'],
      info:    ['Goleador del Torneo (15 goles)', 'Goleador de la Copa Colombia (5 goles)'],
    },
    {
      name:    'Liga Portoviejo',
      country: 'Ecuador',
      years:   '2020',
      logo:    escudoPortoviejo,
      titles:  [],
      info:    'Máximo goleador del Equipo (13 goles)',
    },
    {
      name:    'Newell\'s Old Boys',
      country: 'Argentina',
      years:   '2018 — 2019',
      logo:    escudoNewells,
      titles:  [],
      info:    '',
    },
    {
      name:    'C.D. Lugo',
      country: 'España',
      years:   '2017 — 2018',
      logo:    escudoLugo,
      titles:  [],
      info:    '',
    },
    {
      name:    'Argentinos Juniors',
      country: 'Argentina',
      years:   '2016 — 2017',
      logo:    escudoArgentinos,
      titles:  ['Ascenso a Primera División 2016'],
      link:    'Préstamo',
      info:    ['Préstamo', 'Máximo goleador del Equipo (13 goles)'],
    },
    {
      name:    'Villa Dálmine',
      country: 'Argentina',
      years:   '2015',
      logo:    escudoVilladalmine,
      titles:  [],
      info:    '',
    },
    {
      name:    'Newell\'s Old Boys',
      country: 'Argentina',
      years:   '2014 — 2015',
      logo:    escudoNewells,
      titles:  [],
      info:    'Inferiores y debut en Primera División',
    },
  ],

  
  videos: [
    {
      id: 'v1',
      title: 'Temporada 2025 · Highlights',
      club: 'Ind. Medellín',
      league: 'Liga BetPlay 2025',
      year: '25',
      crest: escudoIndependiente,
      cover: photoGraph,
      youtubeId: 'UjDETwXdC9w',
    },
    // {
    //   id: 'v2',
    //   title: 'Goles con Junior',
    //   club: 'Junior',
    //   league: 'Liga BetPlay 2026',
    //   year: '26',
    //   crest: junior,
    //   cover: image1,
    //   instagram: 'CODIGO_DEL_REEL',
    // },
  ],

  press: [
    {
      media: 'ESPN Deportes',
      logo:  logo1,
      title: 'Fydriszewski marcó golazo agónico en Medellín vs. Juventud de Libertadores',
      date:  'Marzo 2026',
      summary: 'El gol del Polaco sobre el final ante Juventud por la Copa Libertadores.',
      url:   'https://espndeportes.espn.com/futbol/copa-libertadores/nota/_/id/16429009/medellin-vs-juventud-fydriszewski-video-goles-copa-libertadores',
    },
    {
      media: 'InfoBae',
      logo:  logo2,
      title: 'Cusco FC sufrió gol agónico de Fydriszewski con el que perdió a manos de Independiente por Copa Libertadores',
      date:  'Mayo 2026',
      summary: 'Su gol en la fecha 3 le dio el triunfo al Medellín ante Cusco.',
      url:   'https://www.infobae.com/peru/deportes/2026/05/01/cusco-fc-sufrio-gol-agonico-de-francisco-fydriszewski-con-el-que-perdio-a-manos-de-independiente-medellin-por-fecha-3-de-copa-libertadores-2026/',
    },
    {
      media: 'AS Colombia',
      logo:  logo3,
      title: 'Fydriszewski y su sueño con el DIM: “Estamos para jugar la final y levantar el título”',
      date:  'Octubre 2025',
      summary: 'Entrevista sobre su presente y los objetivos del equipo.',
      url:   'https://colombia.as.com/futbol/fydriszewski-y-su-sueno-con-el-dim-estamos-para-jugar-la-final-y-levantar-el-titulo-f202510-n/',
    },
  ],

  // Galería (carriles). category: 'cancha' | 'retrato'. pos = objectPosition
  galleryCats: { cancha: 'En cancha', retrato: 'Retratos' },
  gallery: [
    { id: 1, src: image1, alt: 'Hace el saludo militar tras un gol en la Copa Libertadores', category: 'cancha' },
    { id: 2, src: image2, alt: 'Remata al arco con Independiente Medellín',                    category: 'cancha' },
    { id: 3, src: image3, alt: 'Ataca el área entre defensores rivales',                       category: 'cancha' },
    { id: 4, src: image4, alt: 'Encara a la defensa con la camiseta blanca',                   category: 'cancha' },
    { id: 5, src: image5, alt: 'Posa con la pelota en su presentación en Medellín',            category: 'retrato' },
    { id: 6, src: image6, alt: 'Festeja un gol frente a la hinchada',                          category: 'cancha' },
    { id: 7, src: image7, alt: 'Controla la pelota con la camiseta suplente',                  category: 'cancha' },
  ],

  socialMedia: [
    {
      label: 'Instagram',
      icon: FaInstagram,
      iconBg: FaInstagram,
      handle: '@franciscofydriszewskiok',
      url: 'https://www.instagram.com/franciscofydriszewskiok/',
      hoverColor: '#E1306C',
      hoverGradient: 'insta-gradient',
    },
    {
      label: 'TransferMarkt',
      image: transfermkt,
      iconBg: IoMdStats,
      handle: '@franciscofydriszewski',
      url: 'https://www.transfermarkt.com.ar/francisco-fydriszewski/profil/spieler/337921',
      hoverColor: 'brand.dorado',
    },
  ],

  contact: [
    {
      title:      'Representante Deportivo',
      label:      'Moon Sports Group',
      image:       moon,
      handle:     '@moonsportsgroup_',
      url:        'https://www.instagram.com/moonsportsgroup_/',
      hoverColor: 'rgba(139,69,19,0.18)',
    },
    {
      title:      'Contacto Marketing',
      label:      'led sports marketing',
      image: ledsports,
      handle:     '@_ledsports',
      url:        'https://www.instagram.com/_ledsports/',
      hoverColor: 'rgba(212,168,75,0.18)',
    },
  ],
}
