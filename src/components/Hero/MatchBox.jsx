import { Box, Flex, Text, Image } from '@chakra-ui/react'

// MatchBox "Marcador de TV": último resultado y próximo partido (datos de
// /admin vía useMatches). En desktop es una barra pegada abajo del hero; en
// mobile va debajo de los botones con los dos partidos apilados.
// Las variantes "Tarjeta con pestañas" y "Dos tickets" quedaron en el
// catálogo plantillas_skills (modelos/01-hero).

const hasScore = (m) => m?.homeScore !== null && m?.homeScore !== undefined && m?.awayScore !== null && m?.awayScore !== undefined

function Shield({ team, size = '32px' }) {
  if (team?.shield) return <Image src={team.shield} alt="" boxSize={size} objectFit="contain" flexShrink={0} />
  return (
    <Flex
      boxSize={size}
      flexShrink={0}
      align="center"
      justify="center"
      borderRadius="full"
      border="1px solid"
      borderColor="whiteAlpha.300"
      fontSize={`calc(${size} * 0.3)`}
      fontWeight="bold"
      color="brand.gray2"
      letterSpacing="0.04em"
    >
      {team?.name?.slice(0, 3).toUpperCase()}
    </Flex>
  )
}

function Label({ children, color = 'brand.dorado', ...rest }) {
  return (
    <Text fontSize="10px" fontWeight="bold" letterSpacing="0.24em" textTransform="uppercase" color={color} {...rest}>
      {children}
    </Text>
  )
}

function TickerRow({ m, label, accent }) {
  const score = hasScore(m)
  return (
    <Flex direction={{ base: 'column', lg: 'row' }} align={{ base: 'stretch', lg: 'center' }} gap={{ base: 2.5, lg: 4 }} minW={0} flex={1} py={{ base: 3, lg: 0 }}>
      <Flex flexShrink={0} justify="space-between" align="baseline">
        <Label color={accent}>{label}</Label>
        <Text display={{ base: 'block', lg: 'none' }} fontSize="10px" color="brand.gray" letterSpacing="0.04em">{m.competition} · {m.date}</Text>
      </Flex>
      <Flex align="center" gap={{ base: 2, lg: 3 }} minW={0} flex={1} justify={{ base: 'space-between', lg: 'flex-start' }}>
        <Shield team={m.home} size="28px" />
        <Text fontSize={{ base: '12px', lg: '13px' }} fontWeight="bold" textTransform="uppercase" noOfLines={1} minW={0}>{m.home.name}</Text>
        <Flex
          flexShrink={0}
          align="center"
          justify="center"
          minW="64px"
          h="34px"
          px={2}
          bg={score ? 'brand.amber' : 'transparent'}
          border="1.5px solid"
          borderColor={score ? 'brand.amber' : 'brand.dorado'}
          color={score ? 'brand.dark' : 'brand.dorado'}
          fontFamily="heading"
          fontWeight="bold"
          fontSize={score ? '20px' : '13px'}
          letterSpacing={score ? '0.04em' : '0.2em'}
          className="tab"
        >
          {score ? `${m.homeScore} – ${m.awayScore}` : 'VS'}
        </Flex>
        <Text fontSize={{ base: '12px', lg: '13px' }} fontWeight="bold" textTransform="uppercase" noOfLines={1} minW={0}>{m.away.name}</Text>
        <Shield team={m.away} size="28px" />
      </Flex>
      <Box display={{ base: 'none', xl: 'block' }} flexShrink={0} textAlign="right">
        <Text fontSize="11px" color="brand.gray2" letterSpacing="0.06em">{m.date}</Text>
        <Text fontSize="10px" color="brand.gray" letterSpacing="0.06em">{[m.competition, m.stadium].filter(Boolean).join(' · ')}</Text>
      </Box>
    </Flex>
  )
}

export function MatchTicker({ last, next }) {
  return (
    <Flex
      direction={{ base: 'column', lg: 'row' }}
      align={{ base: 'stretch', lg: 'center' }}
      gap={{ base: 0, lg: 8 }}
      bg={{ base: 'brand.dark2', lg: 'rgba(5,13,32,.88)' }}
      backdropFilter={{ lg: 'blur(14px)' }}
      borderTop="2px solid"
      borderColor="brand.amber"
      px={{ base: 4, lg: '60px' }}
      py={{ base: 1, lg: 4 }}
      sx={{ '& > * + *': { borderTop: { base: '1px solid', lg: 0 }, borderLeft: { base: 0, lg: '1px solid' }, borderColor: 'brand.amberLight', pl: { lg: 8 } } }}
    >
      <TickerRow m={last} label="Último" accent="brand.amber" />
      <TickerRow m={next} label="Próximo" accent="brand.dorado" />
    </Flex>
  )
}

export default MatchTicker
