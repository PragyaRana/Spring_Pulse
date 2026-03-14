import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Landing() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);
  const featuresRef = useRef([]);

  useEffect(() => {
    setIsVisible(true);

    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 15;
      const y = (e.clientY / window.innerHeight - 0.5) * 15;

      if (heroRef.current) {
        heroRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add custom animations
  const style = document.createElement("style");
  style.textContent = `
    @keyframes floatWater {
      0%,100% { transform: translate(0,0) scale(1);}
      50% { transform: translate(-10px,-15px) scale(1.05);}
    }

    @keyframes ripple {
      0% { transform:scale(.8); opacity:.5;}
      100% { transform:scale(2); opacity:0;}
    }

    @keyframes fadeInUp {
      from {opacity:0; transform:translateY(20px);}
      to {opacity:1; transform:translateY(0);}
    }

    .animate-float-water { animation: floatWater 8s infinite ease-in-out;}
    .animate-ripple { animation: ripple 3s infinite;}
    .animate-fade-in-up { animation: fadeInUp .6s ease-out forwards;}
  `;
  document.head.appendChild(style);

  return (
    <div className="bg-gradient-to-b from-[#F2F7F6] to-white min-h-screen font-sans overflow-x-hidden">
      
      {/* NAVBAR - Enhanced with glassmorphism */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 lg:px-12">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#1F3D3A] to-[#2E9F8F] bg-clip-text text-transparent">
            SpringPulse
          </h1>

          <div className="hidden md:flex gap-8">
            {['Home', 'Springs', 'Analytics', 'Contact'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-[#516C67] hover:text-[#2E9F8F] transition-all duration-300 relative group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#2E9F8F] transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>

          <Link
            to="/login"
            className="bg-gradient-to-r from-[#FF7A2F] to-[#FF9B5E] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:shadow-lg hover:shadow-[#FF7A2F]/30 transform hover:-translate-y-0.5 transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* HERO - Enhanced with animations */}
      <section className="text-center pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#2E9F8F]/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FF7A2F]/10 rounded-full blur-3xl"></div>
        </div>

        <div className={`relative transform transition-all duration-1000 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <h1 className="text-5xl lg:text-7xl font-bold text-[#1F3D3A] mb-6 leading-tight">
            Protect Himalayan
            <span className="block text-transparent bg-gradient-to-r from-[#2E9F8F] to-[#FF7A2F] bg-clip-text">
              Natural Springs
            </span>
          </h1>

          <p className="text-[#6E8C86] max-w-2xl mx-auto mb-10 text-lg">
            AI-powered early warning system for monitoring natural water springs 
            across Himalayan villages. Real-time intelligence for sustainable conservation.
          </p>

          {/* <div className="flex justify-center gap-4 mb-16 flex-wrap">
            <Link
              to="/login"
              className="group bg-gradient-to-r from-[#2E9F8F] to-[#58C4B4] text-white px-8 py-3.5 rounded-full font-medium hover:shadow-xl hover:shadow-[#2E9F8F]/30 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span className="flex items-center gap-2">
                Open Dashboard
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </Link>

            <Link
              to="/register"
              className="border-2 border-[#2E9F8F] text-[#2E9F8F] px-8 py-3.5 rounded-full font-medium hover:bg-[#2E9F8F] hover:text-white transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Register Spring
            </Link>
          </div> */}
        </div>

        {/* HERO IMAGE - Enhanced with floating animation */}
        <div className="flex justify-center relative px-4">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#2E9F8F] to-[#58C4B4] rounded-[40px] blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <img
              ref={heroRef}
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
              alt="Himalayan Spring"
              className="rounded-[40px] shadow-2xl w-[1000px] max-w-full relative z-10 transform transition-transform duration-300 group-hover:scale-[1.02]"
            />
            {/* Stats overlay */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 z-20 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1F3D3A]">150+</p>
                  <p className="text-xs text-[#6E8C86]">Monitored Springs</p>
                </div>
                <div className="text-center border-x border-gray-200">
                  <p className="text-2xl font-bold text-[#1F3D3A]">85%</p>
                  <p className="text-xs text-[#6E8C86]">Health Score Avg</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-[#1F3D3A]">45</p>
                  <p className="text-xs text-[#6E8C86]">Villages Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ROLE SELECTION SECTION - From first code with enhanced UI */}
      <section className="max-w-7xl mx-auto px-6 mt-24">
        <div className="text-center mb-16">
          <span className="text-[#2E9F8F] font-semibold text-sm uppercase tracking-wider">Who We Serve</span>
          <h2 className="text-4xl font-bold text-[#1F3D3A] mt-2">
            Choose Your Role
          </h2>
          <p className="text-[#6E8C86] max-w-2xl mx-auto mt-4">
            Select your role to access the appropriate dashboard and tools for spring monitoring and management.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* VILLAGER */}
          <Link to="/villager/login">
            <div className="group relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2E9F8F]/5 to-[#58C4B4]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2E9F8F] to-[#58C4B4] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl animate-float-water">👨‍🌾</span>
                </div>
                <h3 className="text-2xl font-bold text-[#1F3D3A] mb-3">
                  Register as Villager
                </h3>
                <p className="text-[#6E8C86] mb-6">
                  Report water sources & spring conditions
                </p>
                <div className="flex items-center justify-center text-[#2E9F8F] group-hover:translate-x-2 transition-transform">
                  <span className="text-sm font-medium">Access Portal</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* NGO */}
          <Link to="/ngo/login">
            <div className="group relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF7A2F]/5 to-[#FF9B5E]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#FF7A2F] to-[#FF9B5E] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl animate-float-water">🌿</span>
                </div>
                <h3 className="text-2xl font-bold text-[#1F3D3A] mb-3">
                  Login as NGO
                </h3>
                <p className="text-[#6E8C86] mb-6">
                  Manage and verify natural springs
                </p>
                <div className="flex items-center justify-center text-[#FF7A2F] group-hover:translate-x-2 transition-transform">
                  <span className="text-sm font-medium">Access Portal</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* OFFICER */}
          <Link to="/officer/login">
            <div className="group relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1F3D3A]/5 to-[#2E9F8F]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#1F3D3A] to-[#2E9F8F] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl animate-float-water">🏛</span>
                </div>
                <h3 className="text-2xl font-bold text-[#1F3D3A] mb-3">
                  Login as Officer
                </h3>
                <p className="text-[#6E8C86] mb-6">
                  Government spring monitoring
                </p>
                <div className="flex items-center justify-center text-[#1F3D3A] group-hover:translate-x-2 transition-transform">
                  <span className="text-sm font-medium">Access Portal</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>

          {/* ADMIN */}
          <Link to="/admin/login">
            <div className="group relative bg-white rounded-3xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#516C67]/5 to-[#6E8C86]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#516C67] to-[#6E8C86] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl animate-float-water">🛡</span>
                </div>
                <h3 className="text-2xl font-bold text-[#1F3D3A] mb-3">
                  Login as Admin
                </h3>
                <p className="text-[#6E8C86] mb-6">
                  System management and data control
                </p>
                <div className="flex items-center justify-center text-[#516C67] group-hover:translate-x-2 transition-transform">
                  <span className="text-sm font-medium">Access Portal</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* FEATURE SECTION - Enhanced with modern design */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="bg-gradient-to-r from-[#2E9F8F] via-[#58C4B4] to-[#7FD6C9] text-white rounded-[40px] p-12 flex flex-col md:flex-row items-center gap-12 shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
          <div className="relative group">
            <div className="absolute -inset-1 bg-white/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <img
              src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Spring Health"
              className="w-72 h-72 object-cover rounded-3xl shadow-xl relative z-10"
            />
          </div>
          
          <div className="flex-1">
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
              ✦ AI-Powered Intelligence
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Spring Health Intelligence
            </h2>
            <p className="text-white/90 text-lg max-w-lg leading-relaxed">
              Weekly data submitted by villagers helps AI detect early degradation 
              patterns and calculate Spring Health Scores for preventive action, 
              ensuring sustainable water resources for future generations.
            </p>
            
            {/* Feature points */}
            <div className="mt-6 grid grid-cols-2 gap-4">
              {['Real-time Monitoring', 'Predictive Analytics', 'Community Verified', 'Instant Alerts'].map((feature, i) => (
                <div key={i} className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS - Enhanced with cards */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <div className="text-center mb-16">
          <span className="text-[#2E9F8F] font-semibold text-sm uppercase tracking-wider">Process</span>
          <h2 className="text-4xl font-bold text-[#1F3D3A] mt-2">
            How SpringPulse Works
          </h2>
          <p className="text-[#6E8C86] max-w-2xl mx-auto mt-4">
            From community data collection to actionable insights, our platform makes spring protection simple and effective.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            { 
              icon: "📊", 
              title: "Community Data", 
              desc: "Villagers submit weekly water flow measurements",
              color: "from-[#FF7A2F] to-[#FF9B5E]"
            },
            { 
              icon: "🤖", 
              title: "AI Analysis", 
              desc: "Trend analysis detects early degradation",
              color: "from-[#2E9F8F] to-[#58C4B4]"
            },
            { 
              icon: "💧", 
              title: "Health Score", 
              desc: "Each spring receives a health score 0-100",
              color: "from-[#1F3D3A] to-[#2E9F8F]"
            },
            { 
              icon: "🗺️", 
              title: "Heatmap Dashboard", 
              desc: "Authorities view risks using heatmaps",
              color: "from-[#516C67] to-[#6E8C86]"
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="group bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <span className="text-3xl animate-float-water">{item.icon}</span>
              </div>
              <h3 className="font-bold text-xl text-[#1F3D3A] mb-3">{item.title}</h3>
              <p className="text-[#6E8C86] leading-relaxed">{item.desc}</p>
              
              {/* Progress indicator */}
              <div className="mt-6 h-1 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full bg-gradient-to-r ${item.color} w-0 group-hover:w-full transition-all duration-1000`}></div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ROLES - Enhanced with interactive cards */}
      <section className="max-w-7xl mx-auto px-6 mt-32">
        <h2 className="text-center text-4xl font-bold text-[#1F3D3A] mb-16">
          Who Uses SpringPulse
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { 
              role: "Villager", 
              desc: "Register springs and submit weekly water flow data",
              icon: "👥",
              features: ["Easy data entry", "Mobile friendly", "Local language support"]
            },
            { 
              role: "NGO", 
              desc: "Verify field conditions and monitor restoration work",
              icon: "🌱",
              features: ["Field verification", "Progress tracking", "Impact reports"]
            },
            { 
              role: "Officer", 
              desc: "View analytics dashboards and plan interventions",
              icon: "📈",
              features: ["Real-time analytics", "Risk assessment", "Resource planning"]
            }
          ].map((item, i) => (
            <div 
              key={i} 
              className="group bg-gradient-to-b from-white to-gray-50 rounded-3xl shadow-xl p-8 text-center hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 relative overflow-hidden"
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#2E9F8F] rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#FF7A2F] rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-[#2E9F8F] to-[#58C4B4] rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-4xl animate-float-water">{item.icon}</span>
                </div>
                
                <h3 className="font-bold text-2xl text-[#1F3D3A] mb-4">{item.role}</h3>
                <p className="text-[#6E8C86] mb-6">{item.desc}</p>
                
                {/* Feature list */}
                <ul className="text-left space-y-2">
                  {item.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-[#516C67]">
                      <svg className="w-4 h-4 text-[#2E9F8F]" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA - Enhanced with modern design */}
      <section className="text-center mt-32 mb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E9F8F]/20 to-[#58C4B4]/20 blur-3xl"></div>
        <div className="relative max-w-4xl mx-auto px-6">
          <div className="bg-gradient-to-r from-[#1F3D3A] to-[#2E9F8F] text-white rounded-[50px] p-16 shadow-2xl">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Join the Water Protection Network
            </h2>
            <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
              Be part of the solution. Join hundreds of communities already using SpringPulse to protect their water resources.
            </p>
            
            <div className="flex justify-center gap-6 flex-wrap">
              <Link
                to="/login"
                className="group bg-white text-[#1F3D3A] px-10 py-4 rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="flex items-center gap-2">
                  Get Started
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </Link>
              
              <Link
                to="/register"
                className="border-2 border-white text-white px-10 py-4 rounded-full font-semibold hover:bg-white hover:text-[#1F3D3A] transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Register Now
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-12 flex justify-center gap-8 text-sm text-white/80">
              <span>✨ No credit card required</span>
              <span>🔒 Free for communities</span>
              <span>⚡ 5-minute setup</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Enhanced with modern design */}
      <footer className="bg-[#1A2D2A] text-gray-300 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#2E9F8F] via-[#58C4B4] to-[#FF7A2F]"></div>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 px-6 py-16 relative z-10">
          <div>
            <h3 className="text-white text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              SpringPulse
            </h3>
            <p className="text-sm opacity-80 leading-relaxed">
              AI intelligence platform protecting natural water springs in Himalayan villages through community-driven conservation.
            </p>
            
            {/* Social links */}
            <div className="flex gap-4 mt-6">
              {['twitter', 'linkedin', 'github'].map((social) => (
                <a key={social} href="#" className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#2E9F8F] transition-colors duration-300">
                  <span className="text-sm">{social[0].toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Platform</h4>
            <ul className="space-y-3">
              {['Spring Monitoring', 'Health Score', 'Heatmap Dashboard', 'API Access'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Resources</h4>
            <ul className="space-y-3">
              {['Documentation', 'Community Forum', 'Support Center', 'Blog'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 text-lg">Stay Updated</h4>
            <p className="text-sm opacity-80 mb-4">
              Get the latest updates on spring protection initiatives.
            </p>
            <div className="relative">
              <input
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-[#2E9F8F] focus:bg-white/20 transition-all"
              />
              <button className="absolute right-2 top-2 px-4 py-1.5 bg-gradient-to-r from-[#2E9F8F] to-[#58C4B4] text-white rounded-lg text-sm font-medium hover:shadow-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm">
            <p>© 2024 SpringPulse. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Landing;