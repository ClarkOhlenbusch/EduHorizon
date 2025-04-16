import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { getGeminiResponse, getFallbackResponse } from '@/lib/gemini';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

/**
 * Interactive chat assistant component that provides AI-powered responses
 * to help students with course-related questions and information.
 */
const AIChatAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! I\'m your course assistant. How can I help you with your classes today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const generateUniqueId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: Message = {
      id: generateUniqueId(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      let responseContent = '';
      
      if (!apiKey) {
        toast({
          title: "API Configuration",
          description: "Using alternate response engine for assistant functionality.",
          variant: "default"
        });
        
        responseContent = getFallbackResponse(userMessage.content);
      } else {
        try {
          responseContent = await getGeminiResponse(userMessage.content);
        } catch (apiError) {
          console.error('API error:', apiError);
          responseContent = getFallbackResponse(userMessage.content);
          
          toast({
            title: "Service Notice",
            description: "Using backup knowledge engine due to connection issues.",
            variant: "default"
          });
        }
      }
      
      const assistantMessage: Message = {
        id: generateUniqueId(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Assistant processing error:', error);
      
      const errorMessage: Message = {
        id: generateUniqueId(),
        role: 'assistant',
        content: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat button */}
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 rounded-full w-12 h-12 shadow-lg flex items-center justify-center"
      >
        <MessageCircle size={24} />
      </Button>
      
      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-80 md:w-96 bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-neutral-200 z-50">
          {/* Chat header */}
          <div className="bg-primary text-white p-3 flex justify-between items-center">
            <div className="flex items-center">
              <MessageCircle size={18} className="mr-2" />
              <h3 className="font-medium">Course Assistant</h3>
            </div>
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-primary-dark"
                onClick={() => setIsChatExpanded(!isChatExpanded)}
              >
                {isChatExpanded ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-white hover:bg-primary-dark"
                onClick={() => setIsOpen(false)}
              >
                <X size={16} />
              </Button>
            </div>
          </div>
          
          {isChatExpanded && (
            <>
              {/* Chat messages */}
              <div 
                ref={chatContainerRef}
                className="flex-1 overflow-y-auto p-3 max-h-96 bg-neutral-50"
                style={{ minHeight: "300px" }}
              >
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`mb-3 ${message.role === 'user' ? 'ml-8' : 'mr-8'}`}
                  >
                    <div 
                      className={`p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-primary text-white ml-auto' 
                          : 'bg-white border border-neutral-200'
                      }`}
                    >
                      {message.content}
                    </div>
                    <div 
                      className={`text-xs text-neutral-500 mt-1 ${
                        message.role === 'user' ? 'text-right' : 'text-left'
                      }`}
                    >
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex items-center space-x-2 mb-3 mr-8">
                    <div className="bg-white border border-neutral-200 p-3 rounded-lg flex items-center">
                      <span className="animate-pulse flex space-x-1">
                        <span className="h-2 w-2 bg-neutral-400 rounded-full"></span>
                        <span className="h-2 w-2 bg-neutral-400 rounded-full"></span>
                        <span className="h-2 w-2 bg-neutral-400 rounded-full"></span>
                      </span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Chat input */}
              <div className="p-3 border-t border-neutral-200">
                <div className="flex items-center">
                  <Input
                    placeholder="Type your message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="flex-1 mr-2"
                    disabled={isLoading}
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                  >
                    <Send size={16} />
                  </Button>
                </div>
                <div className="text-xs text-neutral-500 mt-1 text-center">
                  Advanced Learning Assistant
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AIChatAssistant;