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
        "Hi! I am the NSVK portfolio assistant. You can ask me literally anything about Krishna using simple keywords.",
        "bot-msg"
      );
      addMessage(
        "Try words like:\n• 'skills'\n• 'btech'\n• '10th' or '12th'\n• 'awards'\n• 'hire'\n• 'resume'",
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

// THE NEW, ULTRA-POWERFUL CHATBOT BRAIN
function getBotResponse(input) {
  const text = input.toLowerCase().trim();
  
  // Helper functions to scan user text for keywords
  const has = (keywords) => keywords.some(k => text.includes(k));
  const hasAll = (keywords) => keywords.every(k => text.includes(k));

  // 1. GREETINGS
  if (has(["hi", "hello", "hey", "hii", "greetings", "morning", "evening", "sup", "what's up"])) {
    return "Hello! Ask me literally anything: education, skills, projects, certificates, awards, or contact info!";
  }

  // 2. CONTACT & LINKS
  if (has(["email", "mail id", "gmail"])) return "His email is saivenkatakrishna28@gmail.com.";
  if (has(["phone", "mobile", "number", "call", "whatsapp", "contact number"])) return "His phone numbers are 8328279164 and 9505690670.";
  if (has(["linkedin", "linked in"])) return "LinkedIn: https://in.linkedin.com/in/n-s-v-k";
  if (has(["github", "git hub", "git"])) return "GitHub: https://github.com/saivenkatakrishna28-design";
  if (has(["resume", "cv", "document", "download"])) return "You can view his resume by clicking the 'View Resume' button at the top of the page.";

  // 3. SPECIFIC SKILLS
  if (has(["python"])) return "He uses Python heavily for data manipulation, scripting, and Machine Learning models.";
  if (has(["c++", "cpp"])) return "He knows C++ and has a strong foundation in Object-Oriented Programming (OOP) and memory management.";
  if (hasAll(["c", "language"]) || text === "c" || text.includes(" c ") || text.startsWith("c ")) return "He is proficient in C programming and even built a command-line Calculator with it.";
  if (has(["c#", "c sharp"])) return "He knows C# for building structured software applications using .NET frameworks.";
  if (has(["html", "css", "javascript", "js", "web", "frontend", "front end"])) return "He is skilled in HTML, CSS, and JS. He designed and built this entire portfolio website himself!";
  if (has(["machine learning", "ml", "ai", "artificial intelligence"])) return "He specializes in AI/ML, building predictive models, data processing, and foundational algorithms.";
  if (has(["generative ai", "gen ai", "prompt", "chatgpt", "llm"])) return "He is skilled in Prompt Engineering and Generative AI, utilizing tools like Google Gen AI Studio and LLMs.";

  // 4. SPECIFIC PROJECTS
  if (has(["sai bot"])) return "Sai Bot is a custom bot project he built to showcase practical AI/ML capabilities and integration.";
  if (has(["calculator"])) return "He built a Calculator in C to demonstrate core logic, control structures, and syntax fundamentals.";
  if (has(["portfolio website", "this website", "this site"])) return "He built this interactive portfolio using HTML, CSS, and JS, featuring responsive design and this very chatbot!";

  // 5. SPECIFIC ACHIEVEMENTS
  if (has(["governor", "tamil nadu", "oratorical"])) return "He won the prestigious 2023 Governor's Award (3rd prize) in a Telugu Oratorical Competition, presented by the Governor of Tamil Nadu.";
  if (has(["unicef", "sidp", "upshift"])) return "He submitted a social innovation project idea to the UNICEF SIDP after completing the UPSHIFT Design Process.";
  if (has(["science", "rainbow", "exhibition"])) return "For the National Science Day exhibition in 10th grade, he created an artificial rainbow using a prism to disperse white light into VIBGYOR colors.";
  if (has(["topper", "best student", "excellence", "rank"])) return "He was awarded 'Best Student' (2024-25) at SKPD, secured 1st overall in Class XI, and was the subject topper in English, Telugu, and Biology in Class XII.";

  // 6. SPECIFIC EDUCATION
  if (has(["10th", "tenth", "sundeep", "ssc", "matriculation"])) return "He scored 91.5% in his 10th standard from Sundeep English Medium High School.";
  if (has(["11th", "eleventh", "12th", "twelfth", "inter", "skpd", "high school"])) return "He studied at SKPD Boys Higher Secondary School, scoring 74.17% in 11th and 72.67% in 12th.";
  if (has(["btech", "b.tech", "college", "university", "parul", "piet", "degree", "currently studying", "study", "graduate"])) return "He is pursuing his B.Tech in CSE (AI & ML) at Parul University (Gujarat), expected to graduate in June 2029. His CGPA is 6.70.";
  if (has(["cgpa", "gpa", "grade", "marks"])) return "His current B.Tech CGPA is 6.70. His 10th score was 91.5% and 12th was 72.67%.";
  
  // 7. SPECIFIC CERTIFICATIONS
  if (has(["google"])) return "He has a 'Generative AI & Studio' certification from Google Cloud.";
  if (has(["microsoft"])) return "He holds a 'Prompt Engineering' certification from Microsoft.";
  if (has(["seo"])) return "He completed an intensive 3-day 'AI-Powered SEO Masterclass' program.";
  
  // 8. BROAD CATEGORIES (Catch-alls for single words)
  if (has(["skill", "tech stack", "technologies", "know"])) return "His skills include C, C++, Python, C#, HTML, CSS, JavaScript, Machine Learning, and Generative AI.";
  if (has(["project", "build", "developed"])) return "His key projects are this Portfolio Website, a C Calculator, and 'Sai Bot'. Ask me about any of them!";
  if (has(["achievement", "award", "prize", "won"])) return "His top awards include the Governor's Award, 'Best Student' academic excellence, UNICEF SIDP participation, and a National Science Day exhibition project.";
  if (has(["certificate", "certification", "certified", "course"])) return "He has 10+ certifications from Google, Microsoft, freeCodeCamp, Udemy, and others in AI, ML, Python, and Prompt Engineering.";
  if (has(["education", "school"])) return "He did his schooling in AP (Sundeep High School & SKPD Boys) and is now doing his B.Tech at Parul University, Gujarat.";
  
  // 9. IDENTITY / GOALS / GENERAL
  if (has(["goal", "future", "aim", "vision", "career"])) return "His career goal is to become a skilled AI and Machine Learning Engineer, building innovative software and intelligent systems.";
  if (has(["internship", "freelance", "job", "hire", "work", "role"])) return "He is actively looking for internships, project collaborations, and learning opportunities in AI, ML, and software development.";
  if (has(["location", "where", "city", "state", "live", "from", "chirala"])) return "He is located in Chirala, Andhra Pradesh, India.";
  if (has(["strength", "soft skill", "quality"])) return "His non-technical strengths include communication, public speaking, discipline, and dedication.";
  if (has(["who are you", "who is", "about", "yourself", "profile"])) return "Nune Sai Venkata Krishna (NSVK) is a B.Tech student specializing in AI & ML. He is passionate about programming, AI, and building real-world solutions.";
  
  // 10. FORM SPECIFICS
  if (has(["form", "message", "contact form", "working", "does it work"])) return "Yes! You can fill out the contact form at the bottom of the page, and the message will be sent instantly to his email.";
  if (has(["reply", "time", "how long"])) return "Krishna usually replies within 24 to 48 hours. If it's urgent, you can call him!";
  if (has(["contact", "reach"])) return "You can email saivenkatakrishna28@gmail.com, call 8328279164, or use the contact form below.";

  // 11. DEFAULT FALLBACK
  return "I might not know the exact answer to that! Try using simple words like 'skills', 'projects', 'education', 'certificates', or 'contact'. You can also email him directly at saivenkatakrishna28@gmail.com.";
}

function sendMessage() {
  const input = document.getElementById("userInput");
  if (!input) return;

  const msg = input.value.trim();
  if (!msg) return;

  addMessage(msg, "user-msg");
  input.value = "";

  // Scroll to bottom immediately after user sends message
  const body = document.getElementById("chatBody");
  body.scrollTop = body.scrollHeight;

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

// SEAMLESS FORM SUBMISSION LOGIC
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
          'Accept': 'application/json'
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
