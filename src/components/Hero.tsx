import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-white overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="space-y-8">
          <div className="flex justify-center mb-8">
            <img src="/WhatsApp Image 2025-10-24 at 3.06.52 AM.jpeg" alt="Khat Alriyadah" className="h-24 w-auto" />
          </div>

          <h1 className="text-h2 md:text-h1 font-bold leading-tight">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Khat Alriyadah
            </span>
            <br />
            <span className="text-h4 md:text-h3 text-gray-300 font-medium mt-2 block">
              Contracting Company
            </span>
          </h1>

          <p className="text-body-lg text-gray-300 max-w-2xl mx-auto">
            Excellence in Construction & Engineering Since 2011
          </p>

          <p className="text-body text-gray-400 max-w-xl mx-auto">
            Your trusted partner for world-class construction and engineering solutions across Saudi Arabia
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white text-body font-medium rounded-lg hover:shadow-lg transition-all duration-300"
            >
              Explore Our Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 backdrop-blur-sm text-white text-body font-medium rounded-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              Get Quote
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default Hero;
