// Sample question bank
const questions = {
  "JavaScript": [
    { question: "What is closure in JavaScript?", options: ["A function with private variables", "A data type", "A loop", "None"], correctAnswer: 0 },
    { question: "typeof null returns?", options: ["null", "object", "undefined", "string"], correctAnswer: 1 },
    { question: "Which company developed JavaScript?", options: ["Netscape", "Microsoft", "Sun Microsystems", "Oracle"], correctAnswer: 0 },
    { question: "Which symbol is used for single line comments in JS?", options: ["//", "/* */", "#", "none"], correctAnswer: 0 },
    { question: "What does '===' mean in JS?", options: ["Equal value and type", "Only equal value", "Assignment", "Not equal"], correctAnswer: 0 }
  ],
  "Python": [
    { question: "What is the output of: len('hello')?", options: ["5", "4", "Error", "None"], correctAnswer: 0 },
    { question: "Which is immutable?", options: ["List", "Tuple", "Dictionary", "Set"], correctAnswer: 1 },
    { question: "Which keyword is used for function?", options: ["def", "function", "fun", "lambda"], correctAnswer: 0 },
    { question: "Python is:", options: ["Interpreted", "Compiled", "Both", "None"], correctAnswer: 0 },
    { question: "How do you start a comment in Python?", options: ["#", "//", "/* */", "--"], correctAnswer: 0 }
  ],
  "Java": [
    { question: "What does JVM stand for?", options: ["Java Virtual Machine", "Java Variable Manager", "Java Vector Model", "Java Version Manager"], correctAnswer: 0 },
    { question: "Which keyword is used to create an object?", options: ["new", "create", "make", "build"], correctAnswer: 0 },
    { question: "Which is not a Java access modifier?", options: ["public", "private", "protected", "friendly"], correctAnswer: 3 },
    { question: "Java is:", options: ["Platform independent", "Platform dependent", "Both", "None"], correctAnswer: 0 },
    { question: "Which method is the entry point of a Java program?", options: ["main()", "start()", "init()", "run()"], correctAnswer: 0 }
  ],
  "C++": [
    { question: "C++ is an extension of which language?", options: ["C", "Java", "Python", "C#"], correctAnswer: 0 },
    { question: "Which keyword is used to inherit a class?", options: ["public", "protected", "private", ":"], correctAnswer: 3 },
    { question: "Which operator is used for scope resolution?", options: ["::", ":", ".", "=>"], correctAnswer: 0 },
    { question: "What is the size of int in C++ (typically)?", options: ["2 bytes", "4 bytes", "8 bytes", "Depends on OS"], correctAnswer: 1 },
    { question: "Which is used to handle exceptions?", options: ["try-catch", "if-else", "switch", "for"], correctAnswer: 0 }
  ],
  "HTML": [
    { question: "HTML stands for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyperlinks Text Mark Language", "None"], correctAnswer: 0 },
    { question: "Which tag is used for links?", options: ["<a>", "<link>", "<href>", "<url>"], correctAnswer: 0 },
    { question: "Which attribute specifies an image source?", options: ["src", "href", "link", "img"], correctAnswer: 0 },
    { question: "HTML comments start with?", options: ["<!--", "//", "/*", "#"], correctAnswer: 0 },
    { question: "The <title> tag is placed in?", options: ["<head>", "<body>", "<footer>", "<html>"], correctAnswer: 0 }
  ],
  "CSS": [
    { question: "CSS stands for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"], correctAnswer: 0 },
    { question: "Which property changes text color?", options: ["color", "font-color", "text-color", "background-color"], correctAnswer: 0 },
    { question: "Which property controls spacing between lines?", options: ["line-height", "spacing", "margin", "padding"], correctAnswer: 0 },
    { question: "How do you select an element by id?", options: ["#id", ".id", "id", "*id"], correctAnswer: 0 },
    { question: "Which property adds space inside an element?", options: ["padding", "margin", "border", "spacing"], correctAnswer: 0 }
  ]
};

let selectedLanguages = [];
let quizQuestions = [];
let currentQuestionIndex = 0;
let userAnswers = [];

// Toast helper
function showToast(message, icon='warning') {
  Swal.fire({
    toast: true,
    position: 'top-end',
    icon: icon,
    title: message,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true
  });
}

// Toggle language selection
document.querySelectorAll('.language-card').forEach(card => {
  card.addEventListener('click', () => {
    const checkbox = card.querySelector('input[type="checkbox"]');
    checkbox.checked = !checkbox.checked;
    card.classList.toggle('active', checkbox.checked);
  });
});

