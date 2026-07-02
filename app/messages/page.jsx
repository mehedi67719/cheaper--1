"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft, Search, MessageCircle, User, Mail, Phone,
  Clock, Check, CheckCheck, Image, Smile, Paperclip,
  Send, MoreVertical, PhoneCall, Video, Info, Star,
  ChevronDown, Loader2, Package, Store, Calendar,
  ChevronRight, AlertCircle
} from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { supabase } from "@/lib/supabase";


const formatTime = (dateString) => {
  if (!dateString) return "Just now";
  const date = new Date(dateString);
  const now = new Date();
  const diff = now - date;
  
  if (diff < 60000) return "Just now";
  if (diff < 3600000) return Math.floor(diff / 60000) + "m ago";
  if (diff < 86400000) return Math.floor(diff / 3600000) + "h ago";
  if (diff < 172800000) return "Yesterday";
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    year: 'numeric'
  });
};

const formatTimeFull = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export default function MessagesPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const messagesEndRef = useRef(null);
  
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);
  const [error, setError] = useState(null);
  
  // Get conversationId from URL
  const conversationIdFromUrl = searchParams.get("conversationId");

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobileView(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowConversationList(true);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Fetch conversations
  useEffect(() => {
    if (!user) return;

    const fetchConversations = async () => {
      setLoading(true);
      setError(null);
      try {
        const userId = user.id || user.userId;
        const response = await fetch(`/api/conversations?userId=${userId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch conversations");
        }
        
        const data = await response.json();
        console.log("Conversations data:", data);
        setConversations(data);
        
        // Check if there's a conversationId in URL
        if (conversationIdFromUrl) {
          const targetConversation = data.find(conv => conv.id === conversationIdFromUrl);
          if (targetConversation) {
            setSelectedConversation(targetConversation);
            if (isMobileView) {
              setShowConversationList(false);
            }
          } else {
            if (data.length > 0) {
              setSelectedConversation(data[0]);
            }
          }
        } else {
          if (data.length > 0 && !selectedConversation) {
            setSelectedConversation(data[0]);
          }
        }
      } catch (err) {
        console.error("Error fetching conversations:", err);
        setError("Failed to load conversations. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, [user, conversationIdFromUrl]);

  // Fetch messages for selected conversation
  useEffect(() => {
    if (!selectedConversation) return;

    const fetchMessages = async () => {
      try {
        const response = await fetch(`/api/messages?conversationId=${selectedConversation.id}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        
        const data = await response.json();
        console.log("Messages data:", data);
        setMessages(data);
        scrollToBottom();
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  // 🔥 SIMPLIFIED SUPABASE REALTIME LISTENER
  useEffect(() => {
    if (!selectedConversation) return;

    console.log("Setting up Realtime listener for conversation:", selectedConversation.id);

    const channel = supabase
      .channel(`conversation-${selectedConversation.id}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "messages",
          filter: `conversation_id=eq.${selectedConversation.id}`,
        },
        (payload) => {
          console.log("New message received via Realtime:", payload.new);
          
          // Check if message already exists (prevent duplicates)
          setMessages((prev) => {
            const exists = prev.some(msg => msg.id === payload.new.id);
            if (exists) return prev;
            return [...prev, payload.new];
          });
          
          scrollToBottom();

          // Update last message in conversation list
          setConversations(prevConversations => 
            prevConversations.map(conv => 
              conv.id === selectedConversation.id 
                ? { 
                    ...conv, 
                    last_message: payload.new.message, 
                    last_message_time: payload.new.created_at 
                  }
                : conv
            )
          );
        }
      )
      .subscribe((status) => {
        console.log("Realtime subscription status:", status);
      });

    // Cleanup
    return () => {
      console.log("Removing Realtime listener");
      supabase.removeChannel(channel);
    };
  }, [selectedConversation]);

  // 🔥 REALTIME LISTENER FOR NEW CONVERSATIONS
  useEffect(() => {
    if (!user) return;

    const userId = user.id || user.userId;

    console.log("Setting up Realtime listener for new conversations");

    const channel = supabase
      .channel("new-conversations")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "conversations",
          filter: `buyer_id=eq.${userId}`,
        },
        (payload) => {
          console.log("New conversation received via Realtime:", payload.new);
          
          // Fetch the full conversation details
          const fetchNewConversation = async () => {
            try {
              const response = await fetch(`/api/conversations?userId=${userId}`);
              if (response.ok) {
                const data = await response.json();
                setConversations(data);
              }
            } catch (err) {
              console.error("Error fetching new conversation:", err);
            }
          };
          
          fetchNewConversation();
        }
      )
      .subscribe((status) => {
        console.log("Conversations Realtime subscription status:", status);
      });

    // Cleanup
    return () => {
      console.log("Removing conversations Realtime listener");
      supabase.removeChannel(channel);
    };
  }, [user]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    if (isMobileView) {
      setShowConversationList(false);
    }
    // Update URL with selected conversation ID
    router.push(`/messages?conversationId=${conversation.id}`);
  };

  const handleBackToList = () => {
    setShowConversationList(true);
    setSelectedConversation(null);
    // Remove conversationId from URL
    router.push("/messages");
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation || !user) return;

    setSendingMessage(true);
    
    try {
      const senderId = user.id || user.userId;
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id: selectedConversation.id,
          sender_id: senderId,
          message: newMessage.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      const newMsg = await response.json();
      
      // Add the new message to the messages list
      setMessages(prevMessages => [...prevMessages, newMsg]);
      setNewMessage("");
      scrollToBottom();

      // Update last message in conversation list
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === selectedConversation.id 
            ? { ...conv, last_message: newMsg.message, last_message_time: newMsg.created_at }
            : conv
        )
      );

    } catch (err) {
      console.error("Error sending message:", err);
      alert(`Failed to send message: ${err.message}`);
    } finally {
      setSendingMessage(false);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const sellerName = conv.seller_name || conv.other_party_name || conv.seller?.name || conv.seller_id || "";
    const buyerName = conv.buyer_name || conv.buyer?.name || conv.buyer_id || "";
    const productName = conv.product?.name || conv.product_id || "";
    const search = searchQuery.toLowerCase();
    
    return sellerName.toLowerCase().includes(search) ||
      buyerName.toLowerCase().includes(search) ||
      productName.toLowerCase().includes(search);
  });

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center">
        <Loader2 size={24} className="animate-spin text-[#ccc]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl border border-[#e2ddd6] max-w-md">
          <MessageCircle size={48} className="mx-auto text-[#ccc] mb-4" />
          <h2 className="text-xl font-bold text-[#111] mb-2">Sign in to view messages</h2>
          <p className="text-sm text-[#888] mb-6">You need to be logged in to see your conversations.</p>
          <Link href="/login" className="bg-[#111] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors inline-block">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f5f3ef] flex items-center justify-center p-4">
        <div className="text-center bg-white p-8 rounded-2xl border border-[#e2ddd6] max-w-md">
          <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-xl font-bold text-[#111] mb-2">Something went wrong</h2>
          <p className="text-sm text-[#888] mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-[#111] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f3ef] flex flex-col" style={{ fontFamily: "var(--font-inter), sans-serif" }}>
      
      {/* Header */}
      <header className="bg-white border-b border-[#e2ddd6] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 md:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-[#888] hover:text-[#111] transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="font-bold text-lg text-[#111]" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
                Messages
              </h1>
              {!isMobileView && conversations.length > 0 && (
                <p className="text-xs text-[#888]">{conversations.length} conversations</p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md bg-[#111] flex items-center justify-center">
                <span className="text-white font-bold text-xs" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>C</span>
              </div>
              <span className="font-bold text-sm hidden sm:block" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>Cheaper</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-6xl mx-auto w-full px-0 md:px-4 py-0 md:py-4 h-[calc(100vh-56px)]">
        <div className="bg-white border border-[#e2ddd6] rounded-none md:rounded-2xl h-full flex overflow-hidden">
          
          {/* Conversation List */}
          {(showConversationList || !isMobileView) && (
            <div className={`${isMobileView ? 'w-full' : 'w-1/3'} border-r border-[#e2ddd6] flex flex-col bg-white`}>
              {/* Search */}
              <div className="p-4 border-b border-[#e2ddd6]">
                <div className="relative">
                  <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#aaa]" />
                  <input
                    type="text"
                    placeholder="Search conversations..."
                    className="w-full pl-9 pr-3 py-2 border border-[#e2ddd6] rounded-lg text-sm placeholder:text-[#aaa] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/20 transition-all bg-[#f9f8f6]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Conversation List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-64 text-center p-4">
                    <MessageCircle size={40} className="text-[#ddd] mb-3" />
                    <p className="text-sm font-medium text-[#111]">
                      {searchQuery ? "No conversations found" : "No conversations yet"}
                    </p>
                    <p className="text-xs text-[#888] mt-1">
                      {searchQuery ? "Try a different search" : "Start a conversation by contacting a seller"}
                    </p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => {
                    // Get the other party's name (the person you're chatting with)
                    const otherPartyName = conv.seller_name || 
                                          conv.other_party_name || 
                                          conv.seller?.name || 
                                          conv.buyer?.name || 
                                          "Unknown User";
                    
                    // Get the first letter for avatar
                    const avatarLetter = otherPartyName ? otherPartyName[0] : "U";
                    
                    return (
                      <div
                        key={conv.id}
                        onClick={() => handleSelectConversation(conv)}
                        className={`flex items-start gap-3 p-4 cursor-pointer transition-all hover:bg-[#f9f8f6] border-b border-[#f0ede8] ${
                          selectedConversation?.id === conv.id ? 'bg-[#f5f3ef]' : ''
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full bg-[#111] flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">
                            {avatarLetter}
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="text-sm font-semibold text-[#111] truncate">
                                {otherPartyName}
                              </p>
                              <p className="text-xs text-[#888] truncate">
                                {conv.product?.name || "Product"}
                              </p>
                            </div>
                            <div className="flex flex-col items-end flex-shrink-0">
                              <span className="text-[10px] text-[#aaa]">
                                {formatTime(conv.last_message_time || conv.created_at)}
                              </span>
                              {conv.unread_count > 0 && (
                                <span className="mt-1 w-5 h-5 bg-[#4648d4] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                                  {conv.unread_count}
                                </span>
                              )}
                            </div>
                          </div>
                          <p className="text-xs text-[#888] truncate mt-0.5">
                            {conv.last_message || "No messages yet"}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-emerald-600 font-medium">Active</span>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* Message Area */}
          {(!isMobileView || !showConversationList) && (
            <div className={`${isMobileView ? 'w-full' : 'w-2/3'} flex flex-col bg-white`}>
              {selectedConversation ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-[#e2ddd6] flex items-center justify-between bg-white">
                    <div className="flex items-center gap-3">
                      {isMobileView && (
                        <button onClick={handleBackToList} className="text-[#888] hover:text-[#111]">
                          <ArrowLeft size={18} />
                        </button>
                      )}
                      <div className="w-9 h-9 rounded-full bg-[#111] flex items-center justify-center">
                        <span className="text-white text-sm font-bold">
                          {selectedConversation.seller_name ? 
                            selectedConversation.seller_name[0] : 
                            selectedConversation.other_party_name ? 
                            selectedConversation.other_party_name[0] : "U"}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-[#111]">
                          {selectedConversation.seller_name || 
                           selectedConversation.other_party_name || 
                           "Unknown User"}
                        </p>
                        <p className="text-xs text-[#888] flex items-center gap-1">
                          <span>Online</span>
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 hover:bg-[#f5f3ef] rounded-lg transition-colors">
                        <PhoneCall size={16} className="text-[#888]" />
                      </button>
                      <button className="p-2 hover:bg-[#f5f3ef] rounded-lg transition-colors">
                        <Video size={16} className="text-[#888]" />
                      </button>
                      <button className="p-2 hover:bg-[#f5f3ef] rounded-lg transition-colors">
                        <MoreVertical size={16} className="text-[#888]" />
                      </button>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-[#faf9f7] space-y-3">
                    {/* Product Info Card */}
                    {selectedConversation.product_id && (
                      <div className="bg-white border border-[#e2ddd6] rounded-xl p-3 mb-4 flex items-center gap-3">
                        <div className="w-12 h-12 bg-[#f5f3ef] rounded-lg flex items-center justify-center">
                          <Package size={20} className="text-[#ccc]" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#111]">
                            {selectedConversation.product?.name || "Product"}
                          </p>
                          <p className="text-xs text-[#888]">
                            ${selectedConversation.product?.price || "0.00"}
                          </p>
                        </div>
                        <Link 
                          href={`/products/${selectedConversation.product_id}`}
                          className="text-xs font-medium text-[#4648d4] hover:underline"
                        >
                          View Product
                        </Link>
                      </div>
                    )}

                    {messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-48 text-center">
                        <MessageCircle size={32} className="text-[#ddd] mb-3" />
                        <p className="text-sm text-[#888]">No messages yet</p>
                        <p className="text-xs text-[#aaa]">Start the conversation!</p>
                      </div>
                    ) : (
                      <>
                        {/* Date Divider */}
                        <div className="flex justify-center mb-4">
                          <span className="text-[10px] text-[#aaa] bg-white px-3 py-1 rounded-full border border-[#e2ddd6]">
                            {formatDate(messages[0]?.created_at)}
                          </span>
                        </div>

                        {messages.map((msg) => {
                          const isOwn = msg.sender_id === (user?.id || user?.userId);
                          
                          return (
                            <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-[75%] ${isOwn ? 'items-end' : 'items-start'} flex flex-col`}>
                                <div className={`px-4 py-2.5 rounded-2xl ${
                                  isOwn 
                                    ? 'bg-[#4648d4] text-white' 
                                    : 'bg-white border border-[#e2ddd6] text-[#111]'
                                }`}>
                                  <p className="text-sm leading-relaxed">{msg.message}</p>
                                </div>
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-[10px] text-[#aaa]">{formatTimeFull(msg.created_at)}</span>
                                  {isOwn && (
                                    msg.is_read ? (
                                      <CheckCheck size={12} className="text-[#4648d4]" />
                                    ) : (
                                      <Check size={12} className="text-[#aaa]" />
                                    )
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        <div ref={messagesEndRef} />
                      </>
                    )}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-[#e2ddd6] bg-white">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                      <button type="button" className="p-2 hover:bg-[#f5f3ef] rounded-lg transition-colors">
                        <Paperclip size={18} className="text-[#888]" />
                      </button>
                      <button type="button" className="p-2 hover:bg-[#f5f3ef] rounded-lg transition-colors">
                        <Image size={18} className="text-[#888]" />
                      </button>
                      <input
                        type="text"
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-[#e2ddd6] rounded-xl text-sm placeholder:text-[#aaa] focus:outline-none focus:ring-2 focus:ring-[#4648d4]/20 transition-all bg-[#f9f8f6]"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        disabled={sendingMessage}
                      />
                      <button
                        type="button"
                        className="p-2 hover:bg-[#f5f3ef] rounded-lg transition-colors"
                      >
                        <Smile size={18} className="text-[#888]" />
                      </button>
                      <button
                        type="submit"
                        disabled={!newMessage.trim() || sendingMessage}
                        className="p-2.5 bg-[#111] text-white rounded-xl hover:bg-[#333] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sendingMessage ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Send size={18} />
                        )}
                      </button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-[#faf9f7]">
                  <div className="w-20 h-20 rounded-full bg-[#f5f3ef] flex items-center justify-center mb-4">
                    <MessageCircle size={32} className="text-[#ccc]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#111] mb-2" style={{ fontFamily: "var(--font-hanken), sans-serif" }}>
                    Your Messages
                  </h3>
                  <p className="text-sm text-[#888] max-w-sm mb-6">
                    {conversations.length > 0 
                      ? "Select a conversation from the list to start messaging."
                      : "No conversations yet. Contact a seller to get started!"}
                  </p>
                  {conversations.length === 0 && (
                    <Link 
                      href="/"
                      className="inline-flex items-center gap-2 bg-[#111] text-white px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors"
                    >
                      Browse Products
                      <ChevronRight size={16} />
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}