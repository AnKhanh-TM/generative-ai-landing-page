import { GraduationCap, Code, Briefcase, Zap, BarChart, Users, Brain, Bot, Rocket } from 'lucide-react';

// Helper to get image path. In Vite, files in 'public/trainer' are served at './trainer' relative to the base.
const getTrainerImage = (source: string) => {
  if (source.startsWith('http')) {
    return source;
  }
  return `./trainer/${source}`;
};

export const NAV_LINKS = [
  { label: 'Nội dung', href: '#curriculum' },
  { label: 'Giảng viên', href: '#instructors' },
  { label: 'Lợi ích', href: '#benefits' },
  { label: 'Học phí', href: '#pricing' },
];

export const SESSIONS = [
  {
    id: 1,
    title: "Buổi 1: Key concept of Generative AI & Advanced Prompting",
    icon: Brain,
    details: [
      "Nắm chắc nền tảng AI & LLM: cách AI tạo ra text, hình ảnh, video và cách mô hình hiểu được ngôn ngữ tự nhiên.",
      "Tư duy Prompt Engineering: Làm sao để viết Prompt giúp AI hiểu đúng ý và làm đúng việc?",
      "Thực hành dùng GenAI cho việc tự học và nghiên cứu để không bị lạc hậu.",
      "Tạo Custom GPT để xử lý các tác vụ lặp lại nhanh hơn trong công việc hằng ngày.",
      "Case study: sử dụng GenAI phân tích và giải quyết một bài toán marketing & business."
    ]
  },
  {
    id: 2,
    title: "Buổi 2: Big Data Analysis",
    icon: BarChart,
    details: [
      "Cách sử dụng GenAI để tạo code Python trong việc làm sạch dữ liệu, trực quan hoá và phân tích khám phá (EDA) dành cho người chưa từng biết code.",
      "Các nguyên tắc trong trực quan hóa dữ liệu nhằm phát hiện insights nhanh và chính xác.",
      "Sử dụng GenAI để phân tích insights và đưa ra đề xuất, tạo 1 bản báo cáo phân tích hoàn chỉnh."
    ]
  },
  {
    id: 3,
    title: "Buổi 3: Daily Productivity",
    icon: Zap,
    details: [
      "Dùng AI để tự động hoá các công việc lặp lại hàng ngày: Tạo biên bản họp từ ghi âm cuộc họp, thiết kế slides tự động,...",
      "Thực hành xây dựng website phục vụ cho công việc từ thiết kế đến triển khai bằng AI nhanh chóng.",
      "Tổng hợp các công cụ AI phổ biến theo mục đích sử dụng để dễ dàng áp dụng vào công việc mà không phải mất công tìm kiếm."
    ]
  },
  {
    id: 4,
    title: "Buổi 4: Automation with n8n",
    icon: Rocket,
    details: [
      "Tổng quan về Automation và cách AI kết hợp cùng các nền tảng như n8n để tự động hoá công việc hằng ngày.",
      "Từ ý tưởng đến thực tế: Học cách biến những công việc thủ công lặp đi lặp lại thành quy trình chạy tự động.",
      "Nắm được cách tích hợp AI vào quy trình làm việc để xử lý nội dung nhanh và chính xác hơn.",
      "Thực hành xây dựng một workflow tự động hoàn chỉnh với n8n, kể cả bạn không có nền tảng kỹ thuật."
    ]
  },
  {
    id: 5,
    title: "Buổi 5: Building Q&A Assistant",
    icon: Bot,
    details: [
      "Hiểu cách AI Agent suy nghĩ và trả lời qua mô hình RAG (Retrieval-Augmented Generation).",
      "Tạo “trí nhớ dài hạn” bằng Vector Database (Pinecone) để AI truy xuất tài liệu nhanh và chính xác.",
      "Thực hành xây dựng hệ thống AI hỏi–đáp nội bộ bằng n8n, giúp tự động hóa việc tra cứu và phản hồi thông tin dựa trên kho tài liệu doanh nghiệp."
    ]
  },
  {
    id: 6,
    title: "Buổi 6: Building AI Customer Service Agent",
    icon: Users,
    details: [
      "Tìm hiểu kiến trúc của một chatbot CSKH hiện đại: lấy tin nhắn khách hàng, hiểu câu hỏi, truy vấn dữ liệu, và phản hồi tự động theo đúng brand voice.",
      "Hướng dẫn phương pháp xây dựng quy trình RAG + LLM hoàn chỉnh để chatbot trả lời một cách nhất quán và chính xác.",
      "Đánh giá chất lượng phản hồi của chatbot và cải thiện: rà soát trường hợp bot trả lời sai, tối ưu dữ liệu trong RAG, cải thiện prompt, chuẩn hóa tone-of-voice, và nâng tỷ lệ chính xác khi vận hành thực tế."
    ]
  }
];

