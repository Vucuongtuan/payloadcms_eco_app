
import type { Header as HeaderType } from '@/payload-types'
import { findGlobal } from '@/service/layout'
import { Lang } from '@/types'
import HeaderClient from './header.client'

export async function Header({lang}: {lang: Lang}) {
  const header = await findGlobal<HeaderType>(lang,'header')
  if (!header) return null
  return (
    <header className="fixed top-0 left-0 w-full bg-white/80 backdrop-blur-sm z-50 shadow-sm">
       <HeaderClient navData={header.navItems} />
    </header>
  ) 
}
