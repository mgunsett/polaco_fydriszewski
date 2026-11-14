import { useState, useEffect, useRef } from 'react'
import { Box, Flex, Text, Grid, Icon } from '@chakra-ui/react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { playerData } from '../../data/playerData'

// Navbar "Portada": línea fina a todo el ancho, punto rojo en la sección activa
// y barra roja de progreso de lectura. En mobile, menú a pantalla completa.

const MotionBox = motion(Box)
const MotionA = motion.a
const EASE = [0.23, 1, 0.32, 1]

const navLinks = [
  { label: 'Inicio',       href: '#hero' },
  { label: 'Estadísticas', href: '#estadisticas' },
  { label: 'Videos',       href: '#videos' },
  { label: 'Galería',      href: '#galeria' },
  { label: 'Prensa',       href: '#prensa' },
]
const CONTACT = { label: 'Contacto', href: '#contact' }
const instagram = playerData.socialMedia.find((s) => s.label === 'Instagram')

const hoverOnly = (styles) => ({ '@media (hover: hover) and (pointer: fine)': { '&:hover': styles } })

function scrollTo(href) {
  const target = document.querySelector(href)
  if (!target) return
  if (window.__lenis) window.__lenis.scrollTo(target, { offset: -20 })
  else target.scrollIntoView({ behavior: 'smooth' })
}

