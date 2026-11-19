import { useRef, useEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'
import useSeasonStats from '../../hooks/useSeasonStats'
import { seasonTiles, seasonTitle } from '../../lib/seasonTiles'
import ClubsGrid from '../Clubs/ClubsGrid'

gsap.registerPlugin(ScrollTrigger)


const LINE = 'brand.amberLight'

function Label({ children, color = 'brand.gray', ...rest }) {
  return (
    <Text fontSize="10px" fontWeight="bold" letterSpacing="0.24em" textTransform="uppercase" color={color} {...rest}>
      {children}
    </Text>
  )
}

// Con datos de la API, Goles va en el número grande (como en playerData).
function apiItems(season) {
  const tiles = seasonTiles(season)
  const goals = tiles.find((t) => t.label === 'Goles')
  return goals ? [goals, ...tiles.filter((t) => t !== goals)] : tiles
}

function ScoreBoard({ items }) {
  const [main, ...rest] = items
  const hlLabel = 'Valoración'
  return (
    <Grid data-reveal templateColumns={{ base: '1fr', lg: '1.1fr 1fr' }} gap="2px" bg={LINE} border="1px solid" borderColor={LINE}>
      <Flex direction="column" justify="space-between" gap={{ base: 2.5, lg: 0 }} bg="brand.amber" color="brand.dark" px={{ base: 6, lg: '38px' }} py={{ base: 6, lg: '34px' }} minH={{ lg: '340px' }}>
        <Text fontSize="12px" fontWeight="bold" letterSpacing="0.24em" textTransform="uppercase">{main.label}</Text>
        <Text className="tab" fontFamily="heading" fontWeight="bold" fontSize={{ base: '44vw', lg: 'clamp(150px, 24vw, 340px)' }} lineHeight={0.78} letterSpacing="-0.02em">
          {main.value}
        </Text>
        
      </Flex>
      <Grid templateColumns="repeat(2, 1fr)" gap="2px">
        {rest.map((s, i) => {
          const wide = i === rest.length - 1 && rest.length % 2 === 1
          const hl = s.label === hlLabel
          return (
            <Flex
              key={s.label}
              bg="brand.dark2"
              p={{ base: '18px', lg: '24px 26px' }}
              gap="18px"
              gridColumn={wide ? 'span 2' : undefined}
              direction={wide ? 'row' : 'column'}
              justify="space-between"
              align={wide ? 'flex-end' : 'stretch'}
            >
              <Label>{s.label}</Label>
              <Text className="tab" fontFamily="heading" fontWeight="bold" fontSize={{ base: '34px', lg: 'clamp(40px, 4vw, 62px)' }} lineHeight={0.9} color={hl ? 'brand.dorado' : 'brand.bone'}>
                {s.value}
              </Text>
            </Flex>
          )
        })}
      </Grid>
    </Grid>
  )
}

function Profile() {
  const p = playerData
  const items = [
    ['Posición', p.position], ['Pie hábil', p.foot], ['Edad', `${p.age} años`],
    ['Altura', p.height], ['Peso', p.weight], ['Origen', p.birthPlace],
  ]
  return (
    <Grid data-reveal templateColumns={{ base: 'repeat(2, 1fr)', lg: 'repeat(6, 1fr)' }} mt="34px" borderTop="1px solid" borderBottom="1px solid" borderColor={LINE}>
      {items.map(([l, v], i) => (
        <Box
          key={l}
          py={{ base: 3, lg: 4 }}
          px={{ base: 0, lg: '18px' }}
          pl={{ lg: i === 0 ? 0 : '18px' }}
          borderLeft={{ base: 0, lg: i === 0 ? 0 : '1px solid' }}
          borderTop={{ base: i < 2 ? 0 : '1px solid', lg: 0 }}
          borderColor={LINE}
        >
          <Label mb="6px" letterSpacing="0.22em">{l}</Label>
          <Text fontSize="16px" fontWeight="500">{v}</Text>
        </Box>
      ))}
    </Grid>
  )
}

function Attributes() {
  return (
    <Grid data-reveal templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={{ base: 4, lg: '22px 48px' }} mt="38px">
      {playerData.stats.map(({ label, value }) => {
        const on = Math.round(value / 10)
        return (
          <Box key={label}>
            <Flex justify="space-between" align="baseline" mb="10px">
              <Text fontSize="12px" letterSpacing="0.16em" textTransform="uppercase" color="brand.gray2">{label}</Text>
              <Text className="tab" fontSize="22px" fontWeight="bold" color="brand.amber">{value}</Text>
            </Flex>
            <Grid templateColumns="repeat(10, 1fr)" gap="3px" role="img" aria-label={`${label}: ${value} de 100`}>
              {Array.from({ length: 10 }, (_, i) => (
                <Box key={i} data-seg h="8px" bg={i < on ? 'brand.amber' : 'whiteAlpha.100'} transformOrigin="left" />
              ))}
            </Grid>
          </Box>
        )
      })}
    </Grid>
  )
}

function ScorerBlock() {
  const list = playerData.scorer || []
  if (!list.length) return null
  const count = (k) => list.filter((x) => x.k === k).length
  const parts = [[count('torneo'), 'de torneo'], [count('copa'), 'de copa'], [count('equipo'), 'del equipo']].filter(([n]) => n)

  return (
    <Grid
      data-reveal
      aria-label="Veces goleador"
      mt={{ base: 10, lg: 14 }}
      pt={{ base: 5, lg: 7 }}
      borderTop="2px solid"
      borderColor="brand.amber"
      templateColumns={{ base: '1fr', lg: '260px minmax(0, 1fr)' }}
      gap={{ base: 4, lg: 7 }}
    >
      <Flex direction={{ base: 'row', lg: 'column' }} justify={{ base: 'flex-start', lg: 'space-between' }} align={{ base: 'flex-end', lg: 'stretch' }} gap={4}>
        <Box>
          <Label color="brand.dorado" fontSize="11px" letterSpacing="0.28em">Destacado</Label>
          <Text fontFamily="heading" fontWeight="bold" fontSize={{ base: '96px', lg: '150px' }} lineHeight={0.8} color="brand.amber" mt={{ base: 0, lg: 3.5 }} letterSpacing="-0.03em">
            {list.length}
            <Box as="span" fontSize={{ base: '36px', lg: '56px' }} color="brand.bone" ml="4px">×</Box>
          </Text>
        </Box>
        <Box>
          <Text as="h3" fontFamily="heading" fontWeight="bold" fontSize={{ base: '20px', lg: '26px' }} textTransform="uppercase" lineHeight={1}>Veces goleador</Text>
          
        </Box>
      </Flex>

      <Box
        as="ul"
        listStyleType="none"
        display={{ base: 'flex', lg: 'grid' }}
        gridTemplateColumns={{ lg: 'repeat(5, minmax(0, 1fr))' }}
        gap="10px"
        overflowX={{ base: 'auto', lg: 'visible' }}
        mx={{ base: -5, lg: 0 }}
        px={{ base: 5, lg: 0 }}
        pb={{ base: 1.5, lg: 0 }}
        sx={{ scrollSnapType: { base: 'x mandatory', lg: 'none' }, scrollPaddingInline: '20px', scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {list.map((x) => {
          const top = x.k === 'torneo'
          return (
            <Flex
              as="li"
              key={`${x.comp}-${x.year}`}
              data-card
              position="relative"
              direction="column"
              overflow="hidden"
              flex={{ base: '0 0 62%', lg: 'initial' }}
              sx={{ scrollSnapAlign: 'start' }}
              bg="brand.dark2"
              border="1px solid"
              borderColor={top ? 'brand.amber' : LINE}
              p="18px 16px 16px"
              _before={top ? { content: '""', position: 'absolute', inset: '0 0 auto', h: '4px', bg: 'brand.amber' } : undefined}
            >
              <Image src={x.logo} alt="" aria-hidden="true" position="absolute" right="-18px" bottom="-18px" boxSize="110px" objectFit="contain" opacity={0.07} filter="grayscale(1)" />
              <Image src={x.logo} alt={`Escudo de ${x.club}`} boxSize="42px" objectFit="contain" loading="lazy" />
              <Text className="tab" mt={4} fontFamily="heading" fontWeight="bold" fontSize="44px" lineHeight={1} color={top ? 'brand.amber' : 'brand.bone'}>
                {x.goals}
                <Box as="span" fontSize="11px" letterSpacing="0.18em" color="brand.gray" ml="6px" textTransform="uppercase">goles</Box>
              </Text>
              <Label color="brand.dorado" fontSize="11px" letterSpacing="0.16em" mt={3}>{x.title}</Label>
              <Text mt="6px" fontSize="15px" fontWeight="bold" textTransform="uppercase" lineHeight={1.15}>{x.comp}</Text>
              <Text mt="auto" pt={3} fontSize="11px" color="brand.gray">{x.club} · {x.year}</Text>
            </Flex>
          )
        })}
      </Box>
    </Grid>
  )
}

export default function StatsMarcador() {
  const sectionRef = useRef(null)
  // Temporada en curso desde API-Football; sin datos, los valores fijos.
  const season = useSeasonStats()
  const seasonItems = season ? apiItems(season) : playerData.seasonStats

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const root = sectionRef.current
      gsap.utils.toArray('[data-reveal]', root).forEach((el) => {
        gsap.from(el, {
          y: 30, opacity: 0, duration: 1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        })
      })
      gsap.from(gsap.utils.toArray('[data-seg]', root), {
        scaleX: 0, duration: 0.6, ease: 'expo.out', stagger: 0.012,
        scrollTrigger: { trigger: root.querySelector('[data-seg]'), start: 'top 90%', once: true },
      })
      gsap.from(gsap.utils.toArray('[data-card]', root), {
        y: 24, opacity: 0, duration: 0.9, ease: 'expo.out', stagger: 0.08,
        scrollTrigger: { trigger: root.querySelector('[data-card]'), start: 'top 90%', once: true },
      })
    }, sectionRef)
    return () => mm.revert()
  }, [])

  return (
    <Box as="section" id="estadisticas" ref={sectionRef} position="relative" bg="brand.dark" px={{ base: 5, md: 12, lg: '60px' }} py={{ base: 16, lg: 24 }} overflow="clip">
      <Box maxW="1400px" mx="auto">
        <Box data-reveal mb={{ base: 7, lg: 11 }}>
          <Label color="brand.dorado" fontSize="11px" letterSpacing="0.28em">{seasonTitle(season, `Temporada ${playerData.season}`)}</Label>
          <Text as="h2" mt={2} fontFamily="heading" fontWeight="bold" fontSize={{ base: '44px', lg: 'clamp(44px, 5.4vw, 84px)' }} lineHeight={0.9} color="brand.amber" textTransform="uppercase">
            Estadísticas
          </Text>
        </Box>

        <ScoreBoard items={seasonItems} />
        <Profile />
        <Attributes />
        <ScorerBlock />
        <ClubsGrid />
      </Box>
    </Box>
  )
}
