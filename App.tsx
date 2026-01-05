import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, CheckCircle2, ChevronRight, Menu, X,
  MapPin, Phone, Mail, Facebook, Youtube, Linkedin,
  Users, GraduationCap, Calendar, ShieldAlert, Star
} from 'lucide-react';
import { SESSIONS, INSTRUCTORS, BENEFITS, AUDIENCE, TESTIMONIALS, PRICING, NAV_LINKS } from './constants';

// --- Helper Component: Image With Fallback ---
const ImageWithFallback = ({ src, alt, className }: { src?: string, alt: string, className?: string }) => {
  const [error, setError] = useState(false);

  // Reset error state when src changes
  useEffect(() => {
    setError(false);
  }, [src]);

  if (error || !src) {
    return (
      <div className={`flex items-center justify-center bg-slate-800 text-slate-600 ${className}`}>
        <Users size={64} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        // If the png fails, we show the fallback icon.
        // Console error removed to keep logs clean.
        setError(true);
      }}
      loading="lazy"
    />
  );
};

// --- Particle Background Component ---
const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    const particleCount = 60;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'rgba(56, 189, 248, 0.5)'; // sky-400 with opacity

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.1)';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40" />;
};

// --- RevealOnScroll Component ---
const RevealOnScroll = ({ children, className = "", delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      {children}
    </div>
  );
};

// --- Navbar ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600">
              GenAI Masterclass
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {NAV_LINKS.map(link => (
                <a key={link.label} href={link.href} className="text-gray-300 hover:text-cyan-400 transition-colors px-3 py-2 rounded-md text-sm font-medium">
                  {link.label}
                </a>
              ))}
              <a href="#register" className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95">
                Đăng ký ngay
              </a>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

// --- Hero Section ---
const Hero = () => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 font-medium text-sm backdrop-blur-sm animate-fade-in-up">
          🚀 Khóa học AI thực chiến cho người đi làm
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 animate-fade-in-up delay-100">
          Master <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">Generative AI</span><br />
          To Boost Your Career
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-400 mb-10 animate-fade-in-up delay-200">
          Làm chủ công cụ AI, tối ưu hóa hiệu suất làm việc và giải quyết các bài toán kinh doanh thực tế chỉ trong 6 tuần.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up delay-300">
          <a href="#register" className="group bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 flex items-center gap-2">
            Đăng ký ngay
            <ArrowRight className="group-hover:translate-x-1 transition-transform" />
          </a>
          <a href="#curriculum" className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2">
            Xem lộ trình
          </a>
        </div>
      </div>
    </div>
  )
}

