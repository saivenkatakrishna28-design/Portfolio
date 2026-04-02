const roles = [
  "Aspiring AI/ML Engineer",
  "B.Tech CSE (AI & ML) Student",
  "Future ML Engineer",
  "Generative AI Enthusiast"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;
const typedText = document.getElementById("typed-text");
let chatInitialized = false;

const portfolioData = {
  name: "Nune Sai Venkata Krishna",
  college: "Parul University (PIET), Gujarat",
  specialization: "Computer Science Engineering with Artificial Intelligence and Machine Learning",
  graduationYear: "2029",
  cgpa: "6.70",
  tenth: "91.5%",
  eleventh: "74.17%",
  twelfth: "72.67%",
  email: "saivenkatakrishna28@gmail.com",
  phones: ["8328279164", "9505690670"],
  github: "https://github.com/saivenkatakrishna28-design",
  linkedin: "https://in.linkedin.com/in/n-s-v-k",
  resume: "docs/resume.pdf",
  location: "Chirala, Andhra Pradesh, India",
  skills: [
    "C",
    "C++",
    "Python",
    "C#",
    "HTML",
    "CSS",
    "JavaScript",
    "Machine Learning",
    "Prompt Engineering",
    "Generative AI"
  ],
  projects: [
    {
      name: "Portfolio Website",
      desc: "Interactive single-page portfolio built with HTML, CSS, and JavaScript, including a custom chatbot and responsive design.",
      link: "https://github.com/saivenkatakrishna28-design/Portfolio.git"
    },
    {
      name: "Calculator (C)",
      desc: "Command-line calculator project showing logic building, control structures, and C fundamentals.",
      link: "https://github.com/saivenkatakrishna28-design/simple-calculator-c"
    },
    {
      name: "Sai Bot",
      desc: "Custom bot project showcasing logic, chatbot-style interaction, and practical AI/ML-oriented interest.",
      link: "https://github.com/saivenkatakrishna28-design/sai_bot"
    }
  ],
  achievements: [
    "Governor's Award (2023)",
    "Academic Excellence Recognition",
    "UNICEF SIDP Participation",
    "Literary and Cultural Wins",
    "Google Dev Groups Praxis 2.0 Participation",
    "National Science Day Exhibition",
    "ByteBattle 2026 Participation"
  ],
  certifications: [
    "Machine Learning with Python",
    "Artificial Intelligence",
    "Generative AI",
    "Prompt Engineering",
    "AI for Beginners",
    "SEO",
    "AI Tools Workshops",
    "ByteBattle 2026 - Certificate of Participation"
  ]
};

const chatbotState = {
  userName: "",
  lastTopic: "general",
  mode: "general",
  history: []
};

function typeEffect() {
  if (!typedText) return;

  const currentRole = roles[roleIndex];

  if (!deleting) {
    typedText.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentRole.length) {
      deleting = true;
      setTimeout(typeEffect, 1400);
      return;
    }
  } else {
    typedText.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, deleting ? 50 : 90);
}

typeEffect();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        const staggerItems = entry.target.querySelectorAll(".stagger-item");
        staggerItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add("show-stagger");
          }, index * 140);
        });
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".hidden").forEach((el) => observer.observe(el));

const canvas = document.getElementById("particles");
const ctx = canvas ? canvas.getContext("2d") : null;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let particles = [];

function createParticles() {
  if (!canvas) return;
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2,
      d: Math.random() * 1.5 + 0.2
    });
  }
}

createParticles();

function drawParticles() {
  if (!ctx || !canvas) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle =
    getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#fce205";

  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fill();
    p.y -= p.d;

    if (p.y < 0) {
      p.y = canvas.height;
      p.x = Math.random() * canvas.width;
    }
  });

  requestAnimationFrame(drawParticles);
}

drawParticles();

function normalizeText(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function hasAny(text, keywords) {
  return keywords.some((word) => text.includes(word));
}

function nowTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });
}

function remember(role, text, topic = "general") {
  chatbotState.history.push({ role, text, topic });
  if (chatbotState.history.length > 20) chatbotState.history.shift();
  chatbotState.lastTopic = topic;
}

function addMessage(text, className) {
  const body = document.getElementById("chatBody");
  if (!body) return;

  const wrap = document.createElement("div");
  wrap.className = "chat-msg-wrap";

  const msg = document.createElement("div");
  msg.className = "chat-msg " + className;
  msg.textContent = text;

  const time = document.createElement("div");
  time.className = "chat-time";
  time.textContent = nowTime();

  wrap.appendChild(msg);
  wrap.appendChild(time);
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
}

