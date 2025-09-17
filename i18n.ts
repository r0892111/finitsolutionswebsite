import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
 
// Can be imported from a shared config
const locales = ['en', 'nl'];
 
export default getRequestConfig(async ({locale}) => {
  return {
    messages: (await import(`./locales/${locale}/common.json`)).default
  };
});

export { locales };