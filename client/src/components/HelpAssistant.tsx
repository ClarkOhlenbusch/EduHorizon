import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, ChevronDown, ChevronUp } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Help responses based on keywords
const getHelpResponse = (query: string): string => {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('deadline') || queryLower.includes('due date') || queryLower.includes('when is')) {
    return "Your upcoming deadlines:\n- UI Design Project: April 20, 2025\n- Data Structures Quiz: April 22, 2025";
  }
  
  if (queryLower.includes('grade') || queryLower.includes('score') || queryLower.includes('marks')) {
    return "Your current grades:\n- UI Design: 92%\n- Data Structures: 87%\n- Machine Learning: 90%\nOverall GPA: 3.8";
  }
  
  if (queryLower.includes('class') || queryLower.includes('course') || queryLower.includes('lecture')) {
    return "Your upcoming classes:\n- UI Design: Today at 2:00 PM (Room 101)\n- Data Structures: Tomorrow at 10:00 AM (Room 203)";
  }
  
  if (queryLower.includes('assignment') || queryLower.includes('homework') || queryLower.includes('project')) {
    return "Your upcoming assignments:\n- Project Proposal: Due on April 20\n- Wireframe Assignment: Due on April 25";
  }
  
  if (queryLower.includes('help') || queryLower.includes('assist') || queryLower.includes('support')) {
    return "I can help you with:\n- Course information\n- Assignment deadlines\n- Grade tracking\n- Schedule management\nJust let me know what you need!";
  }
  
  return "I understand you're asking about \"" + query + "\". Could you be more specific about what kind of information you're looking for?";
};

const HelpAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isChatExpanded, setIsChatExpanded] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi there! I\'m your EDU Horizon help assistant. How can I help you with your classes today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

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
    
    // Simulate a small delay for realism
    setTimeout(() => {
      const responseContent = getHelpResponse(userMessage.content);
      
      const assistantMessage: Message = {
        id: generateUniqueId(),
        role: 'assistant',
        content: responseContent,
        timestamp: new Date()
      };
      
      setMessages(prevMessages => [...prevMessages, assistantMessage]);
      setIsLoading(false);
    }, 600);
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
              <h3 className="font-medium">EDU Horizon Help</h3>
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
                      style={{ whiteSpace: 'pre-line' }}
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
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default HelpAssistant;