// Sección visible ahora, para marcar el link activo
function useActiveSection() {
  const [active, setActive] = useState('#hero')
  useEffect(() => {
    const ids = [...navLinks, CONTACT].map((l) => l.href)
    const els = ids.map((id) => document.querySelector(id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return active
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const progressRef = useRef(null)
  const active = useActiveSection()
  const reduce = useReducedMotion()

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Con el menú abierto no se scrollea la página de fondo
  useEffect(() => {
    if (open) window.__lenis?.stop()
    else window.__lenis?.start()
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    // esperar a que se reactive Lenis antes de scrollear
    requestAnimationFrame(() => scrollTo(href))
  }

  const linkStyle = {
    fontFamily: 'mono',
    fontSize: '14px',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    transition: 'color 0.2s',
  }

  return (
    <MotionBox
      as="nav"
      aria-label="Principal"
      position="fixed"
      top={0}
      insetX={0}
      zIndex={1000}
      pt="env(safe-area-inset-top, 0px)"
      bg={scrolled && !open ? 'rgba(10,18,32,0.86)' : 'transparent'}
      backdropFilter={scrolled && !open ? 'blur(16px)' : 'none'}
      sx={{ transitionProperty: 'background', transitionDuration: '0.35s' }}
      initial={reduce ? false : { opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: EASE, delay: 0.3 }}
    >
      <Grid
        position="relative"
        templateColumns={{ base: '1fr auto', lg: '1fr auto 1fr' }}
        alignItems="center"
        h="68px"
        px="max(16px, 4vw)"
        borderBottom="1px solid"
        borderColor="brand.line"
      >
        {/* Nombre */}
        <Text
          as="a"
          href="#hero"
          onClick={(e) => go(e, '#hero')}
          fontFamily="heading"
          fontSize="22px"
          letterSpacing="0.08em"
          lineHeight={1}
          whiteSpace="nowrap"
          color="brand.cream"
          w="fit-content"
        >
          {playerData.name}{' '}
          <Box as="span" color="brand.red">{playerData.fullName}</Box>
        </Text>

        {/* Links desktop */}
        <Flex as="ul" listStyleType="none" gap="30px" display={{ base: 'none', lg: 'flex' }}>
          {navLinks.map((l) => {
            const current = active === l.href
            return (
              <li key={l.href}>
                <Text
                  as="a"
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  aria-current={current ? 'true' : undefined}
                  position="relative"
                  display="block"
                  py="8px"
                  fontWeight="500"
                  color={current ? 'brand.cream' : 'brand.mist'}
                  {...linkStyle}
                  _before={{
                    content: '""',
                    position: 'absolute',
                    left: '50%',
                    top: '-4px',
                    w: '5px',
                    h: '5px',
                    ml: '-2.5px',
                    borderRadius: 'full',
                    bg: 'brand.red',
                    opacity: current ? 1 : 0,
                    transform: current ? 'scale(1)' : 'scale(0)',
                    transition: 'opacity 0.3s, transform 0.3s cubic-bezier(0.23,1,0.32,1)',
                  }}
                  sx={hoverOnly({ color: 'brand.cream' })}
                >
                  {l.label}
                </Text>
              </li>
            )
          })}
        </Flex>

        {/* Derecha */}
        <Flex justify="flex-end" align="center" gap="20px">
          {instagram && (
            <Flex
              as="a"
              href={instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram de ${playerData.nickname}`}
              display={{ base: 'none', lg: 'grid' }}
              placeItems="center"
              w="36px"
              h="36px"
              borderRadius="full"
              border="1px solid"
              borderColor="brand.line"
              color="brand.cream"
              transition="border-color 0.2s, color 0.2s"
              sx={hoverOnly({ borderColor: 'brand.red', color: 'brand.redSoft' })}
            >
              <Icon as={instagram.icon} boxSize="15px" />
            </Flex>
          )}
          <Text
            as="a"
            href={CONTACT.href}
            onClick={(e) => go(e, CONTACT.href)}
            display={{ base: 'none', lg: 'block' }}
            py="9px"
            fontWeight="700"
            color="brand.cream"
            borderBottom="2px solid"
            borderColor="brand.red"
            {...linkStyle}
            sx={hoverOnly({ color: 'brand.redSoft' })}
          >
            {CONTACT.label}
          </Text>

          {/* Botón menú mobile */}
          <Flex
            as="button"
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            display={{ base: 'flex', lg: 'none' }}
            align="center"
            gap="10px"
            py="10px"
            pl="12px"
            fontFamily="mono"
            fontWeight="700"
            fontSize="14px"
            letterSpacing="0.2em"
            textTransform="uppercase"
            color="brand.cream"
          >
            {open ? 'Cerrar' : 'Menú'}
            <Box
              as="i"
              w="18px"
              h="2px"
              bg="brand.red"
              transition="transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s"
              boxShadow={open ? '0 0 0 var(--chakra-colors-brand-red)' : '0 6px 0 var(--chakra-colors-brand-red)'}
              transform={open ? 'rotate(45deg)' : 'translateY(-3px)'}
            />
          </Flex>
        </Flex>

        {/* Progreso de lectura */}
        <Box
          ref={progressRef}
          position="absolute"
          left={0}
          bottom="-1px"
          h="2px"
          w="100%"
          bg="brand.red"
          transformOrigin="left"
          transform="scaleX(0)"
          opacity={open ? 0 : 1}
        />
      </Grid>

      {/* Menú mobile a pantalla completa */}
      <AnimatePresence>
        {open && (
          <MotionBox
            id="menu-mobile"
            position="fixed"
            inset={0}
            zIndex={-1}
            bg="brand.ink"
            display={{ base: 'flex', lg: 'none' }}
            flexDir="column"
            justifyContent="space-between"
            pt="calc(96px + env(safe-area-inset-top, 0px))"
            pb="calc(32px + env(safe-area-inset-bottom, 0px))"
            px="max(16px, 6vw)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <Flex direction="column">
              {[...navLinks, CONTACT].map((l, i) => (
                <MotionA
                  key={l.href}
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  aria-current={active === l.href ? 'true' : undefined}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.03 + i * 0.04 }}
                  style={{ display: 'block' }}
                >
                  <Text
                    as="span"
                    display="block"
                    fontFamily="heading"
                    fontSize="min(13vw, 72px)"
                    lineHeight={1}
                    color={l === CONTACT ? 'brand.red' : 'brand.cream'}
                  >
                    {l.label}
                  </Text>
                </MotionA>
              ))}
            </Flex>
            {instagram && (
              <Text as="a" href={instagram.url} target="_blank" rel="noopener noreferrer"
                fontFamily="mono" fontSize="13px" letterSpacing="0.16em" textTransform="uppercase" color="brand.mist">
                {instagram.handle}
              </Text>
            )}
          </MotionBox>
        )}
      </AnimatePresence>
    </MotionBox>
  )
}
