export default function useActiveMenu(pathname: string, href: string) {
  const active =
    pathname == href
      ? pathname.split('/').includes(href.split('/')[1] ?? '')
      : pathname.split('/').includes(href.split('/')[2] ?? '/')

  return active
}
