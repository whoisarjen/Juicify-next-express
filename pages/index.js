import Link from 'next/link'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

export default function Home() {
  const router = useRouter()
  const { t } = useTranslation('home')

  return (
    <div className="home">
      <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">{t('Language')}</InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={router.locale}
              autoWidth
              label={t('Language')}
          >
              {
                  router.locales.map(locale => (
                      <MenuItem key={locale} value={locale}><Link href={router.asPath} locale={locale}><a>{locale}</a></Link></MenuItem>
                  ))
              }
          </Select>
      </FormControl>
    </div>
  )
}
