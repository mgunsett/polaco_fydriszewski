import { FaInstagram, FaEnvelope } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { IoMdStats } from 'react-icons/io'

//Hero
import polaco1 from '@assets/polaco1.png'
import polaco2 from '@assets/polaco2.png'
import argentina from '@assets/argentina.webp'
import ind_medellin from '@assets/ind_medellin.png'
//Escudos trayectoria
import escudoIndependiente from '@assets/ind_medellin.png'
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
//Video
import photoGraph from '@assets/perfil_video.webp'
//Prensa
import logo1 from '@assets/logos/logo1.webp'
import logo2 from '@assets/logos/logo2.webp'
import logo3 from '@assets/logos/logo3.webp'
//Redes
import transfermkt from '@assets/contact2.svg'
import ledsports from '@assets/contact3.webp'


const name = 'POLACO'
const fullName = 'FIDRISZEWSKI'

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
  age: 30,
  height: '1.78m',
  weight: '68kg',
  foot: 'Derecho',
  birthDate: '25 / 04 / 1996',
  birthPlace: 'Eusebio Ayala, Paraguay',
  currentClub: 'Independiente Medellín',
  logoCurrentClub: ind_medellin,
  image: polaco1,
  image2: polaco2,

  stats: [
    { label: 'Velocidad',      value: 91 },
    { label: 'Definición',     value: 88 },
    { label: 'Regate',         value: 84 },
    { label: 'Juego Aéreo',    value: 75 },
    { label: 'Presión Alta',   value: 82 },
    { label: 'Visión de Juego',value: 79 },
  ],

  seasonStats: [
    { label: 'Partidos',    value: 19 },
    { label: 'Goles',       value: 3 },
    { label: 'Asistencias', value: 2  },
    { label: 'Tiros al árco', value: 28  },
    { label: 'Min / Part.', value: "1,470'" },
    { label: 'Valoración', value: 7.4  },

  ],

  clubs: [
    {
      name:    'Independiente Medellín',
      country: 'Colombia',
      years:   '2025 — Actualidad',
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
      title: 'Platense 2025',
      fullTitle: 'Polaco Fydriszewski | Temporada 2025 [Highlights]',
      youtubeId: 'UjDETwXdC9w',
      duration: '4:01',
      season: 'Temporada',
      league: 'Liga Dimayor Colombia 2025',
      thumbnail: photoGraph,
      cover: photoGraph,
      category: 'Highlights',
    },
  ],

  press: [
    {
      media: 'El Gráfico',
      logo:  logo1,
      title: 'Se ha inmortalizado en los libros de récords al convertirse en el máximo goleador del Torneo Clausura 2025',
      date:  'Diciembre 2025',
      url:   'https://www.elgrafico.com.ar/articulo/primera-division/95962/cuantas-veces-platense-tuvo-al-goleador-del-campeonato-de-primera-division',
    },
    {
      media: 'La Voz',
      logo:  logo2,
      title: 'El delantero paraguayo puso el 1-0 y fue clave en la noche feliz de la “T” ante Newell’s.',
      date:  'Enero 2026',
      url:   'https://www.lavoz.com.ar/deportes/futbol/ronaldo-martinez-figura-de-talleres-como-esta-de-la-lesion-y-por-que-festejo-a-lo-cristiano/',
    },
    {
      media: 'Cba24N',
      logo:  logo3,
      title: 'Convocado por la selección de Paraguay para participar en la próxima ventana internacional de la fecha FIFA',
      date:  'Marzo 2026',
      url:   'https://www.cba24n.com.ar/deportes/futbol/talleres/ronaldo-martinez--convocado-a-la-seleccion-de-paraguay-para-la-proxima-ventana-internacional_a69ac304f2128774661b1005d',
    },
  ],

  gallery: [
    { id: 1, src: image1, alt: 'Ronaldo Martínez disputando la pelota en la Liga Profesional 2024', caption: 'Liga Profesional 2024', category: 'Partido', aspect: 'wide' },
    { id: 2, src: image2, alt: 'Ronaldo Martínez celebrando un gol ante Racing',                   caption: 'Festejo ante Racing',    category: 'Festejo', aspect: 'tall' },
    { id: 3, src: image3, alt: 'Ronaldo Martínez durante el entrenamiento de pretemporada 2025',    caption: 'Pretemporada 2025',       category: 'Entrenamiento', aspect: 'square' },
    { id: 4, src: image4, alt: 'Ronaldo Martínez en partido de Copa Argentina 2024',                caption: 'Copa Argentina 2024',     category: 'Partido', aspect: 'wide' },
    { id: 5, src: image5, alt: 'Ronaldo Martínez junto al plantel de Talleres 2024',                caption: 'Plantel Talleres 2024',   category: 'Equipo',  aspect: 'wide' },
    { id: 6, src: image6, alt: 'Ronaldo Martínez en sesión fotográfica oficial 2024',               caption: 'Foto oficial 2024',       category: 'Retrato', aspect: 'tall' },
  ],

  socialMedia: [
    {
      label: 'Instagram',
      icon: FaInstagram,
      iconBg: FaInstagram,
      handle: '@ronaldoivan',
      url: 'https://www.instagram.com/ronaldoivan/',
      hoverColor: '#E1306C',
      hoverGradient: 'insta-gradient',
    },
    {
      label: 'TransferMarkt',
      image: transfermkt,
      iconBg: IoMdStats,
      handle: '@ronaldo-martinez',
      url: 'https://www.transfermarkt.com.ar/ronaldo-martinez/profil/spieler/567736',
      hoverColor: 'brand.brownLight',
    },
  ],

  contact: [
    {
      title:      'Representante Deportivo',
      label:      'Universal Twenty Two',
      icon:       FaEnvelope,
      handle:     '@twentytwo_sm',
      url:        'https://www.instagram.com/twentytwo_sm/',
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
