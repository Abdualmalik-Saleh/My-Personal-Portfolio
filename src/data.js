/**
 * data.js — Single Source of Truth / Mock Database
 * All bilingual content (EN + AR) lives here.
 * No content is hardcoded inside any UI component.
 * Future: replace exports with API fetch calls.
 */

// ─────────────────────────────────────────────────────────────────────────────
// PROFILE
// ─────────────────────────────────────────────────────────────────────────────
export const profile = {
  nameEn: 'Abdulmalik Al-Salemi',
  nameAr: 'عبدالملك السالمي',
  roleEn: 'Web & Mobile Developer',
  roleAr: 'مطور ويب وتطبيقات موبايل',
  taglineEn:
    'I build scalable web & mobile applications using React, Node.js, Express and MongoDB. I love clean code and fast UIs.',
  taglineAr:
    'أبني تطبيقات ويب وموبايل قابلة للتوسع باستخدام React وNode.js وExpress وMongoDB. أعشق الكود النظيف والواجهات السريعة.',
  email: 'abdulmalik@example.com',
  phone: '+967 123 456 789',
  locationEn: 'Yemen',
  locationAr: 'اليمن',
  github: 'https://github.com/',
  linkedin: 'https://linkedin.com/',
  twitter: 'https://twitter.com/',
  instagram: 'https://instagram.com/',
  stats: [
    { valueEn: '2+', valueAr: '+٢', labelEn: 'Years Exp.', labelAr: 'سنوات خبرة' },
    { valueEn: '15+', valueAr: '+١٥', labelEn: 'Projects', labelAr: 'مشروع' },
    { valueEn: '10+', valueAr: '+١٠', labelEn: 'Happy Clients', labelAr: 'عميل سعيد' },
  ],
  aboutP1En:
    'I am a Web & Mobile Developer focusing on building production-ready applications. I enjoy designing APIs, creating interactive user interfaces, and optimizing performance to deliver smooth and efficient user experiences.',
  aboutP1Ar:
    'أنا مطور تطبيقات وصفحات الويب  أركز على بناء تطبيقات جاهزة للإنتاج. أستمتع بتصميم واجهات برمجة التطبيقات وإنشاء واجهات مستخدم تفاعلية وتحسين الأداء لتقديم تجارب مستخدم سلسة وفعالة.',
  aboutP2En:
    "Along with strong problem-solving skills, I follow clean architecture principles and modern development patterns. I'm passionate about writing maintainable code, improving UI/UX flows, and building applications that feel fast, secure, and intuitive.",
  aboutP2Ar:
    'إلى جانب مهارات قوية في حل المشكلات، أتبع مبادئ البنية النظيفة وأنماط التطوير الحديثة. أنا متحمس لكتابة كود قابل للصيانة وتحسين تدفقات UI/UX وبناء تطبيقات تشعر بالسرعة والأمان والبديهية.',
  infoEn: [
    { label: 'Name',         value: 'Abdulmalik Al-Salemi' },
    { label: 'Role',         value: 'Web & Mobile Developer' },
    { label: 'Location',     value: 'Yemen' },
    { label: 'Availability', value: 'Open to Work' },
  ],
  infoAr: [
    { label: 'الاسم',      value: 'عبدالملك السالمي' },
    { label: 'الدور',      value: 'مطور تطبيقات وصفحات الويب' },
    { label: 'الموقع',     value: 'اليمن' },
    { label: 'التوافر',    value: 'متاح للعمل' },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// NAV LINKS
// ─────────────────────────────────────────────────────────────────────────────
export const navLinks = [
  { id: 'home',     labelEn: 'Home',     labelAr: 'الرئيسية', path: '/' },
  { id: 'about',    labelEn: 'About',    labelAr: 'عني',       path: '/about' },
  { id: 'services', labelEn: 'Services', labelAr: 'الخدمات',  path: '/services' },
  { id: 'projects', labelEn: 'Projects', labelAr: 'المشاريع', path: '/projects' },
  { id: 'contact',  labelEn: 'Contact',  labelAr: 'تواصل',    path: '/contact' },
];

// ─────────────────────────────────────────────────────────────────────────────
// SERVICES
// ─────────────────────────────────────────────────────────────────────────────
export const services = [
  {
    id: 'svc-01',
    icon: '⚡',
    titleEn: 'Full-Stack Web Development',
    titleAr: 'تطوير الويب الشامل',
    descEn:
      'End-to-end web applications using React, Node.js, Express, and MongoDB with clean architecture and scalable code.',
    descAr:
      'تطبيقات ويب متكاملة باستخدام React وNode.js وExpress وMongoDB مع بنية نظيفة وكود قابل للتوسع.',
  },
  {
    id: 'svc-02',
    icon: '🖥️',
    titleEn: 'Frontend Development',
    titleAr: 'تطوير الواجهة الأمامية',
    descEn:
      'Fast, responsive, and user-friendly interfaces built with React and modern UI frameworks like Tailwind CSS.',
    descAr:
      'واجهات سريعة وسهلة الاستخدام مبنية باستخدام React وأطر عمل حديثة مثل Tailwind CSS.',
  },
  {
    id: 'svc-03',
    icon: '🔧',
    titleEn: 'Backend & API Development',
    titleAr: 'تطوير الخوادم وواجهات API',
    descEn:
      'Secure and efficient REST APIs using Node.js and Express, optimized for performance and scalability.',
    descAr:
      'واجهات REST API آمنة وفعالة باستخدام Node.js وExpress، محسّنة للأداء وقابلية التوسع.',
  },
  {
    id: 'svc-04',
    icon: '🗄️',
    titleEn: 'Database Design & Management',
    titleAr: 'تصميم وإدارة قواعد البيانات',
    descEn:
      'Well-structured MongoDB databases with optimized queries for speed, reliability, and data integrity.',
    descAr:
      'قواعد بيانات MongoDB منظمة جيداً مع استعلامات محسّنة للسرعة والموثوقية وسلامة البيانات.',
  },
  {
    id: 'svc-05',
    icon: '🔐',
    titleEn: 'Authentication & Authorization',
    titleAr: 'المصادقة والتفويض',
    descEn:
      'Implementation of secure login systems using JWT, role-based access control, and best security practices.',
    descAr:
      'تطبيق أنظمة تسجيل دخول آمنة باستخدام JWT والتحكم في الوصول القائم على الأدوار.',
  },
  {
    id: 'svc-06',
    icon: '🛒',
    titleEn: 'E-Commerce Development',
    titleAr: 'تطوير المتاجر الإلكترونية',
    descEn:
      'Product listings, cart systems, checkout flows, and payment gateway integrations for real projects.',
    descAr:
      'قوائم المنتجات وأنظمة السلة وتدفقات الدفع وتكاملات بوابات الدفع للمشاريع الحقيقية.',
  },
  {
    id: 'svc-07',
    icon: '🚀',
    titleEn: 'Performance Optimization',
    titleAr: 'تحسين الأداء',
    descEn:
      'Improving load times, API response speed, and overall application performance for better user experience.',
    descAr:
      'تحسين أوقات التحميل وسرعة استجابة API والأداء العام للتطبيقات لتجربة مستخدم أفضل.',
  },
  {
    id: 'svc-08',
    icon: '☁️',
    titleEn: 'Deployment & Hosting Support',
    titleAr: 'النشر والاستضافة',
    descEn:
      'Deploying applications on cloud platforms with proper environment setup and production-ready configuration.',
    descAr:
      'نشر التطبيقات على منصات السحابة مع إعداد البيئة المناسبة والتكوين الجاهز للإنتاج.',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SKILLS
// ─────────────────────────────────────────────────────────────────────────────
export const skills = [
  {
    id: 'sk-01',
    icon: '🎨',
    color: '#38bdf8',
    titleEn: 'Tailwind CSS',
    titleAr: 'تيلويند CSS',
    descEn: 'Creating responsive, modern, and clean layouts quickly using utility-first styling.',
    descAr: 'إنشاء تخطيطات متجاوبة وحديثة ونظيفة بسرعة.',
    level: 90,
  },
  {
    id: 'sk-02',
    icon: '⚡',
    color: '#facc15',
    titleEn: 'JavaScript',
    titleAr: 'جافا سكريبت',
    descEn: 'Writing efficient, modern, and optimized code for both frontend and backend logic.',
    descAr: 'كتابة كود فعال وحديث ومحسّن للواجهة الأمامية والخلفية.',
    level: 85,
  },
  {
    id: 'sk-03',
    icon: '⚛️',
    color: '#61dafb',
    titleEn: 'React',
    titleAr: 'رياكت',
    descEn: 'Building fast, interactive, and component-based UIs with clean state management.',
    descAr: 'بناء واجهات مستخدم سريعة وتفاعلية قائمة على المكونات.',
    level: 85,
  },
  {
    id: 'sk-04',
    icon: '🟢',
    color: '#68a063',
    titleEn: 'Node.js',
    titleAr: 'نود جي إس',
    descEn: 'Developing scalable backend logic and high-performance server-side applications.',
    descAr: 'تطوير منطق خلفي قابل للتوسع وتطبيقات عالية الأداء.',
    level: 80,
  },
  {
    id: 'sk-05',
    icon: '🍃',
    color: '#47a248',
    titleEn: 'MongoDB',
    titleAr: 'مونغو دي بي',
    descEn: 'Managing NoSQL databases with flexible schemas for high-performance data storage.',
    descAr: 'إدارة قواعد بيانات NoSQL بمخططات مرنة.',
    level: 75,
  },
  {
    id: 'sk-06',
    icon: '🔴',
    color: '#e34c26',
    titleEn: 'HTML5 & CSS3',
    titleAr: 'HTML5 و CSS3',
    descEn: 'Creating clean, well-structured page layouts with semantic markup.',
    descAr: 'إنشاء تخطيطات صفحات نظيفة ومنظمة مع ترميز دلالي.',
    level: 95,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROJECT FILTERS
// ─────────────────────────────────────────────────────────────────────────────
export const projectFilters = [
  { id: 'all',       labelEn: 'All Projects', labelAr: 'جميع المشاريع' },
  { id: 'fullstack', labelEn: 'Full-Stack',   labelAr: 'شامل' },
  { id: 'frontend',  labelEn: 'Frontend',     labelAr: 'واجهة أمامية' },
  { id: 'backend',   labelEn: 'Backend',      labelAr: 'خلفية' },
  { id: 'mobile',    labelEn: 'Mobile',       labelAr: 'موبايل' },
];

// ─────────────────────────────────────────────────────────────────────────────
// PROJECTS
// ─────────────────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 'proj-01',
    featured: true,
    category: 'fullstack',
    titleEn: 'MERN Todo App (2025)',
    titleAr: 'تطبيق MERN للمهام (2025)',
    descEn:
      'A fully functional Todo application with authentication, CRUD operations, and a clean, responsive UI.',
    descAr:
      'تطبيق مهام متكامل مع نظام مصادقة وعمليات CRUD وواجهة مستخدم نظيفة ومتجاوبة.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: '#',
    demo: '#',
    gradientFrom: '#051937',
    gradientTo:   '#008793',
  },
  {
    id: 'proj-02',
    featured: true,
    category: 'fullstack',
    titleEn: 'E-Commerce Demo (2025)',
    titleAr: 'متجر إلكتروني تجريبي (2025)',
    descEn:
      'A demo e-commerce platform featuring product listing, cart system, and checkout flow.',
    descAr:
      'منصة تجارة إلكترونية تجريبية تتضمن قائمة المنتجات وسلة التسوق وتدفق الدفع.',
    tags: ['React', 'Node.js', 'Express.js', 'MongoDB'],
    github: '#',
    demo: '#',
    gradientFrom: '#0f0c29',
    gradientTo:   '#302b63',
  },
  {
    id: 'proj-03',
    featured: false,
    category: 'frontend',
    titleEn: 'Portfolio Website v1 (2024)',
    titleAr: 'موقع محفظة الأعمال الأول (2024)',
    descEn:
      'My first personal portfolio built with React and Tailwind CSS showcasing projects and skills.',
    descAr: 'محفظة أعمالي الشخصية الأولى مبنية بـ React وTailwind CSS.',
    tags: ['React', 'Tailwind CSS', 'JavaScript'],
    github: '#',
    demo: '#',
    gradientFrom: '#1a1a2e',
    gradientTo:   '#533483',
  },
  {
    id: 'proj-04',
    featured: false,
    category: 'mobile',
    titleEn: 'React Native Chat App (2024)',
    titleAr: 'تطبيق دردشة React Native (2024)',
    descEn:
      'A real-time mobile chat application built with React Native and Firebase.',
    descAr: 'تطبيق دردشة موبايل فوري مبني بـ React Native وFirebase.',
    tags: ['React Native', 'Firebase', 'Expo'],
    github: '#',
    demo: '#',
    gradientFrom: '#0b486b',
    gradientTo:   '#2d6b8a',
  },
  {
    id: 'proj-05',
    featured: false,
    category: 'backend',
    titleEn: 'REST API Boilerplate (2024)',
    titleAr: 'قالب REST API (2024)',
    descEn:
      'A production-ready REST API boilerplate with JWT auth, CRUD, and Swagger docs.',
    descAr: 'قالب REST API جاهز للإنتاج مع JWT ومصادقة وعمليات CRUD وتوثيق Swagger.',
    tags: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
    github: '#',
    demo: '#',
    gradientFrom: '#1e0a3c',
    gradientTo:   '#6a0dad',
  },
  {
    id: 'proj-06',
    featured: false,
    category: 'frontend',
    titleEn: 'Weather Dashboard (2024)',
    titleAr: 'لوحة بيانات الطقس (2024)',
    descEn:
      'A weather dashboard consuming OpenWeatherMap API with dynamic UI and location search.',
    descAr: 'لوحة بيانات طقس جميلة تستهلك API OpenWeatherMap مع واجهة ديناميكية.',
    tags: ['React', 'CSS3', 'REST API'],
    github: '#',
    demo: '#',
    gradientFrom: '#003153',
    gradientTo:   '#023e73',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// TESTIMONIALS
// ─────────────────────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 'tst-01',
    rating: 5,
    textEn:
      'Abdulmalik handled both frontend and backend tasks smoothly and always ensured the codebase stayed clean, structured, and easy to maintain. He identified performance bottlenecks early, proposed solid solutions, and implemented them without disrupting the workflow.',
    textAr:
      'عبدالملك تعامل مع مهام الواجهة الأمامية والخلفية بسلاسة وحرص دائماً على أن تظل قاعدة الكود نظيفة ومنظمة وسهلة الصيانة. حدد اختناقات الأداء مبكراً واقترح حلولاً متينة ونفّذها دون تعطيل سير العمل.',
    author: 'Wambui Muli',
    date: '17/05/2023',
  },
  {
    id: 'tst-02',
    rating: 5,
    textEn:
      'Working with Abdulmalik was a great experience. He delivered the project on time with clean, well-documented code. His attention to detail and communication skills are outstanding.',
    textAr:
      'العمل مع عبدالملك كان تجربة رائعة. سلّم المشروع في الوقت المحدد بكود نظيف وموثق جيداً. اهتمامه بالتفاصيل ومهارات التواصل لديه ممتازة.',
    author: 'Ahmad Al-Rashid',
    date: '12/09/2023',
  },
  {
    id: 'tst-03',
    rating: 5,
    textEn:
      "Exceptional developer! Abdulmalik built our e-commerce platform from scratch. The UI is beautiful and the backend is robust. He's proactive, responsive, and genuinely cares about the quality of his work.",
    textAr:
      'مطور استثنائي! عبدالملك بنى منصة التجارة الإلكترونية الخاصة بنا من الصفر. الواجهة جميلة والخلفية متينة. إنه استباقي ومستجيب ويهتم حقاً بجودة عمله.',
    author: 'Sara Mitchell',
    date: '03/01/2024',
  },
  {
    id: 'tst-04',
    rating: 4,
    textEn:
      'Abdulmalik is a talented and dedicated developer. He understood our requirements quickly and delivered a polished mobile application. Great communicator and very easy to work with.',
    textAr:
      'عبدالملك مطور موهوب ومتفانٍ. فهم متطلباتنا بسرعة وسلّم تطبيقاً موبايل متقناً. متواصل جيد وسهل العمل معه جداً.',
    author: 'Khalid Al-Mansouri',
    date: '22/03/2024',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// SOCIAL LINKS
// ─────────────────────────────────────────────────────────────────────────────
export const socialLinks = [
  { id: 'github',    label: 'GitHub',    href: '#', icon: 'github' },
  { id: 'linkedin',  label: 'LinkedIn',  href: '#', icon: 'linkedin' },
  { id: 'twitter',   label: 'Twitter',   href: '#', icon: 'twitter' },
  { id: 'instagram', label: 'Instagram', href: '#', icon: 'instagram' },
];
