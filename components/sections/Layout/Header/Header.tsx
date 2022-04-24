import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { HEADER_NAVIGATION } from 'data/headerNavigation';
import { LOCALES } from 'data/locales';
import AppLogo from 'public/icons/movapp-logo.png';
import { useLanguage } from 'utils/useLanguageHook';
import { useEffect } from 'react';

export const Header = () => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const { currentLanguage, domainLanguage } = useLanguage();

  // switches to correct page when page language is changed
  useEffect(() => {
    if (i18n.language === domainLanguage && router.asPath.includes(`wiki/uk-${domainLanguage}`)) {
      router.push(`/wiki/${domainLanguage}`);
    }
    if (i18n.language === 'uk' && router.asPath.includes(`wiki/${domainLanguage}`)) {
      router.push(`/wiki/uk-${domainLanguage}`);
    }

    /*eslint-disable react-hooks/exhaustive-deps */
  }, [i18n.language]);

  return (
    <header className=" bg-primary-blue w-full sticky top-0 z-10 h-14 hidden sm:block">
      <div className="max-w-7xl m-auto flex h-full justify-between items-center ">
        <Link href={'/'}>
          <a className="logo">
            <Image src={AppLogo} width={150} height={44} alt="Movapp logo" />
          </a>
        </Link>
        <nav className="w-full">
          <ul className="flex justify-end items-center pr-10">
            {HEADER_NAVIGATION.map(({ name, link }, index) => {
              const activePage = router.asPath.includes(link);
              return (
                <li
                  key={index}
                  className={`${activePage && 'border-b-2 border-b-primary-yellow'} hover:text-primary-yellow text-white mx-2 `}
                >
                  <Link href={link}>
                    <a>{t(name)}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        {LOCALES.map(({ name, locale }, index) => {
          return (
            <Link key={index} href={router.asPath} locale={locale}>
              <a>
                <span className={`text-white cursor-pointer mx-2 ${currentLanguage === locale && 'text-primary-yellow'}`}>{name}</span>
              </a>
            </Link>
          );
        })}
      </div>
    </header>
  );
};
