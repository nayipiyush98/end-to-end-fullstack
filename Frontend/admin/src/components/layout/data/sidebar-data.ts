import { useAuthStore } from '@/store/auth.store';
import {
  LayoutDashboard,
  Monitor,
  HelpCircle,
  Bell,
  Package,
  Palette,
  Settings,
  Wrench,
  UserCog,
  Users,
  MessagesSquare,
  Command,
  GalleryVerticalEnd,
  Box,
  Receipt,
  FingerprintPattern
} from 'lucide-react'

const URL_PREFIX = '/admin';


export const sidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    }
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: `${URL_PREFIX}`,
          icon: LayoutDashboard,
        },
        {
          title: 'Products',
          url: `${URL_PREFIX}/products`,
          icon: Box,
        },
        {
          title: 'Categories',
          url: `${URL_PREFIX}/categories`,
          icon: Package,
        },
        {
          title: 'Orders',
          url: `${URL_PREFIX}/orders`,
          icon: Receipt,
        },
        {
          title: 'Chats',
          url: `${URL_PREFIX}/chats`,
          badge: '3',
          icon: MessagesSquare,
        },
        {
          title: 'Users',
          url: `${URL_PREFIX}/users`,
          icon: Users,
        },
        {
          title: 'Security',
          url: `${URL_PREFIX}/security`,
          icon: FingerprintPattern,
        }
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: `${URL_PREFIX}/settings`,
              icon: UserCog,
            },
            {
              title: 'Account',
              url: `${URL_PREFIX}/settings/account`,
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: `${URL_PREFIX}/settings/appearance`,
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: `${URL_PREFIX}/settings/notifications`,
              icon: Bell,
            },
            {
              title: 'Display',
              url: `${URL_PREFIX}/settings/display`,
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
