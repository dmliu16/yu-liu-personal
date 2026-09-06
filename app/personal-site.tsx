'use client';
import { useState, useEffect, useSyncExternalStore } from 'react';
import Image from 'next/image';
const subscribeLanguage = (callback: () => void) => {
  window.addEventListener('popstate', callback);
  return () => window.removeEventListener('popstate', callback);
};
const getLanguage = () =>
  new URLSearchParams(location.search).get('lang') === 'en';
const routes = ['/', '/research', '/publications', '/about', '/contact'];
const labels = ['首页', '研究方向', '学术成果', '个人经历', '联系'];
const english = ['Home', 'Research', 'Publications', 'About', 'Contact'];
export default function PersonalSite({ page = 'home' }: { page?: string }) {
  const en = useSyncExternalStore(subscribeLanguage, getLanguage, () => false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    document.documentElement.lang = en ? 'en' : 'zh-CN';
  }, [en]);
  const t = (cn: string, eng: string) => (en ? eng : cn);
  const href = (url: string) => url + (en ? '?lang=en' : '');
  const areas = [
    [
      '运动生物力学',
      'Biomechanics',
      '从人体动作出发，理解运动技术、力学特征与运动表现之间的关系。',
      'Understanding the relationship between human movement, mechanics and performance.',
    ],
    [
      '冬季运动科技',
      'Winter sports',
      '结合三维动作捕捉与可穿戴设备，为冰雪运动训练提供技术分析。',
      'Combining motion capture and wearable sensors to inform winter-sports training.',
    ],
    [
      '神经调控',
      'Neuromodulation',
      '探索神经活动与运动控制的联系，研究非侵入性刺激方法。',
      'Investigating neural activity, motor control and noninvasive stimulation.',
    ],
  ];
  return (
    <>
      <a className="skip" href="#main">
        跳转到内容
      </a>
      <header>
        <a className="identity" href={href('/')}>
          <b>刘宇</b>
          <span>Yu Liu</span>
        </a>
        <button
          className="menu"
          onClick={() => setMenu(!menu)}
          aria-expanded={menu}
        >
          ☰ <span>{t('导航', 'Menu')}</span>
        </button>
        <nav className={menu ? 'open' : ''} aria-label="主导航">
          {labels.map((label, i) => (
            <a
              key={label}
              className={
                ['home', 'research', 'publications', 'about', 'contact'][i] ===
                page
                  ? 'active'
                  : ''
              }
              href={href(routes[i])}
            >
              {en ? english[i] : label}
            </a>
          ))}
        </nav>
        <button
          className="language"
          onClick={() => {
            const next = !en;
            const u = new URL(location.href);
            if (next) {
              u.searchParams.set('lang', 'en');
            } else {
              u.searchParams.delete('lang');
            }
            history.replaceState(null, '', u);
            window.dispatchEvent(new PopStateEvent('popstate'));
            document.documentElement.lang = next ? 'en' : 'zh-CN';
          }}
        >
          {en ? '中文' : 'EN'}
        </button>
      </header>
      <main id="main">
        {page === 'home' ? (
          <>
            <section className="hero">
              <div className="hero-copy">
                <p className="eyebrow">
                  {t(
                    '上海体育大学 · 运动生物力学',
                    'Shanghai University of Sport',
                  )}
                </p>
                <h1>
                  刘宇<span>Yu Liu</span>
                </h1>
                <p className="position">
                  {t(
                    '教授 · 长江学者特聘教授',
                    'Professor · Chang Jiang Distinguished Professor',
                  )}
                </p>
                <div className="hero-rule" />
                <h2>
                  {t(
                    '理解运动，探索人的潜能。',
                    'Understanding movement. Exploring human potential.',
                  )}
                </h2>
                <p className="intro">
                  {t(
                    '以运动生物力学为基础，连接竞技体育、运动控制与神经科学。从实验室中的研究问题，到训练场上的真实动作。',
                    'Research connecting biomechanics, athletic performance, motor control and neuroscience—from questions in the laboratory to movement in the field.',
                  )}
                </p>
                <div className="actions">
                  <a className="primary" href={href('/research')}>
                    {t('了解研究方向', 'Explore research')}
                  </a>
                  <a className="text-link" href={href('/about')}>
                    {t('个人经历', 'About Yu Liu')} <span>↗</span>
                  </a>
                </div>
              </div>
              <figure className="portrait">
                <Image
                  unoptimized
                  width={600}
                  height={800}
                  src="/images/yu-liu.png"
                  alt="刘宇教授肖像"
                />
                <figcaption>
                  <span>{t('刘宇 教授', 'Professor Yu Liu')}</span>
                  <span>{t('上海，中国', 'Shanghai, China')}</span>
                </figcaption>
              </figure>
            </section>
            <section className="section research-intro">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">{t('研究方向', 'Research')}</p>
                  <h2>{t('从动作到机制', 'From movement to mechanism')}</h2>
                </div>
                <a className="text-link" href={href('/research')}>
                  {t('探索研究', 'Explore')} ↗
                </a>
              </div>
              <div className="area-grid">
                {areas.map((a, i) => (
                  <a
                    href={href('/research') + '#area-' + i}
                    className="area"
                    key={a[0]}
                  >
                    <div className={'visual visual-' + i}>
                      <svg viewBox="0 0 320 130" aria-hidden="true">
                        {i === 0 ? (
                          <>
                            <path d="M35 105 Q90 10 150 80 T285 25" />
                            <path d="M35 120 Q90 25 150 95 T285 40" />
                            <circle cx="150" cy="80" r="7" />
                          </>
                        ) : i === 1 ? (
                          <>
                            <path d="M20 112 L124 22 L179 75 L225 38 L300 112" />
                            <path d="M100 105 Q192 72 265 20" />
                          </>
                        ) : (
                          <>
                            {[0, 1, 2].map((n) => (
                              <path
                                key={n}
                                d={`M15 ${65 + n * 10} Q55 ${-10 + n * 10} 95 ${65 + n * 10} T175 ${65 + n * 10} T255 ${65 + n * 10} T335 ${65 + n * 10}`}
                              />
                            ))}
                          </>
                        )}
                      </svg>
                    </div>
                    <h3>
                      {en ? a[1] : a[0]} <span>↗</span>
                    </h3>
                    <p>{en ? a[3] : a[2]}</p>
                  </a>
                ))}
              </div>
            </section>
            <section className="feature section">
              <div>
                <p className="eyebrow">
                  {t('研究现场', 'Research in practice')}
                </p>
                <h2>
                  {t(
                    '让运动数据走进训练场',
                    'Bringing movement data to the training field',
                  )}
                </h2>
              </div>
              <div>
                <p>
                  {t(
                    '在“科技冬奥”项目中，刘宇带领团队运用三维动作捕捉和传感技术，分析跳台滑雪等项目的运动轨迹与技术参数，为教练员和运动员提供训练反馈。',
                    'Through the Science and Technology for the Winter Olympics programme, Liu’s team used motion capture and sensors to analyse movement trajectories and technique, providing feedback to coaches and athletes.',
                  )}
                </p>
                <a
                  className="text-link"
                  href="https://paper.people.com.cn/rmzk/html/2022-03/01/content_25906997.htm"
                  target="_blank"
                  rel="noreferrer"
                >
                  {t(
                    '阅读《人民周刊》访谈',
                    'Read the People’s Weekly interview',
                  )}{' '}
                  ↗
                </a>
              </div>
            </section>
            <section className="section bottom-links">
              <h2>
                {t('持续探索，交流同行。', 'Research grows through exchange.')}
              </h2>
              <a href={href('/publications')}>
                {t('浏览学术成果', 'Browse publications')} ↗
              </a>
              <a href={href('/contact')}>{t('学术交流', 'Connect')} ↗</a>
            </section>
          </>
        ) : (
          <Content page={page} en={en} areas={areas} />
        )}
      </main>
      <footer>
        <div className="identity">
          <b>刘宇</b>
          <span>Yu Liu</span>
        </div>
        <p>
          {t(
            '运动生物力学 · 运动控制 · 神经科学',
            'Biomechanics · Motor control · Neuroscience',
          )}
        </p>
        <span>© {new Date().getFullYear()} Yu Liu</span>
      </footer>
    </>
  );
}
function Content({
  page,
  en,
  areas,
}: {
  page: string;
  en: boolean;
  areas: string[][];
}) {
  const t = (cn: string, eng: string) => (en ? eng : cn);
  const [query, setQuery] = useState('');
  const pubs = [
    {
      year: '2024',
      title:
        'Transcranial Temporal Interference Stimulation of the Right Globus Pallidus in Parkinson’s Disease',
      journal: 'Movement Disorders',
      url: 'https://doi.org/10.1002/mds.29967',
      topic: '神经调控 / Neuromodulation',
    },
    {
      year: '2024',
      title:
        'SnowMotion: A Wearable Sensor-Based Mobile Platform for Alpine Skiing Technique Assistance',
      journal: 'Sensors · 24(12), 3975',
      url: 'https://doi.org/10.3390/s24123975',
      topic: '冬季运动 / Winter sports',
    },
    {
      year: '2023',
      title:
        'Fronto-Parietal Theta High-Definition Transcranial Alternating Current Stimulation may Modulate Working Memory Under Postural Control Conditions in Young Healthy Adults',
      journal: 'Frontiers in Human Neuroscience',
      url: 'https://doi.org/10.3389/fnhum.2023.1265600',
      topic: '运动控制 / Motor control',
    },
    {
      year: '2022',
      title:
        'Temporal interference stimulation targeting right frontoparietal areas enhances working memory in healthy individuals',
      journal: 'Frontiers in Human Neuroscience',
      url: 'https://doi.org/10.3389/fnhum.2022.918470',
      topic: '神经调控 / Neuromodulation',
    },
  ];
  return (
    <section className="section interior">
      <div className="page-title">
        <p className="eyebrow">
          {t('刘宇 · 上海体育大学', 'Yu Liu · Shanghai University of Sport')}
        </p>
        <h1>
          {en
            ? english[
                [
                  'home',
                  'research',
                  'publications',
                  'about',
                  'contact',
                ].indexOf(page)
              ]
            : labels[
                [
                  'home',
                  'research',
                  'publications',
                  'about',
                  'contact',
                ].indexOf(page)
              ]}
        </h1>
        <p>
          {page === 'research'
            ? t(
                '连接基础研究与运动实践。',
                'Connecting fundamental research with movement in practice.',
              )
            : page === 'publications'
              ? t(
                  '运动生物力学与神经科学领域的部分合作研究。',
                  'Selected collaborative research in biomechanics and neuroscience.',
                )
              : page === 'about'
                ? t(
                    '从运动生物力学出发，持续探索人体运动。',
                    'A career exploring the science of human movement.',
                  )
                : t(
                    '学术交流与研究合作。',
                    'Academic exchange and research collaboration.',
                  )}
        </p>
      </div>
      {page === 'research' && (
        <>
          <div className="research-list">
            {areas.map((a, i) => (
              <article id={'area-' + i} key={a[0]}>
                <div>
                  <p className="eyebrow">{a[1]}</p>
                  <h2>{en ? a[1] : a[0]}</h2>
                </div>
                <div>
                  <p>{en ? a[3] : a[2]}</p>
                  <p>
                    {i === 0
                      ? t(
                          '研究涵盖运动技术分析、运动损伤与鞋类生物力学，关注人体如何产生、调整和控制动作。',
                          'Research encompasses movement technique, injury biomechanics and footwear biomechanics, examining how movement is produced and controlled.',
                        )
                      : i === 1
                        ? t(
                            '在“科技冬奥”研究中，团队利用三维动作捕捉、运动轨迹记录和可穿戴传感设备，为训练过程提供生物力学信息。',
                            'Winter-sports research combines three-dimensional motion capture, movement tracking and wearable sensors to provide biomechanical information during training.',
                          )
                        : t(
                            '相关合作研究探索经颅时间干涉刺激、工作记忆与运动控制之间的关系，并开展帕金森病相关先导研究。',
                            'Collaborative studies explore temporal interference stimulation, working memory and motor control, including pilot research in Parkinson’s disease.',
                          )}
                  </p>
                  <a
                    className="text-link"
                    href={
                      i === 1
                        ? 'https://paper.people.com.cn/rmzk/html/2022-03/01/content_25906997.htm'
                        : i === 2
                          ? 'https://doi.org/10.1002/mds.29967'
                          : 'https://fddi.fudan.edu.cn/4c/5e/c20919a674910/page.htm'
                    }
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('阅读相关资料', 'Read more')} ↗
                  </a>
                </div>
              </article>
            ))}
          </div>
          <aside className="venture">
            <p className="eyebrow">{t('科研转化', 'Research translation')}</p>
            <h2>IntellectSpark</h2>
            <p>
              {t(
                '刘宇参与的创业项目，探索神经调控相关研究的转化应用。',
                'An entrepreneurial venture involving Yu Liu, exploring the translation of neuromodulation research.',
              )}
            </p>
          </aside>
        </>
      )}
      {page === 'publications' && (
        <>
          <label className="search">
            {t('查找论文', 'Find a publication')}
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t(
                '输入题目、年份或研究方向',
                'Search title, year or topic',
              )}
            />
          </label>
          <p className="small">
            {t('精选论文', 'Selected publications')} ·{' '}
            {
              pubs.filter((p) =>
                (p.title + p.year + p.topic + p.journal)
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              ).length
            }
          </p>
          <div className="pub-list">
            {pubs
              .filter((p) =>
                (p.title + p.year + p.topic + p.journal)
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )
              .map((p) => (
                <article key={p.url}>
                  <span className="year">{p.year}</span>
                  <div>
                    <p className="small">{p.journal}</p>
                    <h2>
                      <a href={p.url} target="_blank" rel="noreferrer">
                        {p.title} ↗
                      </a>
                    </h2>
                    <p className="small">{p.topic}</p>
                  </div>
                </article>
              ))}
          </div>
          {!pubs.some((p) =>
            (p.title + p.year + p.topic + p.journal)
              .toLowerCase()
              .includes(query.toLowerCase()),
          ) && (
            <output>
              {t(
                '没有找到匹配的论文，请尝试其他关键词。',
                'No matching publications. Try another keyword.',
              )}
            </output>
          )}
        </>
      )}
      {page === 'about' && (
        <div className="about-grid">
          <Image
            unoptimized
            width={600}
            height={800}
            src="/images/yu-liu.png"
            alt="刘宇教授"
          />
          <div>
            <h2>{t('个人简介', 'Biography')}</h2>
            <p>
              {t(
                '刘宇是上海体育大学教授、教育部“长江学者奖励计划”特聘教授，研究涉及运动生物力学、运动控制及其在竞技体育中的应用。',
                'Yu Liu is a professor at Shanghai University of Sport and a Chang Jiang Distinguished Professor. His research encompasses biomechanics, motor control and applications in competitive sport.',
              )}
            </p>
            <div className="timeline">
              {[
                [
                  '教育与早期研究',
                  'Education and early research',
                  '在北京体育大学完成本科学习，随后从事运动生物力学研究。在德国法兰克福大学获得博士学位，并在科隆体育大学从事博士后研究。',
                  'Liu completed undergraduate studies at Beijing Sport University, earned a doctorate at the University of Frankfurt and conducted postdoctoral research at German Sport University Cologne.',
                ],
                [
                  '教学与科研',
                  'Academic career',
                  '在上海体育学院（现上海体育大学）任教，曾任运动科学学院院长。',
                  'He joined Shanghai University of Sport and previously served as dean of its School of Kinesiology.',
                ],
                [
                  '学术服务',
                  'Academic service',
                  '曾任亚洲运动训练科学学会2018年至2020年主席。',
                  'He served as president of the Asia Association of Coaching Science from 2018 to 2020.',
                ],
                [
                  '学术荣誉',
                  'Academic recognition',
                  '教育部“长江学者”特聘教授；美国国家体育科学院（NAK）会士及美国运动医学会（ACSM）会士。',
                  'Chang Jiang Distinguished Professor; fellow of the National Academy of Kinesiology and the American College of Sports Medicine.',
                ],
              ].map((a) => (
                <section key={a[0]}>
                  <h3>{en ? a[1] : a[0]}</h3>
                  <p>{en ? a[3] : a[2]}</p>
                </section>
              ))}
            </div>
            <a
              className="text-link"
              href="https://www.coachingscience.asia/index.php/en/about/president"
              target="_blank"
              rel="noreferrer"
            >
              {t('学会人物介绍', 'Association biography')} ↗
            </a>
          </div>
        </div>
      )}
      {page === 'contact' && (
        <div className="contact-grid">
          <div>
            <h2>{t('交流与合作', 'Connect and collaborate')}</h2>
            <p>
              {t(
                '欢迎围绕运动生物力学、运动训练技术及神经调控研究开展学术交流。',
                'Academic exchange in biomechanics, sports-training technology and neuromodulation research.',
              )}
            </p>
            <p>
              {t('上海体育大学', 'Shanghai University of Sport')}
              <br />
              {t('中国 · 上海', 'Shanghai, China')}
            </p>
            <a
              className="primary"
              href="https://www.sus.edu.cn/"
              target="_blank"
              rel="noreferrer"
            >
              {t('访问学校网站', 'University website')}
            </a>
          </div>
          <aside>
            <h3>{t('了解研究', 'Explore the research')}</h3>
            <a href={en ? '/research?lang=en' : '/research'}>
              {t('研究方向', 'Research areas')} ↗
            </a>
            <a href={en ? '/publications?lang=en' : '/publications'}>
              {t('学术成果', 'Publications')} ↗
            </a>
            <p className="small">
              {t(
                '专业联系方式将在确认后补充。',
                'Professional contact details will be added after confirmation.',
              )}
            </p>
          </aside>
        </div>
      )}
    </section>
  );
}