export const INSTRUCTORS = [
  {
    name: "Anh Minh Quang",
    role: "Founder & CEO @Tomorrow Marketers",
    education: [
      "Executive MBA @Kellogg School of Management & @Peking University",
      "Master Science/BA @National University of Singapore"
    ],
    bio: "Được đào tạo bài bản về Big Data, AI, và Machine Learning tại NUS (#6 thế giới về Data Science). Có 9 năm điều hành Tomorrow Marketers. Từng làm việc tại NielsenIQ, Ogilvy. Trực tiếp đào tạo AI cho Invisalign, Hyundai, Ajinomoto...",
    image: getTrainerImage('minh-quang.png')
  },
  {
    name: "Anh Minh Hiếu",
    role: "Former Core Assurance @EY",
    education: [
      "Master of Science/ Business Analytics @National University of Singapore"
    ],
    bio: "Chuyên môn về Data visualization, Data Engineering, ML và Analytics. Từng làm các dự án forecasting tại Johnson & Johnson Singapore và EY. Thành thạo Python, SQL, Tableau, Postgres SQL.",
    image: getTrainerImage('minh-hieu.png')
  },
  {
    name: "Anh Nguyễn Trường Giang",
    role: "AI Engineer @Viettel - Modeler @SHB",
    education: [
      "PhD, Computational and Quantum Chemistry @National University of Singapore"
    ],
    bio: "Tiến sĩ ngành Hóa tính toán & Lượng tử tại NUS. Kinh nghiệm nghiên cứu định lượng (Quantitative Research) tại DRW và Quant Matter. Thành thạo Python, C++, Financial Modeling. Tác giả nhiều công trình nghiên cứu quốc tế.",
    image: getTrainerImage('truong-giang.png')
  }
];

export const BENEFITS = [
  {
    title: "Hiểu sâu bản chất AI",
    desc: "Biết AI làm được gì và không làm được gì. Hiểu cách máy học và tại sao nó có thể thay thế con người ở một số lĩnh vực.",
    icon: Brain
  },
  {
    title: "Ứng dụng vào bài toán cụ thể",
    desc: "Phân tích dữ liệu không cần code. Xây dựng quy trình tự động hóa với n8n, triển khai AI Agent và Chatbot CSKH.",
    icon: Briefcase
  },
  {
    title: "Tạo code Python bằng AI",
    desc: "Gia tăng hiệu suất bằng cách dùng AI viết code xử lý dữ liệu, làm slide, research thông tin mà không cần học lập trình chuyên sâu.",
    icon: Code
  }
];

export const AUDIENCE = [
  {
    title: "Nhân sự Sales, Marketing & Non-IT",
    desc: "Muốn áp dụng AI vào gia tăng hiệu suất công việc hàng ngày, đặc biệt với các use case cụ thể trong phân tích dữ liệu và content marketing mà không cần biết code.",
    icon: Users
  },
  {
    title: "Các nhà lãnh đạo, quản lý",
    desc: "Muốn hiểu bản chất về AI để chuẩn bị các bước chuyển đổi doanh nghiệp trong xu hướng 'AI or Die'. Ứng dụng ngay AI để cạnh tranh và đi trước đối thủ.",
    icon: GraduationCap
  }
];

export const TESTIMONIALS = [
  {
    name: "Phương Ngân",
    role: "Marketing Executive @Brand Thời Trang",
    content: "Mình đã tận dụng ChatGPT để tìm hiểu quy trình rebranding. Nó hiệu quả hơn so với việc phải tự vật lộn với các yêu cầu đột xuất từ manager như trước kia."
  },
  {
    name: "Hưng Nguyễn",
    role: "Marketing Director @Eye plus",
    content: "Sau khóa học, mindset đội ngũ đã thay đổi, biết chuyển đổi số liệu thành biểu đồ. Mình rất thích Google Colab, giúp người không master Excel vẫn làm việc tốt với data."
  },
  {
    name: "Minh Tú",
    role: "Senior Finance Manager @Carlsberg Group",
    content: "Khoá học rất hữu ích. Anh hiểu thêm nhiều về GenAI, ứng dụng viết code python phân tích. Giảng viên rất chất lượng và nhiều kiến thức thực tiễn."
  },
  {
    name: "Hải Dương",
    role: "Senior Growth Manager @Fintech",
    content: "Em xây dựng được sản phẩm dựa trên hiểu nguyên lý của AI. Tiết lộ là em cũng ký được một hợp đồng nhờ tận dụng prompt engineering RAG."
  }
];

export const PRICING = [
  {
    type: "Standard",
    target: "Người đi làm / Sinh viên",
    price: "7,549,000",
    note: "Học phí tiêu chuẩn chưa áp dụng ưu đãi",
    highlight: false,
    color: "from-blue-500 to-cyan-500"
  },
  {
    type: "Early Bird",
    target: "Người đi làm",
    price: "6,037,000",
    subPrice: "5,497,000",
    subLabel: "Sinh viên",
    note: "Học phí ưu đãi khi đăng ký sớm",
    highlight: true,
    color: "from-purple-600 to-indigo-600"
  },
  {
    type: "Alumni",
    target: "Người đi làm / Sinh viên",
    price: "5,281,000",
    note: "Học phí dành cho cựu học viên Tomorrow Marketers",
    highlight: false,
    color: "from-pink-500 to-rose-500"
  }
];