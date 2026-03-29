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
  ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();

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
  }
}

function addMessage(text, className) {
  const body = document.getElementById("chatBody");
  if (!body) return;

  const div = document.createElement("div");
  div.className = "chat-msg " + className;
  div.textContent = text;
  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
}

function getBotResponse(input) {
  if (input.includes("skill") || input.includes("tech") || input.includes("language")) {
    return "Krishna is skilled in C, C++, Python, C#, HTML, CSS, Machine Learning, and Generative AI fundamentals.";
  }

  if (
    input.includes("education") ||
    input.includes("study") ||
    input.includes("college") ||
    input.includes("parul") ||
    input.includes("piet")
  ) {
    return "He is pursuing B.Tech in Computer Science Engineering with AI & ML at Parul University (PIET) and currently has a CGPA of 6.70.";
  }

  if (
    input.includes("project") ||
    input.includes("github") ||
    input.includes("portfolio") ||
    input.includes("bot") ||
    input.includes("calculator")
  ) {
    return "His highlighted projects include this portfolio website, a Calculator in C, and Sai Bot. You can check the Projects section or GitHub profile for more.";
  }

  if (
    input.includes("contact") ||
    input.includes("email") ||
    input.includes("reach") ||
    input.includes("linkedin") ||
    input.includes("phone") ||
    input.includes("number")
  ) {
    return "You can reach him by email at saivenkatakrishna28@gmail.com or by phone at 8328279164 / 9505690670. You can also connect through LinkedIn, GitHub, or the contact form on this website.";
  }

  if (
    input.includes("certif") ||
    input.includes("course") ||
    input.includes("ai") ||
    input.includes("ml") ||
    input.includes("be10x")
  ) {
    return "He has certifications in Machine Learning with Python, Intro to AI, Basics of Artificial Intelligence, AI/ML Foundations, AI for Beginners, Generative AI, Prompt Engineering, SEO, and AI tools workshops including be10x.";
  }

  if (
    input.includes("award") ||
    input.includes("achievement") ||
    input.includes("governor") ||
    input.includes("science") ||
    input.includes("unicef")
  ) {
    return "His achievements include the 2023 Governor's Award in a Telugu oratorical competition, academic excellence recognition, UNICEF SIDP participation, literary and cultural wins, Praxis 2.0 participation, community and tech programs, and National Science Day exhibition work.";
  }

  if (input.includes("hi") || input.includes("hello") || input.includes("hey")) {
    return "Hello. I am the NSVK portfolio assistant. Ask me about Krishna's skills, education, projects, certifications, achievements, or contact details.";
  }

  return "I can help with skills, education, projects, certifications, achievements, and contact details from Krishna's portfolio.";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  if (!input) return;

  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "user-msg");
  input.value = "";

  setTimeout(() => {
    const reply = getBotResponse(msg.toLowerCase());
    addMessage(reply, "bot-msg");
  }, 500);
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}