function addHTMLMessage(html, className) {
  const body = document.getElementById("chatBody");
  if (!body) return;

  const wrap = document.createElement("div");
  wrap.className = "chat-msg-wrap";

  const msg = document.createElement("div");
  msg.className = "chat-msg " + className;
  msg.innerHTML = html;

  const time = document.createElement("div");
  time.className = "chat-time";
  time.textContent = nowTime();

  wrap.appendChild(msg);
  wrap.appendChild(time);
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
}

function addTypingIndicator() {
  const body = document.getElementById("chatBody");
  if (!body) return;

  const wrap = document.createElement("div");
  wrap.className = "chat-msg-wrap";
  wrap.id = "typingWrap";

  const msg = document.createElement("div");
  msg.className = "chat-msg bot-msg typing-msg";
  msg.innerHTML = `
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
    <span class="typing-dot"></span>
  `;

  wrap.appendChild(msg);
  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
}

function removeTypingIndicator() {
  const typing = document.getElementById("typingWrap");
  if (typing) typing.remove();
}

function clearQuickReplies() {
  document.querySelectorAll(".quick-replies").forEach((el) => el.remove());
}

function addQuickReplies(options) {
  const body = document.getElementById("chatBody");
  if (!body || !options || !options.length) return;

  clearQuickReplies();

  const wrap = document.createElement("div");
  wrap.className = "quick-replies";

  options.forEach((text) => {
    const btn = document.createElement("button");
    btn.className = "quick-reply-btn";
    btn.type = "button";
    btn.textContent = text;
    btn.onclick = () => {
      const input = document.getElementById("userInput");
      if (!input) return;
      input.value = text;
      sendMessage();
    };
    wrap.appendChild(btn);
  });

  body.appendChild(wrap);
  body.scrollTop = body.scrollHeight;
}

function jumpToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function addLinkCard(type) {
  if (type === "profiles") {
    addHTMLMessage(
      `
      <div class="chat-link-card">
        <a href="${portfolioData.github}" target="_blank" rel="noopener">GitHub</a>
        <a href="${portfolioData.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
        <a href="${portfolioData.resume}" target="_blank" rel="noopener">Resume</a>
      </div>
      `,
      "bot-msg"
    );
  }

  if (type === "contact") {
    addHTMLMessage(
      `
      <div class="chat-link-card">
        <a href="mailto:${portfolioData.email}">Email</a>
        <a href="${portfolioData.linkedin}" target="_blank" rel="noopener">LinkedIn</a>
      </div>
      `,
      "bot-msg"
    );
  }

  if (type === "projects") {
    addHTMLMessage(
      `
      <div class="chat-link-card">
        <a href="${portfolioData.projects[0].link}" target="_blank" rel="noopener">Portfolio</a>
        <a href="${portfolioData.projects[1].link}" target="_blank" rel="noopener">Calculator</a>
        <a href="${portfolioData.projects[2].link}" target="_blank" rel="noopener">Sai Bot</a>
      </div>
      `,
      "bot-msg"
    );
  }
}

function getSuggestionsByTopic(topic) {
  if (topic === "education") {
    return [
      "What is your CGPA?",
      "What is your graduation year?",
      "Tell me 10th and 12th marks",
      "Show skills"
    ];
  }

  if (topic === "skills") {
    return [
      "Do you know Python?",
      "Do you know C++?",
      "Are you skilled in AI/ML?",
      "Show projects"
    ];
  }

  if (topic === "projects") {
    return [
      "Tell me about Sai Bot",
      "Tell me about calculator project",
      "Show GitHub",
      "How was this portfolio built?"
    ];
  }

  if (topic === "achievements") {
    return [
      "Show certifications",
      "Tell me about Governor's Award",
      "Tell me about ByteBattle 2026",
      "How can I contact Krishna?"
    ];
  }

  if (topic === "contact") {
    return [
      "Go to contact",
      "Show email",
      "Show phone number",
      "Can I hire Krishna?"
    ];
  }

  return [
    "Who is Krishna?",
    "Show skills",
    "Show projects",
    "How can I contact Krishna?"
  ];
}

function setMode(text) {
  if (hasAny(text, ["hire", "recruiter", "interview", "client", "freelance", "internship"])) {
    chatbotState.mode = "recruiter";
    return;
  }

  if (hasAny(text, ["education", "college", "cgpa", "marks", "graduation"])) {
    chatbotState.mode = "student";
    return;
  }

  chatbotState.mode = "general";
}

