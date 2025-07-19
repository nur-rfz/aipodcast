import { BookmarkIcon, MicIcon, SearchIcon, SendIcon, HomeIcon } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Search } from "../Search";
import { Library } from "../Library";
import { Home } from "../Home";
import { PodcastPlayer } from "../PodcastPlayer";

export const Frame = (): JSX.Element => {
  const [currentScreen, setCurrentScreen] = useState("generate");
  const [inputMessage, setInputMessage] = useState("");
  const [selectedPodcast, setSelectedPodcast] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      content: "Hi! I'm your AI podcast assistant. Tell me what topic you'd like to create a podcast about, and I'll help you generate engaging content.",
      timestamp: new Date(),
      options: []
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleNavigate = (screen: string, podcastData?: any) => {
    setCurrentScreen(screen);
    if (podcastData) {
      setSelectedPodcast(podcastData);
    }
  };

  // Show Home screen if selected
  if (currentScreen === "home") {
    return <Home onNavigate={handleNavigate} />;
  }

  // Show Search screen if selected
  if (currentScreen === "search") {
    return <Search onNavigate={handleNavigate} />;
  }

  // Show Library screen if selected
  if (currentScreen === "library") {
    return <Library onNavigate={handleNavigate} />;
  }

  // Show Podcast Player screen if selected
  if (currentScreen === "player") {
    return <PodcastPlayer onNavigate={handleNavigate} podcastData={selectedPodcast} />;
  }

  // Navigation items data
  const navItems = [
    {
      icon: <HomeIcon className="w-5 h-5" />,
      label: "Home",
      active: false,
      screen: "home",
    },
    {
      icon: <MicIcon className="w-3.5 h-5" />,
      label: "Generate",
      active: currentScreen === "generate",
      screen: "generate",
    },
    {
      icon: <SearchIcon className="w-5 h-5" />,
      label: "Search",
      active: currentScreen === "search",
      screen: "search",
    },
    {
      icon: <BookmarkIcon className="w-[15px] h-5" />,
      label: "Library",
      active: currentScreen === "library",
      screen: "library",
    },
  ];

  // AI response templates based on user input
  const getAIResponse = (userMessage: string) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("sustainable") || lowerMessage.includes("environment") || lowerMessage.includes("green")) {
      return {
        content: "Great topic! Sustainable living is very popular right now. I can help you create engaging content about eco-friendly practices. Would you like me to:",
        options: [
          "📝 Generate episode outline",
          "🎙 Create full script",
          "💡 Suggest episode topics",
          "🎯 Define target audience"
        ]
      };
    } else if (lowerMessage.includes("tech") || lowerMessage.includes("technology") || lowerMessage.includes("ai")) {
      return {
        content: "Excellent choice! Technology podcasts have a huge audience. I can help you create content that's both informative and accessible. What would you like to focus on:",
        options: [
          "🤖 AI and Machine Learning",
          "📱 Consumer Technology",
          "💻 Programming and Development",
          "🚀 Startup and Innovation"
        ]
      };
    } else if (lowerMessage.includes("business") || lowerMessage.includes("entrepreneur") || lowerMessage.includes("startup")) {
      return {
        content: "Business podcasts are incredibly valuable for listeners! I can help you create content that provides real value to entrepreneurs and professionals. Let's start with:",
        options: [
          "💼 Leadership and Management",
          "📈 Marketing and Sales",
          "💰 Finance and Investment",
          "🎯 Strategy and Growth"
        ]
      };
    } else if (lowerMessage.includes("health") || lowerMessage.includes("fitness") || lowerMessage.includes("wellness")) {
      return {
        content: "Health and wellness is such an important topic! I can help you create content that genuinely helps people improve their lives. What aspect interests you most:",
        options: [
          "🏃‍♂️ Fitness and Exercise",
          "🥗 Nutrition and Diet",
          "🧘‍♀️ Mental Health and Mindfulness",
          "😴 Sleep and Recovery"
        ]
      };
    } else {
      return {
        content: `Interesting topic! "${userMessage}" could make for a compelling podcast. Let me help you develop this idea further. What format are you thinking:`,
        options: [
          "🎤 Interview-style podcast",
          "📚 Educational/Tutorial format",
          "💬 Conversational discussion",
          "📖 Storytelling approach"
        ]
      };
    }
  };

  const handleOptionClick = (option: string) => {
    // Add user's option selection as a message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: option,
      timestamp: new Date(),
      options: []
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      let aiResponse;
      
      if (option.includes("Generate episode outline")) {
        aiResponse = {
          id: messages.length + 2,
          sender: "ai",
          content: "Perfect! I'll create a detailed episode outline for you. Here's what I'll include: introduction hook, main talking points, guest interview questions (if applicable), and a strong conclusion. What's your target episode length?",
          timestamp: new Date(),
          options: [
            "⏱️ 15-20 minutes (short format)",
            "⏱️ 30-45 minutes (standard)",
            "⏱️ 60+ minutes (long form)"
          ]
        };
      } else if (option.includes("Create full script")) {
        aiResponse = {
          id: messages.length + 2,
          sender: "ai",
          content: "Excellent! I'll write a complete script with natural transitions, engaging hooks, and clear call-to-actions. Should I include specific sections like sponsor mentions or audience interaction prompts?",
          timestamp: new Date(),
          options: [
            "📢 Include sponsor segments",
            "🎯 Add audience engagement",
            "📝 Just core content",
            "🎵 Include music cues"
          ]
        };
      } else if (option.includes("Suggest episode topics")) {
        aiResponse = {
          id: messages.length + 2,
          sender: "ai",
          content: "Great idea! I'll suggest 10 episode topics that will keep your audience engaged and coming back for more. How many episodes are you planning for your first season?",
          timestamp: new Date(),
          options: [
            "📅 5-8 episodes (mini season)",
            "📅 10-12 episodes (standard)",
            "📅 15+ episodes (full season)",
            "🔄 Ongoing series"
          ]
        };
      } else {
        aiResponse = {
          id: messages.length + 2,
          sender: "ai",
          content: "That's a great choice! I'll help you develop this further. Let me gather a bit more information to create the best content for you. What's your experience level with podcasting?",
          timestamp: new Date(),
          options: [
            "🆕 Complete beginner",
            "📈 Some experience",
            "🎙️ Experienced podcaster",
            "💼 Professional creator"
          ]
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5 seconds
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      // Add user message
      const userMessage = {
        id: messages.length + 1,
        sender: "user",
        content: inputMessage.trim(),
        timestamp: new Date(),
        options: []
      };
      
      setMessages(prev => [...prev, userMessage]);
      setInputMessage("");
      setIsTyping(true);
      
      // Simulate AI response delay
      setTimeout(() => {
        const aiResponse = getAIResponse(inputMessage.trim());
        const aiMessage = {
          id: messages.length + 2,
          sender: "ai",
          content: aiResponse.content,
          timestamp: new Date(),
          options: aiResponse.options
        };
        
        setMessages(prev => [...prev, aiMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1500); // Random delay between 1-2.5 seconds
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
        {/* Mobile Container */}
        <div className="flex flex-col h-[844px] relative">
          {/* Header */}
          <header className="flex items-center justify-between px-4 py-4 border-b border-gray-200 bg-white">
            <h1 className="text-xl font-semibold text-gray-800">PodcastAI</h1>
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-gray-300 text-gray-600">
                U
              </AvatarFallback>
            </Avatar>
          </header>

          {/* Chat Area - Scrollable */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Dynamic Messages */}
            {messages.map((message, index) => (
              <div key={message.id} className={`flex gap-3 ${message.sender === "user" ? "justify-end" : ""}`}>
                {message.sender === "ai" && (
                  <Avatar className="w-8 h-8 bg-gray-600 flex-shrink-0">
                    <AvatarFallback className="text-white text-xs">
                      AI
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <Card className={`rounded-2xl p-3 max-w-[280px] ${
                  message.sender === "ai" 
                    ? "bg-gray-100 rounded-tl-md" 
                    : "bg-black rounded-tr-md"
                }`}>
                  <div className={`text-sm leading-relaxed ${
                    message.sender === "ai" ? "text-gray-800" : "text-white"
                  }`}>
                    {message.content}
                  </div>
                  
                  {/* Options for AI messages */}
                  {message.sender === "ai" && message.options.length > 0 && (
                    <div className="space-y-2 mt-3">
                      {message.options.map((option, optionIndex) => (
                        <Button
                          key={optionIndex}
                          onClick={() => handleOptionClick(option)}
                          variant="outline"
                          className="w-full justify-start h-auto py-2 px-3 text-xs font-normal text-gray-800 bg-white hover:bg-gray-50 border-gray-300 rounded-lg"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  )}
                </Card>
                
                {message.sender === "user" && (
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarFallback className="bg-blue-500 text-white text-xs">
                      U
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 bg-gray-600 flex-shrink-0">
                  <AvatarFallback className="text-white text-xs">
                    AI
                  </AvatarFallback>
                </Avatar>
                <Card className="bg-gray-100 rounded-2xl rounded-tl-md p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Message Input */}
          <div className="p-4 bg-white border-t border-gray-200">
            <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-3">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isTyping}
                className="flex-1 border-0 bg-transparent shadow-none text-sm placeholder:text-gray-500 focus-visible:ring-0"
                placeholder="Type your message..."
              />
              <Button
                onClick={handleSendMessage}
                disabled={isTyping || !inputMessage.trim()}
                size="icon"
                className="w-8 h-8 bg-black hover:bg-gray-800 rounded-full flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <SendIcon className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="bg-white border-t border-gray-200 px-4 py-2">
            <div className="flex justify-around items-center">
              {navItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigate(item.screen)}
                  className="flex flex-col items-center justify-center py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`mb-1 ${item.active ? "text-black" : "text-gray-400"}`}>
                    {item.icon}
                  </div>
                  <span
                    className={`text-xs ${item.active ? "text-black font-medium" : "text-gray-400"}`}
                  >
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};