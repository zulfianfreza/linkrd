import {
  SiApplemusic,
  SiBitbucket,
  SiDribbble,
  SiFacebook,
  SiGithub,
  SiGitlab,
  SiGmail,
  SiInstagram,
  SiLinkedin,
  SiPinterest,
  SiSnapchat,
  SiSoundcloud,
  SiSpotify,
  SiTelegram,
  SiTiktok,
  SiTwitch,
  SiTwitter,
  SiWhatsapp,
  SiX,
  SiYoutube,
} from 'react-icons/si'

export const ICON = [
  {
    label: 'Twitch',
    icon: SiTwitch,
  },
  {
    label: 'Dribbble',
    icon: SiDribbble,
  },
  {
    label: 'Github',
    icon: SiGithub,
  },
  {
    label: 'Linkedin',
    icon: SiLinkedin,
  },
  {
    label: 'Instagram',
    icon: SiInstagram,
  },
  {
    label: 'Twitter',
    icon: SiX,
  },
  {
    label: 'Tiktok',
    icon: SiTiktok,
  },
  {
    label: 'Gitlab',
    icon: SiGitlab,
  },
  {
    label: 'Bitbucket',
    icon: SiBitbucket,
  },
  {
    label: 'Youtube',
    icon: SiYoutube,
  },
  {
    label: 'Gmail',
    icon: SiGmail,
  },
  {
    label: 'Whatsapp',
    icon: SiWhatsapp,
  },
  {
    label: 'Spotify',
    icon: SiSpotify,
  },
  {
    label: 'Facebook',
    icon: SiFacebook,
  },
  {
    label: 'Telegram',
    icon: SiTelegram,
  },
  {
    label: 'Pinterest',
    icon: SiPinterest,
  },
  {
    label: 'Sound Cloud',
    icon: SiSoundcloud,
  },
  {
    label: 'Snapchat',
    icon: SiSnapchat,
  },
  {
    label: 'Apple Music',
    icon: SiApplemusic,
  },
]

export const SOCIAL_ICON_LIST = ICON.map((icon, index) => {
  return {
    id: index + 1,
    label: icon.label,
    icon: icon.icon,
  }
})