function toggleChat() {
  const chat = document.getElementById("chatWindow");
  const tooltip = document.getElementById("chatTooltip");

  if (!chat) return;

  if (chat.style.display === "flex") {
    chat.style.display = "none";
    if (tooltip) tooltip.style.display = "block";
  } else {
    chat.style.display = "flex";
    if (tooltip) tooltip.style.display = "none";

    if (!chatInitialized) {
      addMessage(
        "Hi! I’m the NSVK AI Portfolio Assistant. I can guide you through Krishna’s education, skills, projects, certifications, achievements, resume, and contact options.",
        "bot-msg"
      );
      remember("bot", "greeting", "general");

      addQuickReplies([
        "Who is Krishna?",
        "Show skills",
        "Show projects",
        "How can I contact Krishna?"
      ]);

      chatInitialized = true;
    }
  }
}

function getBotResponse(input) {
  const raw = input.trim();
  const text = normalizeText(raw);

  setMode(text);

  if (text.startsWith("my name is ")) {
    const name = raw.substring(11).trim();
    chatbotState.userName = name;
    return {
      text: `Nice to meet you, ${name}. You can ask me about Krishna's background, projects, skills, education, certifications, or hiring details.`,
      topic: "general"
    };
  }

  if (hasAny(text, ["hi", "hello", "hey", "hii"])) {
    return {
      text: `Hello${chatbotState.userName ? " " + chatbotState.userName : ""}! Ask me about Krishna's education, skills, projects, certifications, achievements, resume, or contact details.`,
      topic: "general"
    };
  }

  if (hasAny(text, ["who is krishna", "who are you", "about krishna", "about yourself"])) {
    return {
      text: `${portfolioData.name} is a B.Tech CSE student specializing in AI and ML. He is an aspiring AI/ML Engineer interested in programming, web development, AI tools, and real-world technical problem solving.`,
      topic: "general"
    };
  }

  if (hasAny(text, ["background", "what do you do", "professional background"])) {
    return {
      text: "He is building his profile through B.Tech studies, technical certifications, practical coding projects, AI/ML learning, prompt engineering, and portfolio development.",
      topic: "general"
    };
  }

  if (hasAny(text, ["career goal", "future goal", "goal", "aim"])) {
    return {
      text: "His goal is to become a strong AI and Machine Learning Engineer and build useful software solutions for real-world problems.",
      topic: "general"
    };
  }

  if (hasAny(text, ["location", "where are you from", "where are you located"])) {
    return {
      text: `He is from ${portfolioData.location}.`,
      topic: "general"
    };
  }

  if (hasAny(text, ["college", "where are you currently studying", "where do you study", "current college"])) {
    return {
      text: `He is currently studying at ${portfolioData.college}.`,
      topic: "education"
    };
  }

  if (hasAny(text, ["major", "specialization", "branch"])) {
    return {
      text: `His specialization is ${portfolioData.specialization}.`,
      topic: "education"
    };
  }

  if (hasAny(text, ["graduation year", "expected to graduate", "graduate"])) {
    return {
      text: `He is expected to graduate in ${portfolioData.graduationYear}.`,
      topic: "education"
    };
  }

  if (hasAny(text, ["cgpa", "gpa"])) {
    return {
      text: `His current CGPA is ${portfolioData.cgpa}.`,
      topic: "education"
    };
  }

  if (hasAny(text, ["10th", "10th marks", "10th percentage"])) {
    return {
      text: `He scored ${portfolioData.tenth} in 10th grade.`,
      topic: "education"
    };
  }

  if (hasAny(text, ["12th", "12th marks", "12th percentage", "11th", "intermediate"])) {
    return {
      text: `He completed higher secondary education in Andhra Pradesh. He scored ${portfolioData.eleventh} in 11th and ${portfolioData.twelfth} in 12th.`,
      topic: "education"
    };
  }

  if (hasAny(text, ["skills", "technical skills", "programming languages", "show skills"])) {
    return {
      text: `His technical skills include ${portfolioData.skills.join(", ")}.`,
      topic: "skills"
    };
  }

  if (hasAny(text, ["python"])) {
    return {
      text: "Yes. He knows Python and uses it for scripting, logic building, and AI/ML-oriented learning.",
      topic: "skills"
    };
  }

  if (hasAny(text, ["c++", "cpp"])) {
    return {
      text: "Yes. He knows C++ and has strong fundamentals in programming logic and object-oriented concepts.",
      topic: "skills"
    };
  }

  if (hasAny(text, ["c language", "do you know c"])) {
    return {
      text: "Yes. He knows C and has built a Calculator project in C.",
      topic: "skills"
    };
  }

  if (hasAny(text, ["c#"])) {
    return {
      text: "Yes. He is familiar with C# and structured development concepts.",
      topic: "skills"
    };
  }

  if (hasAny(text, ["html", "css", "javascript", "frontend", "web development"])) {
    return {
      text: "He uses HTML, CSS, and JavaScript to build responsive and interactive portfolio interfaces.",
      topic: "skills"
    };
  }

  if (hasAny(text, ["ai ml", "artificial intelligence", "machine learning"])) {
    return {
      text: "Yes. He has skills and certifications related to AI, Machine Learning, Prompt Engineering, and Generative AI.",
      topic: "skills"
    };
  }

  if (hasAny(text, ["generative ai", "prompt engineering", "gen ai"])) {
    return {
      text: "He has practical learning exposure to Prompt Engineering and Generative AI through certifications and hands-on exploration.",
      topic: "skills"
    };
  }

  if (hasAny(text, ["projects", "project work", "show projects"])) {
    return {
      text: `His key projects include ${portfolioData.projects.map((p) => p.name).join(", ")}. These projects reflect coding ability, UI building, and logic-based development.`,
      topic: "projects",
      links: "projects"
    };
  }

  if (hasAny(text, ["sai bot"])) {
    return {
      text: portfolioData.projects[2].desc,
      topic: "projects",
      links: "projects"
    };
  }

  if (hasAny(text, ["calculator project", "calculator", "c calculator"])) {
    return {
      text: portfolioData.projects[1].desc,
      topic: "projects",
      links: "projects"
    };
  }

  if (hasAny(text, ["portfolio website", "this website", "how was this portfolio built"])) {
    return {
      text: portfolioData.projects[0].desc,
      topic: "projects",
      links: "projects"
    };
  }

  if (hasAny(text, ["github", "source code", "show github", "linkedin"])) {
    return {
      text: "You can explore Krishna's professional links below.",
      topic: "projects",
      links: "profiles"
    };
  }

  if (hasAny(text, ["certifications", "technical certifications", "show certifications"])) {
    return {
      text: `His certifications include ${portfolioData.certifications.join(", ")}.`,
      topic: "achievements"
    };
  }

  if (hasAny(text, ["bytebattle", "byte battle", "bytebattle 2026", "coding showdown", "infotechiezz"])) {
    return {
      text: "He participated in ByteBattle 2026 - The Ultimate Coding Showdown, organized by InfoTechiezz, and received a Certificate of Participation.",
      topic: "achievements"
    };
  }

  if (hasAny(text, ["achievements", "awards", "show achievements"])) {
    return {
      text: `His major achievements include ${portfolioData.achievements.join(", ")}.`,
      topic: "achievements"
    };
  }

  if (hasAny(text, ["governor award", "governors award"])) {
    return {
      text: "He received the Governor's Award in 2023 after winning 3rd prize in a Telugu Oratorical Competition.",
      topic: "achievements"
    };
  }

  if (hasAny(text, ["resume", "cv", "download resume"])) {
    return {
      text: "You can view Krishna's resume using the resume button on the portfolio or the shortcut below.",
      topic: "contact",
      links: "profiles"
    };
  }

  if (hasAny(text, ["hire", "recruiter", "interview", "client", "freelance", "internship", "available for work"])) {
    return {
      text: "Yes. Krishna is open to internships, freelance opportunities, project collaborations, and learning-focused technical roles. Direct email and LinkedIn are the best ways to connect.",
      topic: "contact",
      links: "contact"
    };
  }

  if (hasAny(text, ["go to contact", "open contact form", "scroll to contact", "show contact form"])) {
    setTimeout(() => {
      const chat = document.getElementById("chatWindow");
      if (chat && chat.style.display === "flex") toggleChat();
      jumpToSection("contact");
    }, 400);

    return {
      text: "Sure. Taking you to the contact section now.",
      topic: "contact",
      links: "contact"
    };
  }

  if (hasAny(text, ["go to projects", "show projects section"])) {
    setTimeout(() => jumpToSection("projects"), 300);
    return {
      text: "Opening the projects section for you.",
      topic: "projects"
    };
  }

  if (hasAny(text, ["go to skills", "show skills section"])) {
    setTimeout(() => jumpToSection("skills"), 300);
    return {
      text: "Taking you to the skills section now.",
      topic: "skills"
    };
  }

  if (hasAny(text, ["go to education", "show education section"])) {
    setTimeout(() => jumpToSection("education"), 300);
    return {
      text: "Opening the education section now.",
      topic: "education"
    };
  }

  if (hasAny(text, ["contact form", "where is the contact form"])) {
    return {
      text: "The contact form is in the Contact section near the bottom of the portfolio. You can also type 'Go to contact' and I will take you there.",
      topic: "contact"
    };
  }

  if (hasAny(text, ["does the contact form work", "form work", "message not sending", "form not working"])) {
    return {
      text: "The form is set up for sending messages. If there is any issue, the fastest options are direct email and LinkedIn.",
      topic: "contact",
      links: "contact"
    };
  }

  if (hasAny(text, ["email", "email address", "show email"])) {
    return {
      text: `His email address is ${portfolioData.email}.`,
      topic: "contact",
      links: "contact"
    };
  }

  if (hasAny(text, ["phone", "phone number", "mobile number", "show phone number", "number"])) {
    return {
      text: `His phone numbers are ${portfolioData.phones.join(" and ")}.`,
      topic: "contact"
    };
  }

  if (hasAny(text, ["contact", "how can i contact", "contact krishna"])) {
    return {
      text: `You can contact Krishna through the form, by email at ${portfolioData.email}, or by phone at ${portfolioData.phones.join(" / ")}.`,
      topic: "contact",
      links: "contact"
    };
  }

  if (hasAny(text, ["tell me more", "more", "explain more"])) {
    if (chatbotState.lastTopic === "skills") {
      return {
        text: "His strongest areas are programming fundamentals, web development, and AI/ML-oriented learning. The portfolio is designed to show both technical growth and practical project building.",
        topic: "skills"
      };
    }

    if (chatbotState.lastTopic === "projects") {
      return {
        text: "His projects show a mix of frontend presentation, chatbot-style logic, and core programming fundamentals. Together they make the portfolio stronger and more practical.",
        topic: "projects",
        links: "projects"
      };
    }

    if (chatbotState.lastTopic === "education") {
      return {
        text: "His academic journey shows strong school performance and a focused transition into AI/ML through his B.Tech specialization.",
        topic: "education"
      };
    }

    if (chatbotState.lastTopic === "contact") {
      return {
        text: "For the fastest response, direct email and LinkedIn are the best options. The contact form is useful for regular website visitors as well.",
        topic: "contact",
        links: "contact"
      };
    }

    if (chatbotState.lastTopic === "achievements") {
      return {
        text: "His achievements combine academic performance, public speaking recognition, event participation, innovation exposure, and technical competition involvement like ByteBattle 2026.",
        topic: "achievements"
      };
    }
  }

  return {
    text: "I can help with Krishna's education, skills, projects, certifications, achievements, resume, or contact details. Try asking 'Show skills', 'Tell me about Sai Bot', 'What is your CGPA?', 'Tell me about ByteBattle 2026', or 'How can I contact Krishna?'",
    topic: "general"
  };
}

