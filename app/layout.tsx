import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: '刘宇 Yu Liu | 运动生物力学',
  description: '上海体育大学刘宇教授的研究、学术成果与个人经历。',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
