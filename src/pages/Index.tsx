import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [scrollY, setScrollY] = useState(0);
  const [spectrumValue, setSpectrumValue] = useState([33]);
  const [visibleSections, setVisibleSections] = useState<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = document.querySelectorAll('.section-animate');
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
          setVisibleSections(prev => new Set(prev).add(index));
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getSpectrumType = (value: number) => {
    if (value < 33) return 'Видимый';
    if (value < 66) return 'Инфракрасный';
    return 'Рентгеновский';
  };

  const getSpectrumColor = (value: number) => {
    if (value < 33) return 'from-blue-500 to-purple-500';
    if (value < 66) return 'from-red-500 to-orange-500';
    return 'from-purple-500 to-pink-500';
  };

  const telescopeData = [
    { name: 'Hubble', year: 1990, aperture: '2.4м', wavelength: 'Видимый/УФ', orbit: 'LEO 547км', missions: 1600000 },
    { name: 'James Webb', year: 2021, aperture: '6.5м', wavelength: 'ИК', orbit: 'L2 1.5млн км', missions: 800 },
    { name: 'Spitzer', year: 2003, aperture: '0.85м', wavelength: 'ИК', orbit: 'Гелиоцентр.', missions: 106000 },
    { name: 'Chandra', year: 1999, aperture: '1.2м', wavelength: 'Рентген', orbit: 'Эллиптич.', missions: 21500 }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <div 
        className="fixed inset-0 grid-pattern opacity-20 pointer-events-none"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />

      <div className="fixed top-0 left-0 w-full h-1 bg-muted z-50">
        <div 
          className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
          style={{ width: `${Math.min((scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100, 100)}%` }}
        />
      </div>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                width: Math.random() * 3 + 1 + 'px',
                height: Math.random() * 3 + 1 + 'px',
                top: Math.random() * 100 + '%',
                left: Math.random() * 100 + '%',
                opacity: Math.random() * 0.7 + 0.3,
                animation: `float ${Math.random() * 10 + 5}s ease-in-out infinite`,
                animationDelay: Math.random() * 5 + 's'
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block mb-4 px-4 py-2 border border-primary/50 rounded-sm bg-primary/10">
            <span className="font-mono text-sm text-primary tracking-wider">DEEP SPACE OBSERVATION</span>
          </div>
          <h1 className="text-7xl md:text-9xl font-black mb-6 tracking-tight">
            КОГДА ТЬМА
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              ПЕРЕСТАЛА
            </span>
            <br />
            БЫТЬ ПУСТОТОЙ
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground font-light tracking-wide max-w-3xl mx-auto">
            История технологий, которые превратили созерцание неба в точную науку
          </p>
          <div className="mt-12 flex items-center justify-center gap-8 text-sm font-mono">
            <div className="flex items-center gap-2">
              <Icon name="Telescope" className="text-primary" size={20} />
              <span>400 ЛЕТ НАБЛЮДЕНИЙ</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Orbit" className="text-secondary" size={20} />
              <span>∞ СВЕТОВЫХ ЛЕТ</span>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" className="text-primary" size={32} />
        </div>
      </section>

      <section className={`section-animate py-24 px-6 relative ${visibleSections.has(0) ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4 px-3 py-1 border border-secondary/50 rounded-sm bg-secondary/10">
                <span className="font-mono text-xs text-secondary tracking-wider">01 / ВВЕДЕНИЕ</span>
              </div>
              <h2 className="text-5xl font-bold mb-6">Когда звёзды были просто точками</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                Древние люди видели небо как черный купол с дырами, через которые просачивается свет далекого огня. 
                Звезды считались глазами богов или духов предков.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Человечеству потребовались тысячелетия, чтобы превратить простое созерцание в систематическое 
                наблюдение — и понять, что перед нами не купол, а бесконечная пустота.
              </p>
            </div>
            <Card className="p-8 bg-card/50 backdrop-blur border-border">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="Eye" className="text-primary" size={28} />
                  </div>
                  <div>
                    <div className="font-mono text-2xl font-bold">~3000 до н.э.</div>
                    <div className="text-sm text-muted-foreground">Первые астрономические записи</div>
                  </div>
                </div>
                <div className="h-px bg-border" />
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Вавилонские таблички</span>
                    <span className="font-mono text-xs text-muted-foreground">~1800 до н.э.</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Птолемей «Альмагест»</span>
                    <span className="font-mono text-xs text-muted-foreground">150 н.э.</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Коперник, гелиоцентризм</span>
                    <span className="font-mono text-xs text-muted-foreground">1543</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className={`section-animate py-24 px-6 relative ${visibleSections.has(1) ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 border border-secondary/50 rounded-sm bg-secondary/10">
            <span className="font-mono text-xs text-secondary tracking-wider">02 / ФИЗИКА СВЕТА</span>
          </div>
          <h2 className="text-5xl font-bold mb-12">Как свет доходит до Земли</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <div className="text-4xl font-bold text-primary mb-2">300 000</div>
              <div className="text-sm text-muted-foreground mb-2">км/с</div>
              <div className="text-xs">Скорость света в вакууме</div>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <div className="text-4xl font-bold text-secondary mb-2">8:20</div>
              <div className="text-sm text-muted-foreground mb-2">минут</div>
              <div className="text-xs">Время до Солнца</div>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <div className="text-4xl font-bold text-primary mb-2">4.3</div>
              <div className="text-sm text-muted-foreground mb-2">световых года</div>
              <div className="text-xs">До ближайшей звезды</div>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-br from-card to-card/50 backdrop-blur border-border">
            <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Clock" className="text-primary" size={24} />
              Машина времени
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded">
                <div className="font-mono text-sm font-bold text-primary w-32">СЕЙЧАС</div>
                <div className="h-px flex-1 bg-primary/30" />
                <div className="text-sm">Звезда взрывается</div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded">
                <div className="font-mono text-sm font-bold text-secondary w-32">+ 1000 ЛЕТ</div>
                <div className="h-px flex-1 bg-secondary/30" />
                <div className="text-sm">Свет в пути</div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-muted/30 rounded">
                <div className="font-mono text-sm font-bold text-primary w-32">ЗЕМЛЯ 2024</div>
                <div className="h-px flex-1 bg-primary/30" />
                <div className="text-sm">Мы видим взрыв</div>
              </div>
            </div>
            <p className="mt-6 text-muted-foreground italic text-center">
              "Мы смотрим не на звёзды, а на их призраки"
            </p>
          </Card>
        </div>
      </section>

      <section className={`section-animate py-24 px-6 relative ${visibleSections.has(2) ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 border border-secondary/50 rounded-sm bg-secondary/10">
            <span className="font-mono text-xs text-secondary tracking-wider">03 / СПЕКТРЫ И ЦВЕТА</span>
          </div>
          <h2 className="text-5xl font-bold mb-6">Почему космос не чёрный</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Глаз человека видит лишь узкий диапазон электромагнитного спектра. Телескопы открывают невидимые миры.
          </p>

          <Card className="p-8 bg-card/50 backdrop-blur border-border">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Интерактивный спектр</h3>
                <div className="px-4 py-2 bg-primary/20 rounded font-mono text-sm">
                  {getSpectrumType(spectrumValue[0])}
                </div>
              </div>
              <Slider
                value={spectrumValue}
                onValueChange={setSpectrumValue}
                max={100}
                step={1}
                className="mb-6"
              />
              <div className={`h-40 rounded bg-gradient-to-r ${getSpectrumColor(spectrumValue[0])} flex items-center justify-center transition-all duration-500`}>
                <div className="text-center">
                  <div className="text-6xl font-bold mb-2">{Math.round(spectrumValue[0])}%</div>
                  <div className="font-mono text-sm opacity-80">СПЕКТРАЛЬНАЯ ВИЗУАЛИЗАЦИЯ</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border border-border rounded">
                <div className="font-bold mb-2 text-blue-400">ВИДИМЫЙ</div>
                <div className="text-xs text-muted-foreground">390-700 нм</div>
                <div className="text-sm mt-2">То, что видит человек</div>
              </div>
              <div className="p-4 border border-border rounded">
                <div className="font-bold mb-2 text-orange-400">ИНФРАКРАСНЫЙ</div>
                <div className="text-xs text-muted-foreground">700 нм - 1 мм</div>
                <div className="text-sm mt-2">Тепловое излучение</div>
              </div>
              <div className="p-4 border border-border rounded">
                <div className="font-bold mb-2 text-purple-400">РЕНТГЕНОВСКИЙ</div>
                <div className="text-xs text-muted-foreground">0.01-10 нм</div>
                <div className="text-sm mt-2">Высокоэнергетичные события</div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className={`section-animate py-24 px-6 relative ${visibleSections.has(3) ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 border border-secondary/50 rounded-sm bg-secondary/10">
            <span className="font-mono text-xs text-secondary tracking-wider">04 / УСТРОЙСТВО ТЕЛЕСКОПОВ</span>
          </div>
          <h2 className="text-5xl font-bold mb-12">Как устроен телескоп внутри</h2>

          <Tabs defaultValue="optical" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="optical">Оптический</TabsTrigger>
              <TabsTrigger value="radio">Радио</TabsTrigger>
              <TabsTrigger value="space">Космический</TabsTrigger>
            </TabsList>

            <TabsContent value="optical">
              <Card className="p-8 bg-card/50 backdrop-blur border-border">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Принцип работы</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold">1</span>
                        </div>
                        <div>
                          <div className="font-bold">Сбор света</div>
                          <div className="text-sm text-muted-foreground">Объектив или зеркало собирает фотоны</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold">2</span>
                        </div>
                        <div>
                          <div className="font-bold">Фокусировка</div>
                          <div className="text-sm text-muted-foreground">Лучи сходятся в одной точке</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-xs font-bold">3</span>
                        </div>
                        <div>
                          <div className="font-bold">Регистрация</div>
                          <div className="text-sm text-muted-foreground">CCD-матрица фиксирует изображение</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-full aspect-square rounded-lg bg-muted/20 flex items-center justify-center border-2 border-dashed border-border">
                      <Icon name="Focus" className="text-primary" size={64} />
                    </div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="radio">
              <Card className="p-8 bg-card/50 backdrop-blur border-border">
                <h3 className="text-2xl font-bold mb-4">Радиотелескопы</h3>
                <p className="text-muted-foreground mb-6">
                  Улавливают радиоволны из космоса. Работают днём и ночью, в любую погоду.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-muted/20 rounded">
                    <div className="font-mono text-2xl font-bold text-primary">305м</div>
                    <div className="text-sm text-muted-foreground">Аресибо (1963-2020)</div>
                  </div>
                  <div className="p-4 bg-muted/20 rounded">
                    <div className="font-mono text-2xl font-bold text-secondary">500м</div>
                    <div className="text-sm text-muted-foreground">FAST, Китай (2016)</div>
                  </div>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="space">
              <Card className="p-8 bg-card/50 backdrop-blur border-border">
                <h3 className="text-2xl font-bold mb-4">Космические обсерватории</h3>
                <p className="text-muted-foreground mb-6">
                  Работают за пределами атмосферы, избегая её искажений и поглощения излучения.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-4 p-3 bg-muted/20 rounded">
                    <Icon name="Satellite" className="text-primary" size={24} />
                    <div className="flex-1">James Webb Space Telescope</div>
                    <div className="font-mono text-xs text-muted-foreground">L2, ИК</div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-muted/20 rounded">
                    <Icon name="Satellite" className="text-secondary" size={24} />
                    <div className="flex-1">Hubble Space Telescope</div>
                    <div className="font-mono text-xs text-muted-foreground">LEO, Видимый/УФ</div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-muted/20 rounded">
                    <Icon name="Satellite" className="text-primary" size={24} />
                    <div className="flex-1">Chandra X-ray Observatory</div>
                    <div className="font-mono text-xs text-muted-foreground">Эллипт., Рентген</div>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className={`section-animate py-24 px-6 relative ${visibleSections.has(4) ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 border border-secondary/50 rounded-sm bg-secondary/10">
            <span className="font-mono text-xs text-secondary tracking-wider">05 / СРАВНЕНИЕ ТЕЛЕСКОПОВ</span>
          </div>
          <h2 className="text-5xl font-bold mb-12">Обычный vs Профессиональный</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 font-mono text-sm">ТЕЛЕСКОП</th>
                  <th className="text-left p-4 font-mono text-sm">ГОД</th>
                  <th className="text-left p-4 font-mono text-sm">АПЕРТУРА</th>
                  <th className="text-left p-4 font-mono text-sm">СПЕКТР</th>
                  <th className="text-left p-4 font-mono text-sm">ОРБИТА</th>
                  <th className="text-right p-4 font-mono text-sm">НАБЛЮДЕНИЯ</th>
                </tr>
              </thead>
              <tbody>
                {telescopeData.map((telescope, i) => (
                  <tr key={i} className="border-b border-border/50 hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold">{telescope.name}</td>
                    <td className="p-4 text-muted-foreground">{telescope.year}</td>
                    <td className="p-4 font-mono text-primary">{telescope.aperture}</td>
                    <td className="p-4 text-sm">{telescope.wavelength}</td>
                    <td className="p-4 text-sm text-muted-foreground">{telescope.orbit}</td>
                    <td className="p-4 text-right font-mono">{telescope.missions.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mt-12">
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Home" className="text-primary" size={20} />
                Любительский
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-green-500 mt-0.5" size={16} />
                  <span>Увеличивает изображение</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-green-500 mt-0.5" size={16} />
                  <span>Доступен для покупки</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="X" className="text-red-500 mt-0.5" size={16} />
                  <span>Ограниченный сбор света</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="X" className="text-red-500 mt-0.5" size={16} />
                  <span>Только яркие объекты</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Icon name="Rocket" className="text-secondary" size={20} />
                Профессиональный
              </h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-green-500 mt-0.5" size={16} />
                  <span>Собирает максимум света</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-green-500 mt-0.5" size={16} />
                  <span>Разные длины волн</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-green-500 mt-0.5" size={16} />
                  <span>Глубокое небо</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" className="text-green-500 mt-0.5" size={16} />
                  <span>Научная точность</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className={`section-animate py-24 px-6 relative ${visibleSections.has(5) ? 'animate-fade-in' : 'opacity-0'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="inline-block mb-4 px-3 py-1 border border-secondary/50 rounded-sm bg-secondary/10">
            <span className="font-mono text-xs text-secondary tracking-wider">06 / ВИЗУАЛИЗАЦИЯ ДАННЫХ</span>
          </div>
          <h2 className="text-5xl font-bold mb-6">Как технологии превратили наблюдение в искусство</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Современные телескопы создают не просто фотографии — они генерируют массивы данных, 
            которые превращаются в визуальные шедевры благодаря алгоритмам и художественной обработке.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <Icon name="Database" className="text-primary mb-4" size={32} />
              <h3 className="font-bold mb-2">RAW данные</h3>
              <p className="text-sm text-muted-foreground">
                Необработанные массивы чисел от детекторов телескопов
              </p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <Icon name="Cpu" className="text-secondary mb-4" size={32} />
              <h3 className="font-bold mb-2">Обработка ИИ</h3>
              <p className="text-sm text-muted-foreground">
                Алгоритмы восстанавливают детали и удаляют шумы
              </p>
            </Card>
            <Card className="p-6 bg-card/50 backdrop-blur border-border">
              <Icon name="Palette" className="text-primary mb-4" size={32} />
              <h3 className="font-bold mb-2">Художественная визуализация</h3>
              <p className="text-sm text-muted-foreground">
                "Ложные цвета" переводят невидимое в видимое
              </p>
            </Card>
          </div>

          <Card className="p-8 bg-gradient-to-br from-card to-card/50 backdrop-blur border-border">
            <h3 className="text-2xl font-bold mb-6">Этапы создания космического изображения</h3>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Сбор фотонов', time: 'Часы/дни экспозиции', color: 'primary' },
                { step: '02', title: 'Калибровка', time: 'Удаление артефактов', color: 'secondary' },
                { step: '03', title: 'Стекинг', time: 'Объединение кадров', color: 'primary' },
                { step: '04', title: 'Назначение цветов', time: 'Mapping спектров', color: 'secondary' },
                { step: '05', title: 'Финальная обработка', time: 'Контраст, резкость', color: 'primary' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-muted/20 rounded group hover:bg-muted/30 transition-colors">
                  <div className={`font-mono text-2xl font-bold ${item.color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
                    {item.step}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{item.title}</div>
                    <div className="text-sm text-muted-foreground">{item.time}</div>
                  </div>
                  <Icon name="ArrowRight" className="opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Icon name="Sparkles" className="text-primary mx-auto mb-4" size={48} />
          </div>
          <h2 className="text-5xl font-bold mb-6">
            Человек, который научился
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              видеть невозможное
            </span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed mb-8">
            От первой линзы Галилея до квантовых сенсоров James Webb — путь длиной в 400 лет. 
            Космос больше не пустота, а зеркало человеческого зрения.
          </p>
          <div className="inline-block px-6 py-3 border border-primary/50 rounded-sm bg-primary/10">
            <p className="font-mono text-sm text-primary tracking-wider">
              "Телескоп не просто показывает звёзды —<br />он показывает, как далеко может дотянуться человеческий взгляд"
            </p>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1609</div>
              <div className="text-sm text-muted-foreground">Первый телескоп</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-secondary mb-2">400+</div>
              <div className="text-sm text-muted-foreground">Лет наблюдений</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">∞</div>
              <div className="text-sm text-muted-foreground">Границ нет</div>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto text-center">
          <p className="font-mono text-sm text-muted-foreground">
            DEEP SPACE OBSERVATION © 2024 • КОГДА ТЬМА ПЕРЕСТАЛА БЫТЬ ПУСТОТОЙ
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
