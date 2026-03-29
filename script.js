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
  ctx.fillStyle = getComputedStyle(document.documentElement)
    .getPropertyValue("--accent")
    .trim();

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

    if (!chatInitialized) {
      addMessage(
        "Hi! I am the NSVK portfolio assistant. You can ask me about Krishna's skills, education, projects, certifications, achievements, or contact details.",
        "bot-msg"
      );
      addMessage(
        "Try asking:\n• What are your skills?\n• Where are you currently studying?\n• Tell me about Sai Bot.\n• How can I contact Krishna?",
        "bot-msg"
      );
      chatInitialized = true;
    }
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

function includesAny(input, keywords) {
  return keywords.some((word) => input.includes(word));
}

function getBotResponse(input) {
  input = input.toLowerCase().trim();

  if (includesAny(input, ["hi", "hello", "hey", "hii"])) {
    return "Hello! Ask me about Krishna's education, skills, projects, certifications, achievements, resume, or contact details.";
  }

  if (
    includesAny(input, [
      "who are you",
      "who is nune sai venkata krishna",
      "who is krishna",
      "tell me about yourself",
      "about you"
    ])
  ) {
    return "Nune Sai Venkata Krishna is a B.Tech student specializing in Computer Science Engineering with Artificial Intelligence and Machine Learning. He is an aspiring AI/ML Engineer with strong interest in programming, web development, machine learning, and generative AI.";
  }

  if (
    includesAny(input, [
      "what do you do",
      "professional background",
      "background"
    ])
  ) {
    return "He is currently a B.Tech CSE (AI & ML) student and is building his technical background through programming, certifications, projects, prompt engineering, and practical learning in AI and software development.";
  }

  if (
    includesAny(input, [
      "career goals",
      "goal",
      "future goal",
      "what is your goal"
    ])
  ) {
    return "His career goal is to become a skilled AI and Machine Learning Engineer and build meaningful solutions using intelligent technologies, software development, and real-world problem-solving.";
  }

  if (
    includesAny(input, [
      "what kind of roles",
      "roles are you looking for",
      "looking for right now",
      "job role"
    ])
  ) {
    return "He is currently looking for learning opportunities, internships, project collaborations, and roles related to AI, Machine Learning, software development, and technology.";
  }

  if (
    includesAny(input, [
      "internship",
      "freelance",
      "open to internships",
      "open to freelance",
      "available for internship"
    ])
  ) {
    return "Yes, he is open to internships, project collaborations, and learning opportunities in AI, Machine Learning, and software development.";
  }

  if (
    includesAny(input, [
      "where are you located",
      "where are you from",
      "location",
      "from where",
      "located"
    ])
  ) {
    return "He is from Chirala, Andhra Pradesh, India.";
  }

  if (
    includesAny(input, [
      "core strengths",
      "soft skills",
      "strengths"
    ])
  ) {
    return "His core strengths include communication, discipline, consistency, problem-solving, curiosity, confidence, public speaking, and continuous learning.";
  }

  if (
    includesAny(input, [
      "where are you currently studying",
      "currently studying",
      "where do you study",
      "current college"
    ])
  ) {
    return "He is currently studying at Parul University (PIET), Gujarat.";
  }

  if (
    includesAny(input, [
      "major",
      "specialization",
      "branch",
      "what is your major"
    ])
  ) {
    return "His major is Computer Science Engineering with a specialization in Artificial Intelligence and Machine Learning.";
  }

  if (
    includesAny(input, [
      "graduate",
      "expected to graduate",
      "graduation year",
      "when will you graduate"
    ])
  ) {
    return "He is expected to graduate in June 2029.";
  }

  if (
    includesAny(input, [
      "cgpa",
      "current cgpa",
      "gpa"
    ])
  ) {
    return "His current CGPA is 6.70.";
  }

  if (
    includesAny(input, [
      "where did you complete your high school education",
      "high school education",
      "where completed 10th",
      "till 10th",
      "10th class",
      "secondary school",
      "school till 10th"
    ])
  ) {
    return "He completed his 10th class at Sundeep English Medium High School in Andhra Pradesh. Before that, he studied at Adithya Public School, Chirala.";
  }

  if (
    includesAny(input, [
      "12th",
      "12th grade",
      "11th",
      "high school score",
      "scores in 10th and 12th",
      "marks in 10th",
      "marks in 12th"
    ])
  ) {
    return "He scored 91.5% in 10th grade and 72.67% in 12th grade. He also scored 74.17% in 11th grade.";
  }

  if (
    includesAny(input, [
      "andhra pradesh",
      "did you study in andhra pradesh"
    ])
  ) {
    return "Yes. He completed his schooling in Andhra Pradesh before joining Parul University in Gujarat.";
  }

  if (
    includesAny(input, [
      "programming languages",
      "languages do you know",
      "technical skills",
      "skills"
    ])
  ) {
    return "He knows C, C++, Python, C#, HTML, CSS, JavaScript, Machine Learning fundamentals, Prompt Engineering, and Generative AI basics.";
  }

  if (includesAny(input, ["python"])) {
    return "Yes, he knows Python and uses it for scripting, problem-solving, and machine learning-related learning tasks.";
  }

  if (includesAny(input, ["c++", "cpp"])) {
    return "Yes, he knows C++ and has a strong foundation in programming concepts and logic building.";
  }

  if (includesAny(input, ["c language", "do you know c", " c "])) {
    return "Yes, he knows C and has built projects like a Calculator in C.";
  }

  if (includesAny(input, ["c#"])) {
    return "Yes, he is familiar with C# and structured software development concepts.";
  }

  if (
    includesAny(input, [
      "artificial intelligence",
      "machine learning",
      "ai ml",
      "skilled in ai",
      "skilled in machine learning"
    ])
  ) {
    return "Yes, he has skills and certifications in Artificial Intelligence, Machine Learning, and Generative AI fundamentals.";
  }

  if (
    includesAny(input, [
      "web development technologies",
      "web development",
      "html css javascript",
      "frontend"
    ])
  ) {
    return "He knows HTML, CSS, and JavaScript for building responsive and interactive web interfaces.";
  }

  if (
    includesAny(input, [
      "prompt engineering",
      "generative ai",
      "gen ai"
    ])
  ) {
    return "Yes, he has experience with Prompt Engineering and Generative AI, supported by certifications and hands-on practice.";
  }

  if (
    includesAny(input, [
      "what projects have you worked on",
      "projects",
      "project work"
    ])
  ) {
    return "His main projects include the Portfolio Website, Sai Bot, and a Calculator in C.";
  }

  if (
    includesAny(input, [
      "sai bot",
      "tell me about sai bot"
    ])
  ) {
    return "Sai Bot is a custom bot project that reflects his practical interest in AI, logic building, and project development. It showcases experimentation, strategy, and programming skills.";
  }

  if (
    includesAny(input, [
      "calculator project",
      "c calculator",
      "what is the c calculator project"
    ])
  ) {
    return "The C Calculator project is a command-line application built in C to demonstrate logic building, control structures, and core programming fundamentals.";
  }

  if (
    includesAny(input, [
      "how did you build this portfolio website",
      "portfolio website",
      "built this website"
    ])
  ) {
    return "This portfolio website was built using HTML, CSS, and JavaScript. It includes sections for education, skills, projects, certifications, achievements, contact details, and a custom chatbot assistant.";
  }

  if (
    includesAny(input, [
      "source code",
      "github source",
      "find the source code",
      "where can i find the source code"
    ])
  ) {
    return "You can find the source code for his projects in the Projects section and on his GitHub profile: github.com/saivenkatakrishna28-design";
  }

  if (
    includesAny(input, [
      "technical certifications",
      "certifications",
      "do you have any certifications"
    ])
  ) {
    return "Yes. He has certifications in Machine Learning, AI, Generative AI, Prompt Engineering, AI for Beginners, SEO, and AI tools workshops.";
  }

  if (
    includesAny(input, [
      "google or microsoft",
      "certifications from google",
      "certifications from microsoft"
    ])
  ) {
    return "Yes. He has completed certifications from Google Cloud and Microsoft, including Generative AI & Studio and Prompt Engineering.";
  }

  if (
    includesAny(input, [
      "where did you learn machine learning",
      "learn machine learning",
      "machine learning certification"
    ])
  ) {
    return "He learned Machine Learning through certifications and training from freeCodeCamp, Simplilearn, and Udemy.";
  }

  if (
    includesAny(input, [
      "certifications in generative ai",
      "generative ai certifications"
    ])
  ) {
    return "Yes. He has certifications and learning exposure in Generative AI through Google Cloud and other AI-focused programs.";
  }

  if (
    includesAny(input, [
      "seo masterclass",
      "ai-powered seo masterclass"
    ])
  ) {
    return "The AI-Powered SEO Masterclass was a 3-day intensive learning program focused on SEO and AI-powered digital strategies.";
  }

  if (
    includesAny(input, [
      "biggest achievements",
      "achievements",
      "awards"
    ])
  ) {
    return "His major achievements include the 2023 Governor's Award in a Telugu oratorical competition, academic excellence awards, UNICEF SIDP participation, literary and cultural competition wins, Praxis 2.0 participation, and the National Science Day exhibition.";
  }

  if (
    includesAny(input, [
      "governor's award",
      "governor award",
      "tell me about the governor"
    ])
  ) {
    return "He received the Governor's Award in 2023 after winning 3rd prize in a Telugu Oratorical Competition conducted on the occasion of Sardar Vallabhbhai Patel's birth anniversary. The award was presented by the Governor of Tamil Nadu.";
  }

  if (
    includesAny(input, [
      "unicef sidp",
      "sidp project",
      "unicef project"
    ])
  ) {
    return "The UNICEF SIDP Project involved completing the UPSHIFT Design Process for Social Innovation and submitting a project idea under the School Innovation and Development Project.";
  }

  if (
    includesAny(input, [
      "school topper",
      "academic excellence",
      "academic excellence awards",
      "best student"
    ])
  ) {
    return "Yes. He received academic excellence recognition, including Best Student award, 1st Position overall in Class XI, and subject topper recognition in English, Telugu, and Biology.";
  }

  if (
    includesAny(input, [
      "tech events",
      "hackathon",
      "praxis",
      "tech expo"
    ])
  ) {
    return "Yes. He participated in tech and innovation events including Google Dev Groups Praxis 2.0, Tech Expo 2026, Yuva AI for All, and other community and technology programs.";
  }

  if (
    includesAny(input, [
      "national science day",
      "science exhibition",
      "what did you build"
    ])
  ) {
    return "For the National Science Day Exhibition, he created an artificial rainbow using a prism by passing white light through it and dispersing it into VIBGYOR colors.";
  }

  if (
    includesAny(input, [
      "how can i contact",
      "contact krishna",
      "contact"
    ])
  ) {
    return "You can contact Krishna by email at saivenkatakrishna28@gmail.com or by phone at 8328279164 / 9505690670.";
  }

  if (
    includesAny(input, [
      "email",
      "email address"
    ])
  ) {
    return "His email address is saivenkatakrishna28@gmail.com.";
  }

  if (
    includesAny(input, [
      "phone",
      "phone number",
      "mobile number",
      "number"
    ])
  ) {
    return "His phone numbers are 8328279164 and 9505690670.";
  }

  if (
    includesAny(input, [
      "linkedin",
      "linkedin profile"
    ])
  ) {
    return "His LinkedIn profile is: https://in.linkedin.com/in/n-s-v-k";
  }

  if (
    includesAny(input, [
      "github",
      "github username",
      "github link"
    ])
  ) {
    return "His GitHub profile is: https://github.com/saivenkatakrishna28-design";
  }

  if (
    includesAny(input, [
      "resume",
      "download resume",
      "view resume"
    ])
  ) {
    return "You can view or download his resume using the 'View Resume' button on the home section of this portfolio.";
  }

  return "I'm still learning! You can reach out to Krishna directly at saivenkatakrishna28@gmail.com for more details.";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  if (!input) return;

  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "user-msg");
  input.value = "";

  setTimeout(() => {
    const reply = getBotResponse(msg);
    addMessage(reply, "bot-msg");
  }, 500);
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
}
