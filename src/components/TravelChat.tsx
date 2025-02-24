
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
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
    <div className="mt-8 border rounded-lg p-4 bg-white/50 backdrop-blur-sm">
      <h3 className="text-xl font-semibold mb-4">💬 Ask More About Your Trip</h3>
      
      <ScrollArea className="h-[300px] mb-4 rounded-md border p-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 p-3 rounded-lg max-w-[80%] ${
              message.role === 'user'
                ? 'ml-auto bg-desert/10 text-navy'
                : 'bg-white text-gray-800'
            }`}
          >
            {message.content}
          </div>
        ))}
        {isLoading && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="animate-pulse">Thinking...</div>
          </div>
        )}
      </ScrollArea>

      <div className="flex gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Ask a question about your travel plan..."
          className="flex-1"
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
          className="self-end"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