function sendMessage() {
  const input = document.getElementById("userInput");
  if (!input) return;

  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user-msg");
  remember("user", message, chatbotState.lastTopic);
  input.value = "";

  addTypingIndicator();

  setTimeout(() => {
    removeTypingIndicator();

    const response = getBotResponse(message);
    addMessage(response.text, "bot-msg");
    remember("bot", response.text, response.topic);

    if (response.links) addLinkCard(response.links);
    addQuickReplies(getSuggestionsByTopic(response.topic));
  }, 700);
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    sendMessage();
  }
}

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = new FormData(contactForm);
    const submitButton = contactForm.querySelector("button[type='submit']");
    const originalText = submitButton.textContent;

    submitButton.textContent = "Sending...";
    submitButton.disabled = true;

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: data,
        headers: {
          Accept: "application/json"
        }
      });

      if (response.ok) {
        contactForm.reset();
        submitButton.textContent = "Message Sent Successfully!";
        submitButton.style.backgroundColor = "#4CAF50";
        submitButton.style.color = "white";
      } else {
        submitButton.textContent = "Oops! Error sending.";
      }
    } catch (error) {
      submitButton.textContent = "Network Error.";
    }

    setTimeout(() => {
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      submitButton.style.backgroundColor = "";
      submitButton.style.color = "";
    }, 3000);
  });
}
