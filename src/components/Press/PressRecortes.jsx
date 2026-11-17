import { useRef, useEffect } from 'react'
import { Box, Flex, Grid, Text, Image } from '@chakra-ui/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { playerData } from '../../data/playerData'

gsap.registerPlugin(ScrollTrigger)

// Prensa "Recortes": cada nota como un recorte de diario pegado con cinta,
// levemente torcido. Con el mouse se endereza y sube.

const EASE = 'cubic-bezier(0.23,1,0.32,1)'
const ROT = [-2, 1.5, -1]
const PAPER = '#EFEDE4'
const INK = '#102043'

export default function PressRecortes() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.from(gsap.utils.toArray('[data-reveal]', sectionRef.current), {
        y: 40, opacity: 0, duration: 1, ease: 'expo.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      })
    }, sectionRef)
    return () => mm.revert()
  }, [])

  return (
    <Box as="section" id="prensa" ref={sectionRef} bg="brand.dark" px={{ base: 5, md: 12, lg: '60px' }} py={{ base: 16, lg: 24 }} overflow="clip">
      <Box maxW="1400px" mx="auto">
        <Box data-reveal mb={{ base: 10, lg: 14 }}>
          <Text fontSize="11px" fontWeight="bold" color="brand.dorado" textTransform="uppercase" letterSpacing="0.28em">En los medios</Text>
          <Text as="h2" mt={2} fontFamily="heading" fontWeight="bold" fontSize={{ base: '44px', lg: 'clamp(44px, 5.4vw, 84px)' }} color="brand.amber" lineHeight={0.9} textTransform="uppercase">
            Prensa
          </Text>
        </Box>

        <Grid templateColumns={{ base: '1fr', lg: 'repeat(3, 1fr)' }} gap={{ base: '34px', lg: '40px' }} px={{ base: '6px', lg: '10px' }}>
          {playerData.press.map((p, i) => {
            const r = ROT[i % ROT.length]
            return (
              <Box key={p.url} data-reveal>
                <Box
                  as="a"
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Leer en ${p.media}: ${p.title}`}
                  position="relative"
                  display="block"
                  h="100%"
                  bg={PAPER}
                  color={INK}
                  p="30px 26px 26px"
                  transform={`rotate(${r}deg)`}
                  boxShadow="0 18px 40px rgba(0,0,0,.5)"
                  transition={`transform .4s ${EASE}`}
                  _before={{
                    content: '""', position: 'absolute', top: '-12px', left: '50%', w: '96px', h: '26px', ml: '-48px',
                    bg: 'rgba(224,40,28,.8)', transform: `rotate(${r * -2}deg)`,
                  }}
                  _focusVisible={{ outline: '3px solid', outlineColor: 'brand.dorado', outlineOffset: '4px' }}
                  sx={{ '@media (hover: hover) and (pointer: fine)': { '&:hover': { transform: 'rotate(0deg) translateY(-8px)' } } }}
                >
                  <Flex align="center" gap={3} pb="14px" borderBottom="2px solid" borderColor={INK}>
                    <Image src={p.logo} alt="" boxSize="40px" borderRadius="8px" objectFit="cover" />
                    <Text fontSize="12px" fontWeight="bold" letterSpacing="0.16em" textTransform="uppercase">{p.media}</Text>
                    <Text ml="auto" fontSize="11px" letterSpacing="0.12em" color="#5C6A8C" textTransform="uppercase">{p.date}</Text>
                  </Flex>
                  <Text as="h3" mt="18px" fontFamily="heading" fontWeight="bold" fontSize={{ base: '22px', lg: 'clamp(22px, 2vw, 28px)' }} lineHeight={1.1} textTransform="uppercase">
                    {p.title}
                  </Text>
                  {p.summary && <Text mt={3} fontSize="14px" lineHeight={1.5} color="#34446A">{p.summary}</Text>}
                  <Text as="span" display="inline-block" mt={5} fontSize="11px" fontWeight="bold" letterSpacing="0.18em" textTransform="uppercase" borderBottom="2px solid" borderColor="brand.dorado" pb="3px">
                    Leer la nota ↗
                  </Text>
                </Box>
              </Box>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
