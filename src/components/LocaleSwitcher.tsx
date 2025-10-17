'use client';

import { useLocaleSwitch } from '@/hooks/useLocaleSwitch';

export default function LocaleSwitcher() {
  const { currentLocale, switchLocale } = useLocaleSwitch();

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLocale('vi')}
        className={`px-3 py-1 rounded ${
          currentLocale === 'vi' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        VI
      </button>
      <button
        onClick={() => switchLocale('en')}
        className={`px-3 py-1 rounded ${
          currentLocale === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-200'
        }`}
      >
        EN
      </button>
    </div>
  );
}
