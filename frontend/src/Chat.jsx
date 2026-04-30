import { useState, useRef, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Chat.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function Chat({ persona }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // Load chat when persona changes
  useEffect(() => {
    const saved = localStorage.getItem(`chat_${persona.id}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const withDates = parsed.map(m => ({ ...m, time: m.time ? new Date(m.time) : new Date() }));
        setMessages(withDates);
      } catch (e) {
        setMessages([]);
      }
    } else {
      setMessages([]);
    }
    setError(null);
    setIsTyping(false);
    setInput('');
  }, [persona.id]);

  // Save chat to localStorage whenever it changes
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem(`chat_${persona.id}`, JSON.stringify(messages));
    }
  }, [messages, persona.id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
    }
  }, [input]);

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    setError(null);
    const userMsg = { role: 'user', content: trimmed, time: new Date() };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setInput('');
    setIsTyping(true);

    // Build history for API (omit time field)
    const history = nextMessages.map(({ role, content }) => ({ role, content }));

    try {
      const { data } = await axios.post(`${API_BASE}/api/chat`, {
        persona: persona.id,
        messages: history,
      });
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: data.reply, time: new Date() },
      ]);
    } catch (err) {
      const msg =
        err?.response?.data?.error ||
        'Unable to reach the AI service. Please check your connection and try again.';
      setError(msg);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping, persona.id]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const isEmpty = messages.length === 0;

  return (
    <div className="chat-container">
      {/* Empty state / Hero */}
      {isEmpty && !isTyping && (
        <div className="chat-hero">
          <div className="hero-avatar-wrap">
            <div
              className="hero-avatar"
              style={{ background: persona.gradient }}
            >
              {persona.avatar}
            </div>
            <div
              className="hero-avatar-ring"
              style={{ borderColor: persona.color }}
            />
          </div>
          <h1 className="hero-name">{persona.name}</h1>
          <p className="hero-title">{persona.title}</p>
          <p className="hero-description">{persona.description}</p>

          <p className="chips-label">Try asking…</p>
          <div className="chips-grid">
            {persona.chips.map((chip, i) => (
              <button
                key={i}
                className="chip"
                onClick={() => sendMessage(chip)}
                style={{ '--chip-color': persona.color }}
              >
                {chip}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Messages */}
      {!isEmpty && (
        <div className="messages-area" id="messages-area">
          {messages.map((msg, i) => (
            <MessageRow
              key={i}
              msg={msg}
              persona={persona}
              isLast={i === messages.length - 1}
            />
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="typing-row">
              <div
                className="message-avatar"
                style={{ background: persona.gradient }}
              >
                {persona.avatar}
              </div>
              <div className="typing-bubble">
                <span className="typing-dot" style={{ background: persona.color }} />
                <span className="typing-dot" style={{ background: persona.color }} />
                <span className="typing-dot" style={{ background: persona.color }} />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <div className="error-banner" role="alert">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
          <button className="error-close" onClick={() => setError(null)} aria-label="Dismiss error">✕</button>
        </div>
      )}

      {/* Input Area */}
      <div className="input-area">
        <div className="input-wrap">
          <textarea
            ref={textareaRef}
            id="chat-input"
            className="chat-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${persona.name}…`}
            rows={1}
            disabled={isTyping}
            aria-label={`Message ${persona.name}`}
          />
          <button
            id="send-btn"
            className="send-btn"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            aria-label="Send message"
            style={{ background: persona.gradient }}
          >
            ↑
          </button>
        </div>
        <p className="input-hint">Press Enter to send · Shift+Enter for new line</p>
      </div>
    </div>
  );
}

function MessageRow({ msg, persona, isLast }) {
  const isUser = msg.role === 'user';
  return (
    <div className={`message-row ${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <div
          className="message-avatar"
          style={{ background: persona.gradient }}
          aria-hidden="true"
        >
          {persona.avatar}
        </div>
      )}
      {isUser && (
        <div className="message-avatar user-av" aria-hidden="true">
          👤
        </div>
      )}
      <div className="message-content">
        <div className={`message-bubble ${isUser ? 'user-bubble' : 'assistant-bubble'}`}>
          {msg.content}
        </div>
        {msg.time && (
          <span className="message-time">{formatTime(msg.time)}</span>
        )}
      </div>
    </div>
  );
}
