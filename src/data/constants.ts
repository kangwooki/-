import pv5VanImg from '../assets/images/safegarden_van_matched_ci_1789029216855.jpg';
import ciOfficialImg from '../assets/images/safegarden_ci_official_1789028536982.jpg';

export const BRAND = {
  nameKo: '세이프가든',
  nameEn: 'Safe Garden',
  slogan: '당신의 식물자산을 지켜드립니다.',
  coreMessage: '토지를 보고, 식물을 이해하고, 자산을 관리합니다.',
  colors: {
    primaryDarkGreen: '#1E4334', // Official Deep Pine Green (CI Primary)
    darkCharcoal: '#21262B', // Neutral Dark Charcoal for text & contrast
    slateNavy: '#20313E', // Corporate Deep Slate
    sage: '#5E856F', // Muted Botanical Sage
    paleSage: '#E5EDE8', // Soft Mint Wash / Surface Tint
    warmIvory: '#FAF8F5', // Official Brand Canvas Ivory
    mutedGold: '#5E856F', // Legacy fallback mapped to botanical sage
    white: '#FFFFFF',
  },
};

export const IMAGES = {
  // Safe Garden Official CI Presentation
  ciOfficial: ciOfficialImg,
  // Safe Garden Field Service Inspection Van with refined corporate CI livery
  pv5Van: pv5VanImg,
  // Hero field visual featuring the Safe Garden company vehicle
  heroField: pv5VanImg,
  // Real Korean rural farmland with mountains and natural trees
  farmLandscape: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=80',
  // Real agricultural soil testing / measurement
  soilTesting: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
  soilLand: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
  // Fruit orchard / cultivated fruit trees field
  fruitOrchard: 'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=80',
  // Agricultural road and vehicle accessibility
  countryRoad: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=1200&q=80',
  // Field survey & plant check
  fieldSurvey: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
  // Trees growing naturally in managed land
  treeGrove: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
  // Planting and cultivation care
  plantingCare: 'https://images.unsplash.com/photo-1592417817098-8f3d69103851?auto=format&fit=crop&w=1200&q=80',
  // Vacant rural house and courtyard
  vacantHouse: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80',
  // Vacant house yard & fence
  vacantYard: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
  // Plant transplanting / root & nursery
  transplantCare: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
  // Serene wide field for final CTA
  wideLandscape: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=80',
};

export const CORE_SERVICES = [
  {
    num: '01',
    id: 'land-environment',
    title: '토지·환경 분석',
    subtitle: '토양·수분·배수 및 접근성 분석',
    description: '토양, 수분·배수, 일조, 진입로와 차량 접근성, 주변 환경 등을 종합적으로 확인하여 토지의 활용 가능성을 분석합니다.',
    details: [
      '토양·배수·일조 분석',
      '진입로·차량 접근성 확인',
      '주변 환경 및 작업조건 확인',
    ],
    imageUrl: IMAGES.soilTesting,
  },
  {
    num: '02',
    id: 'planting-care',
    title: '식물 식재·관리',
    subtitle: '환경에 맞는 식물 선택과 맞춤 관리',
    description: '토지의 환경과 목적에 맞는 식물을 선택하고, 예초·전정·관수·시비·병해충 예찰 등 필요한 관리를 수행합니다.',
    details: [
      '적합 식물 선정 및 식재',
      '생육 예찰 및 기록',
      '예초·전정·관수·시비·병해충 관리',
    ],
    imageUrl: IMAGES.fruitOrchard,
  },
  {
    num: '03',
    id: 'vacant-surroundings',
    title: '빈집·주변 관리',
    subtitle: '방치된 빈집 정리와 재산 상태 유지',
    description: '방치된 빈집과 주변 환경을 정리하고, 주기적인 관리로 재산의 상태를 유지합니다.',
    details: [
      '빈집 내부 청소·정리',
      '잡초·수목 등 주변 환경 관리',
      '정기 방문 및 상태 확인',
    ],
    imageUrl: IMAGES.vacantHouse,
  },
  {
    num: '04',
    id: 'harvest-transplant',
    title: '출하·이식',
    subtitle: '식물자산의 수확부터 굴취·이식·운송까지',
    description: '성장한 식물자산의 수확·출하부터 필요한 경우 굴취·이식·운송까지 연결합니다.',
    details: [
      '수확·출하',
      '굴취·이식',
      '운송 및 수요처 연계',
    ],
    imageUrl: IMAGES.transplantCare,
  },
];

