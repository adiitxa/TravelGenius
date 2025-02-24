
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { API_KEY } from "@/utils/travelUtils";

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface TravelChatProps {
  initialContext: string;
}

export const TravelChat = ({ initialContext }: TravelChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: newMessage,
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `Context about the travel plan:\n${initialContext}\n\nUser question: ${newMessage}\n\nProvide a helpful response considering the travel context above. Keep the response concise and relevant to the question.`
              }]
            }]
          })
        }
      );

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.candidates[0].content.parts[0].text,
        };
        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error getting response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8 rounded-xl border bg-gradient-to-b from-white/80 to-white/40 backdrop-blur-md shadow-lg">
      <div className="p-4 border-b bg-white/50 rounded-t-xl">
        <h3 className="text-xl font-semibold text-navy flex items-center gap-2">
          <Bot className="w-5 h-5 text-desert" />
          Travel Assistant Chat
        </h3>
        <p className="text-sm text-gray-600 mt-1">Ask questions about your travel plan</p>
      </div>
      
      <ScrollArea 
        className="h-[400px] p-4 overflow-y-auto" 
        ref={scrollAreaRef}
      >
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 animate-fadeIn ${
                message.role === 'user' ? 'flex-row-reverse' : ''
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.role === 'user' 
                    ? 'bg-desert/10' 
                    : 'bg-navy/10'
                }`}
              >
                {message.role === 'user' ? (
                  <User className="w-4 h-4 text-desert" />
                ) : (
                  <Bot className="w-4 h-4 text-navy" />
                )}
              </div>
              <div
                className={`px-4 py-3 rounded-2xl max-w-[80%] ${
                  message.role === 'user'
                    ? 'bg-desert text-white rounded-tr-none'
                    : 'bg-gray-100 text-gray-800 rounded-tl-none'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-navy/10 flex items-center justify-center">
                <Bot className="w-4 h-4 text-navy" />
              </div>
              <div className="px-4 py-3 rounded-2xl bg-gray-100 text-gray-800 rounded-tl-none">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-navy/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-navy/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-navy/40 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-white/50 rounded-b-xl">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 resize-none bg-white/80 backdrop-blur-sm focus-visible:ring-desert"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={isLoading || !newMessage.trim()}
            className="self-end bg-desert hover:bg-desert/90 text-white"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2">Press Enter to send, Shift + Enter for new line</p>
      </div>
    </div>
  );
};
