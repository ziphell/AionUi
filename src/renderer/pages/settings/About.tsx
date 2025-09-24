import { ipcBridge } from '@/common';
import { Card, Divider, Typography } from '@arco-design/web-react';
import { FileText, Github, Globe, Help, Message, Right, User } from '@icon-park/react';
import React from 'react';
import { useTranslation } from 'react-i18next';
import packageJson from '../../../../package.json';
import SettingContainer from './components/SettingContainer';

const { Title, Text } = Typography;

// 图标常量
const ICONS = {
  HELP: <Help theme='outline' size='20' />,
  FILE: <FileText theme='outline' size='20' />,
  MESSAGE: <Message theme='outline' size='20' />,
  CONTACT: <User theme='outline' size='20' />,
  GLOBE: <Globe theme='outline' size='20' />,
  GITHUB: <Github theme='outline' size='20' />,
} as const;

const About: React.FC = () => {
  const { t } = useTranslation();

  const openLink = async (url: string) => {
    try {
      console.log('Opening link:', url);
      await ipcBridge.shell.openExternal.invoke(url);
    } catch (error) {
      console.error('Failed to open link:', error);
    }
  };

  const linkItems = [
    {
      icon: ICONS.HELP,
      title: t('settings.helpDocumentation'),
      url: 'https://github.com/iOfficeAI/AionUi/wiki',
    },
    {
      icon: ICONS.FILE,
      title: t('settings.updateLog'),
      url: 'https://github.com/iOfficeAI/AionUi/releases',
    },
    {
      icon: ICONS.MESSAGE,
      title: t('settings.feedback'),
      url: 'https://github.com/iOfficeAI/AionUi/issues',
    },
    {
      icon: ICONS.CONTACT,
      title: t('settings.contactMe'),
      url: 'https://x.com/WailiVery',
    },
    {
      icon: ICONS.GLOBE,
      title: t('settings.officialWebsite'),
      url: 'https://www.aionui.com',
    },
  ];

  return (
    <SettingContainer title={t('settings.about')} bodyContainer>
      <div className='flex flex-col'>
        {/* Application Information Section */}
        <div className='flex flex-col items-center pt-4px pb-8px'>
          {/* App Info */}
          <div className='flex flex-col items-center gap-4px text-center'>
            <Title heading={3} className='mb-0 text-gray-900 text-24px font-bold'>
              AionUi
            </Title>
            <Text className='text-gray-600 text-14px leading-relaxed max-w-400px'>{t('settings.appDescription')}</Text>
            <div className='flex items-center gap-6px mt-2px'>
              <span className='bg-green-100 text-green-700 px-8px py-2px rounded-6px text-12px font-medium'>v{packageJson.version}</span>
              <div
                className='cursor-pointer hover:opacity-80 transition-opacity text-black'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openLink('https://github.com/iOfficeAI/AionUi');
                }}
              >
                {ICONS.GITHUB}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <Divider className='!my-0' />

        {/* Links Section */}
        <Card className='border-none bg-white mt-0'>
          <div className='space-y-4px pt-8px pb-8px'>
            {linkItems.map((item, index) => (
              <div
                key={index}
                className='flex items-center justify-between p-12px hover:bg-gray-50 rounded-8px transition-all duration-200 cursor-pointer group border border-transparent hover:border-gray-200'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  openLink(item.url);
                }}
              >
                <div className='flex items-center gap-12px'>
                  <div className='text-gray-500 group-hover:text-blue-600 transition-colors'>{item.icon}</div>
                  <Text className='text-gray-700 group-hover:text-blue-600 transition-colors text-14px font-medium'>{item.title}</Text>
                </div>
                <div className='text-gray-400 group-hover:text-blue-600 transition-colors'>
                  <Right theme='outline' size='16' />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </SettingContainer>
  );
};

export default About;
