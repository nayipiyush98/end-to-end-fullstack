import { useState } from "react";
import {
  Search,
  Pencil,
  Video,
  Phone,
  MoreVertical,
  Plus,
  Image as ImageIcon,
  Paperclip,
  Send,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ChatUser {
  id: number;
  name: string;
  role: string;
  avatar: string;
  lastMessage: string;
}

interface Message {
  id: number;
  sender: "me" | "other";
  message: string;
  time: string;
}

const chats: ChatUser[] = [
  {
    id: 1,
    name: "Alex John",
    role: "Senior Backend Dev",
    avatar:
      "https://i.pravatar.cc/100?img=12",
    lastMessage: "You: See you later, Alex!",
  },
  {
    id: 2,
    name: "Taylor Grande",
    role: "Frontend Developer",
    avatar:
      "https://i.pravatar.cc/100?img=47",
    lastMessage:
      "Yeah, it's really well-explained. You should give it a try.",
  },
  {
    id: 3,
    name: "John Doe",
    role: "Product Designer",
    avatar:
      "https://i.pravatar.cc/100?img=11",
    lastMessage: "You: Yep, see ya. 👋",
  },
  {
    id: 4,
    name: "Megan Flux",
    role: "UI Designer",
    avatar:
      "https://i.pravatar.cc/100?img=32",
    lastMessage: "You: Sure ✌️",
  },
  {
    id: 5,
    name: "David Brown",
    role: "Backend Developer",
    avatar:
      "https://i.pravatar.cc/100?img=13",
    lastMessage: "You: Great, I'll review them now!",
  },
  {
    id: 6,
    name: "Julia Carter",
    role: "Product Manager",
    avatar:
      "https://i.pravatar.cc/100?img=44",
    lastMessage:
      "Same here! It's coming together nicely.",
  },
  {
    id: 7,
    name: "Brad Wilson",
    role: "Developer",
    avatar:
      "https://i.pravatar.cc/100?img=14",
    lastMessage: "Got it! Thanks for the update.",
  },
  {
    id: 8,
    name: "Katie Lee",
    role: "Designer",
    avatar:
      "https://i.pravatar.cc/100?img=45",
    lastMessage:
      "I'll join the call in a few minutes.",
  },
];

const messages: Message[] = [
  {
    id: 1,
    sender: "other",
    message: "Hey Bob, how are you doing?",
    time: "9:15 AM",
  },
  {
    id: 2,
    sender: "me",
    message: "Hey Alex, I'm doing well! How about you?",
    time: "9:16 AM",
  },
  {
    id: 3,
    sender: "other",
    message: "I'm good, thanks! Did you finish the project?",
    time: "9:17 AM",
  },
  {
    id: 4,
    sender: "me",
    message: "Almost done. Just need to review a few things.",
    time: "9:18 AM",
  },
  {
    id: 5,
    sender: "other",
    message: "Great! Let me know if you need any help.",
    time: "9:19 AM",
  },
];

export function Chats() {
  const [selectedChat, setSelectedChat] =
    useState<ChatUser>(chats[0]);

  const [search, setSearch] = useState("");

  const [message, setMessage] = useState("");

  const filteredChats = chats.filter((chat) =>
    chat.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleSend = () => {
    if (!message.trim()) return;

    console.log("Send message:", message);

    setMessage("");
  };

  return (
    <div className="flex h-[calc(100vh-2rem)] overflow-hidden rounded-xl border text-white">

      

      <aside className="flex w-82.5 shrink-0 flex-col border-r border-slate-800">

        
        <div className="flex items-center justify-between px-5 py-5">

          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold">
              Inbox
            </h1>

            <span className="text-slate-400">
              💬
            </span>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-slate-400 hover:bg-slate-800 hover:text-white"
          >
            <Pencil className="h-4 w-4" />
          </Button>

        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">

            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />

            <Input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search chat..."
              className="border-slate-800 bg-transparent pl-10 text-white placeholder:text-slate-500"
            />

          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2">

          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              type="button"
              onClick={() =>
                setSelectedChat(chat)
              }
              className={`flex w-full gap-3 rounded-lg px-3 py-3 text-left transition ${
                selectedChat.id === chat.id
                  ? "bg-slate-800"
                  : "hover:bg-slate-900"
              }`}
            >

              <img
                src={chat.avatar}
                alt={chat.name}
                className="h-11 w-11 shrink-0 rounded-full object-cover"
              />

              <div className="min-w-0 flex-1">

                <p className="truncate font-semibold">
                  {chat.name}
                </p>

                <p className="mt-1 line-clamp-2 text-sm text-slate-400">
                  {chat.lastMessage}
                </p>

              </div>

            </button>
          ))}

        </div>
      </aside>

      {/* ================= CHAT AREA ================= */}

      <main className="flex min-w-0 flex-1 flex-col">

        {/* Chat Header */}
        <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">

          <div className="flex items-center gap-4">

            <img
              src={selectedChat.avatar}
              alt={selectedChat.name}
              className="h-12 w-12 rounded-full object-cover"
            />

            <div>
              <h2 className="font-semibold">
                {selectedChat.name}
              </h2>

              <p className="text-sm text-slate-400">
                {selectedChat.role}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-1">

            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <Video className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <Phone className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <MoreVertical className="h-5 w-5" />
            </Button>

          </div>

        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-8">

          {/* Date */}
          <div className="mb-8 text-center">
            <span className="text-sm font-medium text-slate-400">
              23 Aug, 2024
            </span>
          </div>

          <div className="space-y-6">

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[65%] rounded-2xl px-4 py-3 ${
                    msg.sender === "me"
                      ? "rounded-br-sm bg-slate-200 text-slate-800"
                      : "rounded-bl-sm bg-slate-800 text-white"
                  }`}
                >

                  <p className="text-sm leading-6">
                    {msg.message}
                  </p>

                  <p
                    className={`mt-1 text-right text-xs ${
                      msg.sender === "me"
                        ? "text-slate-500"
                        : "text-slate-400"
                    }`}
                  >
                    {msg.time}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Message Composer */}
        <div className="border-t border-slate-800 p-5">

          <div className="flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2">

            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <Plus className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <ImageIcon className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <Paperclip className="h-5 w-5" />
            </Button>

            <Input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              placeholder="Type your messages..."
              className="border-0 bg-transparent shadow-none focus-visible:ring-0"
            />

            <Button
              variant="ghost"
              size="icon"
              onClick={handleSend}
              className="text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <Send className="h-5 w-5" />
            </Button>

          </div>

        </div>

      </main>
    </div>
  );
}