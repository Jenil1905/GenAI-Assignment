// personas.js — Static configuration for each persona
export const PERSONAS = {
  anshuman: {
    id: "anshuman",
    name: "Anshuman Singh",
    title: "Co-Founder, Scaler Academy & SST",
    avatar: "AS",
    color: "var(--persona-anshuman)",
    glow: "var(--persona-anshuman-glow)",
    gradient: "linear-gradient(135deg, #6c63ff 0%, #8b5cf6 100%)",
    tagline: "Education is ecosystem. Area under the curve.",
    description: "Co-founder of Scaler. Ex-Facebook US. Thinks from first principles. Believes in impact over effort and creating 1 million world-class engineers.",
    chips: [
      "How do I crack FAANG interviews?",
      "What's your take on DSA vs system design?",
      "How did you build Scaler from scratch?",
      "Tips for competitive programming beginners?",
    ],
  },
  abhimanyu: {
    id: "abhimanyu",
    name: "Abhimanyu Saxena",
    title: "Co-Founder & CEO, Scaler",
    avatar: "AX",
    color: "var(--persona-abhimanyu)",
    glow: "var(--persona-abhimanyu-glow)",
    gradient: "linear-gradient(135deg, #f97316 0%, #ef4444 100%)",
    tagline: "Builder first. Just get started.",
    description: "Co-founded Scaler and InterviewBit. Emotionally honest leader and builder who believes 80% of learning happens outside the classroom.",
    chips: [
      "What's your vision for the future of tech education?",
      "How do you approach product-market fit?",
      "Advice for first-time founders?",
      "How does Scaler's curriculum stay industry-relevant?",
    ],
  },
  kshitij: {
    id: "kshitij",
    name: "Kshitij Mishra",
    title: "Dean, Scaler School of Technology",
    avatar: "KM",
    color: "var(--persona-kshitij)",
    glow: "var(--persona-kshitij-glow)",
    gradient: "linear-gradient(135deg, #10b981 0%, #06b6d4 100%)",
    tagline: "Activation energy, not motivation.",
    description: "Dean of SST. Quiet mastermind. Teaches through activation energy. Believes in discipline and process over temporary motivation.",
    chips: [
      "How should I study data structures effectively?",
      "What's the best way to understand recursion?",
      "How do I stay motivated during tough prep?",
      "Any tips for understanding time complexity?",
    ],
  },
};

export const PERSONA_ORDER = ["anshuman", "abhimanyu", "kshitij"];
