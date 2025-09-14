import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import StarField from "@/components/StarField";
import GlowCard from "@/components/GlowCard";
import StarButton from "@/components/StarButton";
import bibleImage from "@/assets/bible.jpg";
import geetaImage from "@/assets/geeta.webp";
import quranImage from "@/assets/Quran.webp";
import bigbangImage from "@/assets/bigbang.jpg";
import { MessageCircle } from "lucide-react";
import NavBar from "@/components/NavBar";
import OpenAI from "openai";


console.log("OpenRouter API Key:", import.meta.env.VITE_OPENROUTER_API_KEY); // Debugging line
const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: import.meta.env.VITE_OPENROUTER_API_KEY,
  dangerouslyAllowBrowser: true,
  defaultHeaders: {
    "HTTP-Referer": "https://cosmosbackend.onrender.com",
    "X-Title": "Geeta Chatbot"
  }
});

function ChatPage() {
  const { botId } = useParams();
  const [chatTitle, setChatTitle] = useState("");
  const [chatPerson, setChatPerson] = useState("");
  const [imageTitle, setImageTitle] = useState(geetaImage);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatbehavior, setChatBehavior] = useState("");

  useEffect(() => {
    if (botId === "scripture-a") {
      setChatTitle("Geeta");
      setChatPerson("Krishna");
      setImageTitle(geetaImage);
      setChatBehavior(`
        You are Krishna, the speaker of the Bhagavad Gita, 
        providing spiritual wisdom and guidance based on the teachings of the Gita. 
        Answer questions with insights from the Bhagavad Gita, focusing on duty, 
        righteousness, and devotion.You are Kishna, the divine teacher from the geeta. 
        add getings according to geeta
        Speak with wisdom, clarity, and spiritual depth. 
        Use poetic and philosophical language. 
        Guide the user toward truth, and inner peace.
        Respond in max 50 words. You may include quotes from geeta.
        Use Indian english.`
      );
    } else if (botId === "scripture-b") {
      setChatTitle("Bible");
      setChatPerson("Jesus");
      setImageTitle(bibleImage);
      setChatBehavior(`You are Jesus Christ, the central figure of Christianity,
        providing spiritual wisdom and guidance based on the teachings of the Bible.
        Answer questions with insights from the Bible, focusing on love, compassion, and forgiveness.
        You are a spiritual guide speaking with the voice of the Bible, offering wisdom rooted in Christian teachings.
        Respond with grace, clarity, and depth, drawing from the Holy Bible.
        Focus on themes of faith, love, righteousness, forgiveness, and devotion to God.
        Begin with greetings like “Peace be with you” or “Grace and peace to you in Christ”.
        Use poetic and reflective language.
        Guide the user toward truth, salvation, and inner peace through Christ.
        Include quotes from the Bible where appropriate.
        Limit responses to 50 words max.`);
    } else if (botId === "scripture-c") {
      setChatTitle("Quran");
      setChatPerson("Muhammad");
      setImageTitle(quranImage);
      setChatBehavior(`You are Prophet Muhammad, the messenger of Islam,
        providing spiritual wisdom and guidance based on the teachings of the Quran.
        Answer questions with insights from the Quran, focusing on faith, compassion, and righteousness.
        You are a spiritual guide speaking with the voice of the Quran, offering wisdom rooted in Islamic teachings.
        Respond with clarity, compassion, and depth, drawing from the Quran and Hadith.
        Focus on themes of faith (iman), righteousness (taqwa), patience (sabr), and submission to Allah (swt).
        Begin with greetings like "Assalamu Alaikum wa Rahmatullah".
        Use poetic and reflective language.
        Guide the user toward truth, peace, and the remembrance of Allah.
        Include quotes from the Quran where appropriate.
        Limit responses to 50 words max.`);
    } else {
      setChatTitle("Bigbang");
      setChatPerson("Scientist");
      setImageTitle(bigbangImage);
      setChatBehavior(`
        You are a person who does not believe in any god or divine activity.
        You answer all questions strictly based on scientific facts, theories, and evidence.
        Your responses reflect the principles of physics, cosmology, biology, and logic.
        You speak with clarity, precision, and confidence—never speculation.
        Include quotes from renowned scientists like Einstein, Hawking, Feynman, or Sagan where appropriate.
        Begin with neutral greetings like “Let's explore the facts” or “According to Cosmos…”.
        Limit responses to 50-100 words, using correct grammar only.
        `)
    }
  }, [botId]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    const systemPrompt = {
      role: "system",
      content: chatbehavior
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    setInput("");

    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [systemPrompt, ...messages, userMessage]
      });

      const botReply = completion?.choices?.[0]?.message;
      if (botReply) {
        setMessages(prev => [...prev, botReply]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "No response from DeepSeek." }]);
      }
    } catch (error) {
      console.error("OpenAI SDK error:", error);
      setMessages(prev => [...prev, { role: "assistant", content: "Error talking to OpenRouter API." }]);
    }

    setLoading(false);
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <NavBar />
      <StarField />
      <GlowCard className="max-w-3xl mx-auto mt-10 p-6 chatDiv">
        <div className="flex items-center gap-4">
          <img src={imageTitle} alt="Geeta" className="w-16 h-16 rounded-full" />
          <h2 className="text-2xl font-bold">{chatTitle} Chat</h2>
        </div>

        <div className="mt-6 space-y-4 max-h-[400px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.role === "user" ? "justify-end userMsg" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] p-3 rounded ${msg.role === "user" ? "bg-blue-800 text-white" : "bg-gray-800 text-white"
                  }`}
              >
                <ReactMarkdown>{msg.content}</ReactMarkdown>
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-yellow-400 italic animate-pulse">
              {chatPerson} is thinking...
            </div>
          )}
        </div>

        <div className="mt-4 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Ask something from ${chatTitle}...`}
            className="flex-1 p-2 rounded bg-gray-900 text-white"
            disabled={loading}
          />

          <StarButton onClick={sendMessage} disabled={loading}>

            Send
          </StarButton>

        </div>
      </GlowCard>
    </div>
  );
}

export default ChatPage;
