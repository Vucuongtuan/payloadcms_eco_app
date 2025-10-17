'use client';

import { useI18nLink } from '@/context/I18nLinkContext';
import { useRouter, usePathname } from '@/i18n/routing';
import { useLocale } from 'next-intl';

export function useLocaleSwitch() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const { localizedUrl } = useI18nLink();

  const switchLocale = (newLocale: string) => {
    // Set cookie to remember preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000`; // 1 year

    const newPathname = localizedUrl || pathname;
    
    // Navigate to new locale
    router.push(newPathname, { locale: newLocale });
  };

  return { currentLocale, switchLocale };
}