// Start test
function startTest() {
  selectedLanguages = Array.from(document.querySelectorAll('input[type=checkbox]:checked'))
    .map(cb => cb.value);

  if (selectedLanguages.length === 0) {
    showToast("Please select at least one language.");
    return;
  }

  quizQuestions = selectedLanguages.flatMap(lang => questions[lang] || []);
  if (quizQuestions.length === 0) {
    showToast("No questions available for selected languages.");
    return;
  }

  document.getElementById("languageSection").classList.add("d-none");
  document.getElementById("quizSection").classList.remove("d-none");

  currentQuestionIndex = 0;
  userAnswers = new Array(quizQuestions.length).fill(undefined); // Initialize answers
  showQuestion();
}

// Show current question
function showQuestion() {
  const q = quizQuestions[currentQuestionIndex];
  document.getElementById("questionText").innerText = q.question;

  // Generate options
  const optionsHTML = q.options.map((opt, i) => `
    <li class="option-item" data-value="${i}" onclick="selectOption(${i})">
      ${opt}
    </li>
  `).join("");
  document.getElementById("optionsContainer").innerHTML = optionsHTML;

  // Highlight selected answer
  const selected = userAnswers[currentQuestionIndex];
  if (selected !== undefined) {
    const selectedEl = document.querySelector(`.option-item[data-value="${selected}"]`);
    if (selectedEl) selectedEl.classList.add('selected');
  }

  // Update progress bar
  const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
  document.getElementById("progressBar").style.width = `${progress}%`;

  // Update question number
  document.getElementById("questionNumber").innerText = currentQuestionIndex + 1;

  // Show/hide submit and next buttons
  const submitBtn = document.getElementById("submitBtn");
  const nextBtn = document.getElementById("nextBtn"); // make sure your Next button has id="nextBtn"
  
  if (currentQuestionIndex === quizQuestions.length - 1) {
    submitBtn.style.display = "inline-block"; // show submit
    nextBtn.style.display = "none";           // hide next
  } else {
    submitBtn.style.display = "none";         // hide submit
    nextBtn.style.display = "inline-block";   // show next
  }
}

// Select answer
function selectOption(index) {
  // Remove previous selection
  document.querySelectorAll('.option-item').forEach(item => item.classList.remove('selected'));
  // Add new selection
  document.querySelector(`.option-item[data-value="${index}"]`).classList.add('selected');
  // Save answer
  userAnswers[currentQuestionIndex] = index;
}

// Next question
function nextQuestion() {
  if (userAnswers[currentQuestionIndex] === undefined) {
    showToast("Please select an answer.");
    return;
  }
  if (currentQuestionIndex < quizQuestions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  }
}

// Previous question
function prevQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  }
}

// Submit test
function submitTest() {
  if (userAnswers[currentQuestionIndex] === undefined) {
    showToast("Please select an answer for the current question.");
    return;
  }

  let correct = 0;
  quizQuestions.forEach((q, i) => {
    if (userAnswers[i] === q.correctAnswer) correct++;
  });

  const total = quizQuestions.length;
  const percentage = Math.round((correct / total) * 100);

  document.getElementById("quizSection").classList.add("d-none");
  document.getElementById("resultSection").classList.remove("d-none");

  document.getElementById("scoreValue").innerText = `${correct} / ${total}`;
  document.getElementById("scorePercent").innerText = `(${percentage}%)`;

  // Threshold: 50%
  if (percentage >= 50) {
    document.getElementById("successMsg").classList.remove("d-none");
    document.getElementById("resumeUpload").classList.remove("d-none");
  } else {
    document.getElementById("tryAgainMsg").classList.remove('d-none');
  }
}


function uploadResume() {
  const fileInput = document.getElementById('resumeFile');
  if (!fileInput.files.length) {
    showToast("Please select a file to upload.");
    return;
  }

  const file = fileInput.files[0];
  const allowedTypes = ['application/pdf', 
                        'application/msword', 
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']; // PDF, DOC, DOCX
  const maxSizeMB = 4; // Maximum file size in MB

  if (!allowedTypes.includes(file.type)) {
    showToast("Invalid file type! Only PDF, DOC, or DOCX allowed.");
    return;
  }

  if (file.size > maxSizeMB * 1024 * 1024) {
    showToast(`File is too large! Maximum size is ${maxSizeMB} MB.`);
    return;
  }

  showToast("Resume uploaded successfully!", 'success');
}


// Reset Assessment
function resetAssessment() {
  document.getElementById("resultSection").classList.add("d-none");
  document.getElementById("languageSection").classList.remove("d-none");

  // Reset variables
  selectedLanguages = [];
  quizQuestions = [];
  currentQuestionIndex = 0;
  userAnswers = [];

  // Reset UI
  document.querySelectorAll('.language-card').forEach(card => {
    const cb = card.querySelector('input[type="checkbox"]');
    cb.checked = false;
    card.classList.remove('active');
  });
}
