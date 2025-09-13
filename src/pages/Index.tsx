import { useNavigate } from "react-router-dom";
import StarField from "@/components/StarField";
import GlowCard from "@/components/GlowCard";
import StarButton from "@/components/StarButton";
import cosmicHero from "@/assets/cosmic-hero.jpg";
import bibleImage from "@/assets/bible.jpg";
import geetaImage from "@/assets/geeta.webp";
import quranImage from "@/assets/Quran.webp";
import bigbangImage from "@/assets/bigbang.jpg";
import { MessageCircle, Book, Shield, Globe } from "lucide-react";
import { useRef } from "react";

const Index = () => {
  
  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const navigate = useNavigate();
  const bots = [
    {
      id: "scripture-a",
      title: "Geeta chat wisdom",
      description: "Explore the Bhagavad Gita's teachings to answer your questions",
      languages: ["English", "Hinglish"],
      color: "from-violet-500 to-purple-600",
      image: geetaImage
    },
    {
      id: "scripture-b",
      title: "Bible chat wisdom",
      description: "Dive into the Bible's narratives and teachings for guidance",
      languages: ["English", "Hinglish"],
      color: "from-cyan-500 to-blue-600",
      image: bibleImage
    },
    {
      id: "scripture-c",
      title: "Quran's chat wisdom",
      description: "Uncover the Quran's insights to address your spiritual inquiries",
      languages: ["English", "Hinglish"],
      color: "from-pink-500 to-rose-600",
      image: quranImage
    },
    {
      id: "scripture-d",
      title: "cosmos big bang chat",
      description: "Answers your question according to the big bang theory",
      languages: ["English", "Hinglish"],
      color: "from-green-500 to-black-600",
      image: bigbangImage
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Starfield Background */}
      <StarField />

      {/* Nebula Background Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 nebula-glow"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 nebula-glow" style={{ animationDelay: '3s' }}></div>

      {/* Main Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="relative h-screen flex items-center justify-center px-4">
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url(${cosmicHero})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-violet-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              CosmosSutra
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Chat respectfully with scripture-grounded assistants across traditions—cited, multilingual, and galaxy-themed.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <StarButton
                className="text-lg px-8 py-4"
                onClick={scrollToSection}
              >
                <MessageCircle className="w-5 h-5 mr-2 inline" />
                Start Exploring
              </StarButton>
              <StarButton onClick={scrollToSection} variant="secondary" className="text-lg px-8 py-4 bg-transparent border border-primary text-primary hover:bg-primary hover:text-background">
                <Book className="w-5 h-5 mr-2 inline" />
                Browse Wisdom
              </StarButton>
            </div>
          </div>
        </section>
        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
              Sacred Knowledge, Cosmic Interface
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <GlowCard>
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-4">Respectful & Neutral</h3>
                <p className="text-muted-foreground">
                  Explore teachings across traditions with respect, neutrality, and no proselytizing. Multiple perspectives when relevant.
                </p>
              </GlowCard>

              <GlowCard>
                <Book className="w-12 h-12 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-4">Citations First</h3>
                <p className="text-muted-foreground">
                  Every answer backed by precise citations to verse, book, and translation source. Grounded in authentic texts.
                </p>
              </GlowCard>

              <GlowCard>
                <Globe className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-4">Multilingual Wisdom</h3>
                <p className="text-muted-foreground">
                  Access sacred texts in multiple languages with proper translation attribution and cultural context.
                </p>
              </GlowCard>
            </div>
          </div>
        </section>

        {/* Bot Catalog Preview */}
        <section ref={sectionRef} className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
              Wisdom Guides
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {bots.map((bot) => (
                <GlowCard key={bot.id} className="group cursor-pointer">
                  <img
                    src={bot.image}
                    alt={bot.title}
                    className="w-full h-32 object-cover rounded-lg mb-4 opacity-80 group-hover:opacity-100 transition-opacity"
                  />

                  <h3 className="text-xl font-semibold mb-2">{bot.title}</h3>
                  <p className="text-muted-foreground mb-4">{bot.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {bot.languages.map((lang) => (
                      <span key={lang} className="px-2 py-1 text-xs bg-primary/20 text-primary rounded-full">
                        {lang}
                      </span>
                    ))}
                  </div>
                  <StarButton
                    className="w-full"
                    onClick={() => navigate(`/chat/${bot.id}`)}
                  >
                    Begin Conversation
                  </StarButton>
                </GlowCard>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 border-t border-border/30">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-muted-foreground mb-4">
              This tool offers respectful exploration of sacred texts, providing spiritual insights that can inspire a happier, more meaningful, and successful life
            </p>
            <p className="text-sm text-muted-foreground">
              Inspired by India's spiritual heritage, built to guide your journey with wisdom and respect.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