// --- Benefits Section ---
const BenefitsSection = () => {
  return (
    <div id="benefits" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Lợi ích khóa học</h2>
          <p className="text-gray-400">Những giá trị bạn nhận được sau 6 tuần huấn luyện</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {BENEFITS.map((item, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100} className="bg-slate-800/50 p-8 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-all hover:bg-slate-800/80 group">
              <div className="w-14 h-14 bg-cyan-500/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                {React.createElement(item.icon, { size: 32 })}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </RevealOnScroll>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-white">Khóa học này dành cho ai?</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {AUDIENCE.map((item, idx) => (
              <RevealOnScroll key={idx} delay={idx * 100} className="flex gap-6 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/5">
                <div className="flex-shrink-0 w-12 h-12 bg-pink-500/10 rounded-full flex items-center justify-center text-pink-500">
                  {React.createElement(item.icon, { size: 24 })}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Curriculum Section (Mindly Style) ---
const Curriculum = () => {
  const [activeSession, setActiveSession] = useState(0);

  return (
    <div id="curriculum" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold tracking-wider uppercase">Lộ trình học tập</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">
            Nội dung <span className="gradient-text">Chi tiết</span> khóa học
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            6 buổi học chuyên sâu đi từ tư duy nền tảng đến ứng dụng thực tế và xây dựng sản phẩm AI hoàn chỉnh.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 glass-card rounded-2xl p-4 md:p-8">
          {/* Left Side: Session List */}
          <div className="lg:w-1/3 space-y-3">
            {SESSIONS.map((session, index) => (
              <button
                key={session.id}
                onClick={() => setActiveSession(index)}
                className={`w-full text-left p-4 rounded-xl transition-all duration-300 active:scale-95 flex items-center justify-between group ${activeSession === index
                  ? 'bg-white/10 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.15)]'
                  : 'bg-transparent hover:bg-white/5 border border-transparent'
                  }`}
              >
                <div>
                  <div className={`text-xs font-medium mb-1 ${activeSession === index ? 'text-cyan-400' : 'text-gray-500'}`}>
                    WEEK {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className={`font-medium ${activeSession === index ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {session.title.split(':')[1] || session.title}
                  </h3>
                </div>
                {activeSession === index && <ChevronRight className="text-cyan-400 w-5 h-5" />}
              </button>
            ))}
          </div>

          {/* Right Side: Details */}
          <div className="lg:w-2/3 bg-slate-900/50 rounded-xl p-6 md:p-8 border border-white/5 relative overflow-hidden">
            {/* Glow effect */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full pointer-events-none"></div>

            <div className="relative z-10 animate-fade-in key={activeSession}">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-cyan-500/20 rounded-lg text-cyan-400">
                  {React.createElement(SESSIONS[activeSession].icon, { size: 28 })}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white">
                  {SESSIONS[activeSession].title}
                </h3>
              </div>

              <div className="space-y-4">
                {SESSIONS[activeSession].details.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-1" />
                    <p className="text-gray-300 leading-relaxed">
                      {point}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <span className="w-2 h-2 rounded-full bg-green-500"></span>
                  Beginner Friendly
                </div>
                <button className="text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  Xem tài liệu
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Instructors Section ---
const InstructorsSection = () => {
  return (
    <div id="instructors" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-semibold tracking-wider uppercase">Đội ngũ chuyên gia</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-white">Giảng viên hướng dẫn</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {INSTRUCTORS.map((instructor, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100} className="group relative">
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 to-purple-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative bg-slate-900 rounded-2xl border border-white/10 overflow-hidden h-full flex flex-col">
                <div className="aspect-[4/3] overflow-hidden relative">
                  <ImageWithFallback src={instructor.image} alt={instructor.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{instructor.name}</h3>
                    <p className="text-cyan-400 text-sm font-medium">{instructor.role}</p>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-4">
                    {instructor.education.map((edu, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-gray-400 mb-1">
                        <GraduationCap size={14} className="mt-0.5 flex-shrink-0" />
                        <span>{edu}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed mt-auto">
                    {instructor.bio}
                  </p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Testimonials Section ---
const TestimonialsSection = () => {
  return (
    <div className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Học viên nói gì?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <RevealOnScroll key={i} delay={i * 50} className="bg-white/5 p-6 rounded-xl border border-white/5">
              <div className="flex gap-1 text-yellow-500 mb-4">
                {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
              </div>
              <p className="text-gray-300 text-sm mb-6 italic">"{t.content}"</p>
              <div>
                <h4 className="text-white font-bold text-sm">{t.name}</h4>
                <p className="text-gray-500 text-xs">{t.role}</p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Pricing Section ---
const PricingSection = () => {
  return (
    <div id="pricing" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Học phí & Ưu đãi</h2>
          <p className="text-gray-400">Đầu tư cho sự nghiệp với chi phí hợp lý nhất</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-center">
          {PRICING.map((plan, idx) => (
            <div key={idx} className={`relative bg-slate-900 rounded-2xl border ${plan.highlight ? 'border-cyan-500 ring-2 ring-cyan-500/20' : 'border-white/10'} p-8 ${plan.highlight ? 'transform md:-translate-y-4' : ''}`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                  Best Value
                </div>
              )}
              <h3 className="text-xl font-bold text-white mb-2">{plan.type}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.target}</p>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-white">{plan.price}</span>
                  <span className="text-gray-400 text-sm">VND</span>
                </div>
                {plan.subPrice && (
                  <div className="text-sm text-cyan-400 mt-1">
                    {plan.subPrice} VND ({plan.subLabel})
                  </div>
                )}
              </div>

              <div className={`h-1 w-full bg-gradient-to-r ${plan.color} rounded-full mb-6`}></div>

              <p className="text-gray-300 text-sm mb-8 min-h-[40px]">{plan.note}</p>

              <a href="#register" className={`block w-full py-3 rounded-lg text-center font-bold transition-all duration-300 transform active:scale-95 ${plan.highlight ? 'bg-cyan-500 hover:bg-cyan-400 text-white shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40' : 'bg-white/10 hover:bg-white/20 text-white'}`}>
                Đăng ký ngay
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// --- Registration Form Section ---
const RegistrationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    yearOfBirth: '',
    location: '',
    course: 'genai',
    isAlumni: 'no',
    goal: '',
    consultation: 'yes',
    consultationTime: 'sang',
    groupInfo: ''
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = 'Vui lòng nhập họ tên của bạn';

    if (!formData.email.trim()) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/[\s.-]/g, ''))) {
      newErrors.phone = 'Số điện thoại không hợp lệ (10-11 số)';
    }

    if (!formData.location) newErrors.location = 'Vui lòng chọn khu vực';

    if (formData.yearOfBirth && !/^\d{4}$/.test(formData.yearOfBirth)) {
      newErrors.yearOfBirth = 'Năm sinh không hợp lệ';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);

      // Mapping for Google Sheets
      const locationMap: Record<string, string> = {
        'hn': 'Hà Nội',
        'hcm': 'Hồ Chí Minh',
        'other': 'Khác / Online'
      };

      const courseMap: Record<string, string> = {
        'genai': 'Generative AI Masterclass',
        'data_analysis': 'Data Analysis',
        'automation': 'Automation with n8n'
      };

      const timeMap: Record<string, string> = {
        'sang': 'Sáng (8h30 - 12h00)',
        'chieu': 'Chiều (13h30 - 17h30)',
        'toi': 'Tối (Sau 18h00)'
      };

      // Use English keys for stability and URLSearchParams for better compatibility
      const params = new URLSearchParams();
      // 'Timestamp' column is auto-generated by your script, so we don't send it.
      params.append('Full_Name', formData.name);
      params.append('Email', formData.email);
      params.append('Phone_Number', formData.phone);
      params.append('Year_of_Birth', formData.yearOfBirth);
      params.append('City', locationMap[formData.location] || formData.location);
      params.append('Course', courseMap[formData.course] || formData.course);
      params.append('Is_Alumni', formData.isAlumni === 'yes' ? 'Có' : 'Không');
      params.append('Goal', formData.goal);
      params.append('Need_Consultation', formData.consultation === 'yes' ? 'Có' : 'Không');
      params.append('Consultation_Time', timeMap[formData.consultationTime] || formData.consultationTime);
      params.append('Group_Info', formData.groupInfo);

      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      if (!GOOGLE_SCRIPT_URL) {
        console.error("VITE_GOOGLE_SCRIPT_URL is not defined");
        alert("Cấu hình lỗi: Không tìm thấy URL API.");
        setIsSubmitting(false);
        return;
      }

      try {
        await fetch(GOOGLE_SCRIPT_URL, {
          method: 'POST',
          body: params,
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        // Since no-cors returns an opaque response, we assume success if no network error occurred.
        alert("Đăng ký thành công! Dữ liệu đã được gửi.");
        setFormData({
          name: '',
          email: '',
          phone: '',
          yearOfBirth: '',
          location: '',
          course: 'genai',
          isAlumni: 'no',
          goal: '',
          consultation: 'yes',
          consultationTime: 'sang',
          groupInfo: ''
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        alert("Có lỗi xảy ra khi gửi đăng ký. Vui lòng thử lại sau.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const getInputClass = (fieldName: string) => `w-full p-3 bg-white border ${errors[fieldName] ? 'border-red-500 ring-1 ring-red-500' : 'border-slate-300'} rounded-md focus:ring-2 ${errors[fieldName] ? 'focus:ring-red-500' : 'focus:ring-pink-500'} focus:border-transparent outline-none transition-all placeholder-slate-400 text-slate-800`;

  return (
    <section id="register" className="py-24 relative overflow-hidden bg-slate-950">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/20 via-purple-900/20 to-slate-950 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-0 shadow-2xl rounded-3xl overflow-hidden">

          {/* Left Column: Info & Policies */}
          <div className="bg-slate-900/80 backdrop-blur-md p-8 md:p-12 relative flex flex-col gap-8 border-r border-white/5">
            {/* Decorative Gradients */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
            <div className="absolute -left-20 top-20 w-60 h-60 bg-blue-500/20 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 right-0 w-60 h-60 bg-purple-500/20 rounded-full blur-[80px]"></div>

            {/* Schedule Block */}
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-6">Lịch khai giảng</h3>
              <div className="bg-white/5 border-l-4 border-pink-500 p-6 rounded-r-lg">
                <div className="inline-block px-3 py-1 bg-pink-500/20 text-pink-400 text-xs font-bold uppercase rounded mb-3">
                  Lớp học Online
                </div>
                <ul className="space-y-3 text-gray-300 text-sm md:text-base">
                  <li className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-pink-500 flex-shrink-0" />
                    <span>Khai giảng: <strong className="text-white">10/03/2026</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>Lịch học (6 tuần): Thứ 3 (19h00 - 21h00) hàng tuần</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
                    <span>Hình thức học: Online qua nền tảng Zoom</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-pink-500 flex-shrink-0" />
                    <span>Hotline: 090.586.2499 (Ms. Yến)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Note Block */}
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white mb-4">Lưu ý</h3>
              <div className="bg-white/5 p-5 rounded-lg border border-white/10 text-gray-300 text-sm leading-relaxed">
                Trong vòng 01 ngày làm việc, TM Team sẽ liên hệ hỗ trợ bạn tìm hiểu về khoá học và xác thực nhu cầu. Hãy giữ liên lạc với TM qua email hoặc điện thoại nhé.
              </div>
            </div>

            {/* Privacy Block */}
            <div className="relative z-10 mt-auto">
              <h3 className="text-2xl font-bold text-white mb-4">Cam kết bảo mật thông tin</h3>
              <div className="bg-gradient-to-br from-white/10 to-transparent p-6 rounded-xl border border-white/10 relative overflow-hidden group hover:border-white/20 transition-all">
                <ShieldAlert className="w-12 h-12 text-white/10 absolute top-4 right-4 group-hover:text-pink-500/20 transition-colors" />
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed relative z-10">
                  Khi tham gia học, bạn đồng ý rằng <span className="text-pink-400 font-semibold">các nội dung trong khóa học là tài sản trí tuệ của Tomorrow Marketers</span>. Việc chia sẻ tài liệu ra ngoài phạm vi lớp học là xâm phạm quyền sở hữu trí tuệ và có thể phải chịu mọi trách nhiệm trước pháp luật theo điều 225, 226 bộ luật hình sự.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: The Form */}
          <div className="bg-[#fffefb] p-8 md:p-12 text-slate-800">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              Đăng ký học Data & AI tại Tomorrow Marketers
            </h2>
            <p className="text-slate-500 text-sm mb-8">
              Vui lòng điền đầy đủ các thông tin dưới đây. Chúng tôi sẽ liên lạc lại trong 24h làm việc.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit} noValidate>
              <div className="space-y-4">
                <div>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Họ tên của bạn"
                    className={getInputClass('name')}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>}
                </div>

                <div>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                    className={getInputClass('email')}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>}
                </div>

                <div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="Số điện thoại"
                    className={getInputClass('phone')}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1 ml-1">{errors.phone}</p>}
                </div>

                <div>
                  <input
                    name="yearOfBirth"
                    value={formData.yearOfBirth}
                    onChange={handleChange}
                    type="text"
                    placeholder="Năm sinh"
                    className={getInputClass('yearOfBirth')}
                  />
                  {errors.yearOfBirth && <p className="text-red-500 text-xs mt-1 ml-1">{errors.yearOfBirth}</p>}
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Bạn đang học tập, làm việc tại:*</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className={getInputClass('location')}
                  >
                    <option value="">-- Chọn khu vực --</option>
                    <option value="hn">Hà Nội</option>
                    <option value="hcm">Hồ Chí Minh</option>
                    <option value="other">Khác / Online</option>
                  </select>
                  {errors.location && <p className="text-red-500 text-xs mt-1 ml-1">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Khoá học Data & AI bạn quan tâm?*</label>
                  <select
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    className={getInputClass('course')}
                  >
                    <option value="genai">Generative AI Masterclass</option>
                    <option value="data_analysis">Data Analysis</option>
                    <option value="automation">Automation with n8n</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Bạn có phải cựu học viên không?*</label>
                  <select
                    name="isAlumni"
                    value={formData.isAlumni}
                    onChange={handleChange}
                    className={getInputClass('isAlumni')}
                  >
                    <option value="no">Không</option>
                    <option value="yes">Có</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Bạn mong muốn gì khi tham gia khoá học?</label>
                <textarea
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Chia sẻ với Tomorrow Marketers mục tiêu nghề nghiệp của bạn..."
                  className={getInputClass('goal')}
                ></textarea>
              </div>

              <div className="pt-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Bạn có muốn TM tư vấn thêm cho bạn về khóa học? *</label>
                <select
                  name="consultation"
                  value={formData.consultation}
                  onChange={handleChange}
                  className={getInputClass('consultation')}
                >
                  <option value="yes">Có, hãy tư vấn cho tôi</option>
                  <option value="no">Không, tôi đã hiểu rõ</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Khoảng thời gian phù hợp để TM tư vấn cho bạn</label>
                <select
                  name="consultationTime"
                  value={formData.consultationTime}
                  onChange={handleChange}
                  className={getInputClass('consultationTime')}
                >
                  <option value="sang">Sáng (8h30 - 12h00)</option>
                  <option value="chieu">Chiều (13h30 - 17h30)</option>
                  <option value="toi">Tối (Sau 18h00)</option>
                </select>
              </div>

              <div className="pt-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">Nếu đăng ký nhóm/ hoặc được cựu học viên giới thiệu, bạn hãy điền thông tin bạn của mình dưới đây</label>
                <input
                  name="groupInfo"
                  value={formData.groupInfo}
                  onChange={handleChange}
                  type="text"
                  placeholder="Họ tên - SĐT - email của nhóm bạn"
                  className={getInputClass('groupInfo')}
                />
              </div>

              <div className="pt-6">
                <button
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-[#de2e6c] hover:bg-[#c21e56] text-white font-bold rounded shadow-lg transform active:scale-95 transition-all w-fit flex items-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? 'ĐANG GỬI...' : 'ĐĂNG KÝ HỌC'}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// --- Footer ---
const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6">Tomorrow Marketers</h3>
            <p className="text-gray-400 mb-6 max-w-md">
              Học viện Marketing định hướng Đa quốc gia tiên phong tại Việt Nam. Chúng tôi tin rằng tư duy đúng đắn là nền tảng để làm chủ công nghệ và vươn xa trong sự nghiệp.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all"><Facebook size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all"><Youtube size={20} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-blue-700 hover:text-white transition-all"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Liên hệ</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span>090.586.2499 (Ms. Yến)</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span>info@tomorrowmarketers.org</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-cyan-500 flex-shrink-0" />
                <span>Tầng 3, 15/41 Thái Hà, Đống Đa, Hà Nội</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Khóa học khác</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Data System</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Data Analysis</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Mastering Data Analytics</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm">
          © 2024 Tomorrow Marketers Academy. All rights reserved.
        </div>
      </div>
    </footer>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans">
      <ParticleBackground />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <BenefitsSection />
        <Curriculum />
        <InstructorsSection />
        <TestimonialsSection />
        <PricingSection />
        <RegistrationSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;