export const SERVICE_TIERS = [
  {
    type: '기본형',
    title: '토지평가 + 현장조사',
    desc: '현재 내 토지의 상태와 식생, 접근성을 객관적으로 파악하고 싶은 분을 위한 현장 진단',
    points: ['현장 직접 방문 조사', '진입로·토양·일조 분석', '현장 기록 리포트 제공'],
  },
  {
    type: '식재형',
    title: '토지평가 + 식물선택 + 식재',
    desc: '어떤 식물을 심어야 실패하지 않을지 고민인 토지 소유주를 위한 맞춤 식재 솔루션',
    points: ['토양 적합 수종 선정', '현장 사전정리 및 식재', '초기 활착 가이드 전달'],
  },
  {
    type: '관리형',
    title: '식재 + 정기관리',
    desc: '멀리 떨어져 직접 방문하기 어려운 토지의 식물 생육을 체계적으로 관찰·기록·조치',
    points: ['계절별 정기 예찰 방문', '생육 점검 및 이상 조치', '방문 시마다 사진기록 전달'],
  },
  {
    type: '출하형',
    title: '굴취 + 운송 + 출하',
    desc: '자란 식물자산의 가치를 실현하거나 다른 부지로 옮겨야 할 때 필요한 원스톱 진행',
    points: ['전문 굴취 및 분감기', '안전 특수 운송 연계', '이식지 안착 또는 출하'],
  },
];

export const VACANT_HOUSE_SERVICES = [
  {
    number: '01',
    title: '기본관리',
    subtitle: '비어 있는 공간의 쾌적함과 청결 유지',
    items: ['청소', '주변정리', '방역'],
    description: '방치로 인한 부패 및 해충 유입을 방지하기 위한 실내외 정리와 필수 방역을 진행합니다.',
  },
  {
    number: '02',
    title: '상태점검',
    subtitle: '7가지 항목 정밀 점검 & 안심 리포트',
    items: [
      '문·창문 잠금 및 파손',
      '누수 흔적 및 습기',
      '벽체·천장 곰팡이',
      '담장·지붕 등 외부시설',
      '우수관·마당 배수',
      '해충 및 동물 침입',
      '주변환경 안전 여부',
    ],
    description: '매 방문 시 꼼꼼히 확인하고 고해상도 사진으로 기록하여 소유주께 그대로 전달합니다.',
    flow: '확인 → 사진기록 → 전달',
  },
  {
    number: '03',
    title: '주변 토지·식물관리',
    subtitle: '잡초와 무성한 가지로 인한 민원 및 위험 예방',
    items: ['마당', '정원', '나무', '잔디', '텃밭', '주변 토지'],
    description: '과도한 잡목과 마당 잡초를 정리하고, 인접 도로와 이웃에 피해를 주지 않도록 필요한 만큼만 관리합니다.',
  },
];

export const CONSULTATION_CATEGORIES = [
  '토지 관리',
  '식물 식재',
  '식물 관리',
  '토양 및 환경 확인',
  '빈집 관리',
  '주변 토지 관리',
  '식물 이식',
  '출하·판매 지원',
  '빈집 활용',
  '현장 상태 확인',
  '무엇이 필요한지 모르겠습니다',
  '기타',
];

export const PHILOSOPHY_PRINCIPLES = [
  {
    num: '01',
    title: '식물보다 식물자산을 봅니다.',
    desc: '단순한 관상용 풀과 나무를 넘어 토지와 환경이 어우러진 실질적 자산으로 바라봅니다.',
  },
  {
    num: '02',
    title: '작업보다 예찰을 우선합니다.',
    desc: '무작정 기계를 돌려 깎기 전에, 왜 이런 상태인지 현장을 먼저 세심히 살핍니다.',
  },
  {
    num: '03',
    title: '발견한 것은 반드시 기록합니다.',
    desc: '현장에서 마주한 수목의 변화와 토양의 반응을 정직한 데이터와 사진으로 남깁니다.',
  },
  {
    num: '04',
    title: '모르면 추측하지 않습니다.',
    desc: '어설픈 짐작으로 공사를 권하지 않으며, 확인된 사실에 근거해서만 판단합니다.',
  },
  {
    num: '05',
    title: '필요한 작업만 합니다.',
    desc: '불필요한 과잉 시공과 값비싼 패키지 작업을 강요하지 않고 꼭 필요한 조치만 실행합니다.',
  },
  {
    num: '06',
    title: '안전하지 않은 작업은 중지합니다.',
    desc: '무리한 급경사지 작업이나 위험 수목 처리는 안전 프로토콜을 확보한 후 진행합니다.',
  },
  {
    num: '07',
    title: '모든 관리는 다음 관리를 위해 남깁니다.',
    desc: '일회성 작업으로 끝내지 않고 다음 계절, 다음 해의 지속 가능한 관리를 준비합니다.',
  },
];
