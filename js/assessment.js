 const questions = [
    {
      id: 1,
      category: 'Frontend Development',
      question: 'What is the Virtual DOM in React?',
      options: [
        'A copy of the real DOM kept in memory',
        'A JavaScript library for animations',
        'A database for storing UI components',
        'A CSS framework',
      ],
    },
    {
      id: 2,
      category: 'Frontend Development',
      question: 'Which CSS property is used to create flexible layouts?',
      options: ['display: flex', 'position: absolute', 'float: left', 'margin: auto'],
    },
    {
      id: 3,
      category: 'Backend Development',
      question: 'What does REST stand for in API design?',
      options: [
        'Representational State Transfer',
        'Remote Execution State Transfer',
        'Responsive Server Technology',
        'Real-time Exchange System Transfer',
      ],
    },
    {
      id: 4,
      category: 'Programming Logic',
      question: 'What is the time complexity of binary search?',
      options: ['O(log n)', 'O(n)', 'O(n²)', 'O(1)'],
    },
    {
      id: 5,
      category: 'Cloud & DevOps',
      question: 'What is Docker primarily used for?',
      options: [
        'Containerization of applications',
        'Database management',
        'Frontend testing',
        'Email services',
      ],
    },
  ];

  let currentIndex = 0;
  let answers = {}; 

  // DOM elements
  const startScreen = document.getElementById('startScreen');
  const questionScreen = document.getElementById('questionScreen');
  const currentQNumSpan = document.getElementById('currentQNum');
  const totalQNumSpan = document.getElementById('totalQNum');
  const progressPercentSpan = document.getElementById('progressPercent');
  const progressBar = document.getElementById('progressBar');
  const questionCategorySpan = document.getElementById('questionCategory');
  const questionTextH4 = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotIndicatorsDiv = document.getElementById('dotIndicators');

  function showQuestionScreen() {
    startScreen.style.display = 'none';
    questionScreen.style.display = 'block';
    totalQNumSpan.textContent = questions.length;
    renderQuestion();
    renderDots();
  }

  function renderQuestion() {
    const q = questions[currentIndex];
    questionCategorySpan.textContent = q.category;
    questionTextH4.textContent = q.question;
    currentQNumSpan.textContent = currentIndex + 1;
    const percent = Math.round(((currentIndex + 1) / questions.length) * 100);
    progressPercentSpan.textContent = percent + '%';
    progressBar.style.width = percent + '%';

    // generate options
    let html = '';
    q.options.forEach(opt => {
      const isSelected = answers[currentIndex] === opt;
      html += `
        <button class="question-option ${isSelected ? 'selected' : ''}" onclick="selectOption('${opt.replace(/'/g, "\\'")}')">
          <i class="fa-regular ${isSelected ? 'fa-circle-check text-primary' : 'fa-circle text-secondary'}"></i>
          <span class="fw-medium">${opt}</span>
        </button>
      `;
    });
    optionsContainer.innerHTML = html;

    // update prev/next buttons
    prevBtn.disabled = currentIndex === 0;
    if (answers[currentIndex]) {
      nextBtn.disabled = false;
    } else {
      nextBtn.disabled = true;
    }
    // change next button text if last
    if (currentIndex === questions.length - 1) {
      nextBtn.innerHTML = 'Finish <i class="fa-regular fa-arrow-right ms-1"></i>';
    } else {
      nextBtn.innerHTML = 'Next <i class="fa-regular fa-arrow-right ms-1"></i>';
    }

    // update dot indicators
    renderDots();
  }

  function selectOption(option) {
    answers[currentIndex] = option;
    renderQuestion(); // re-render to update selected style and enable next
  }

  function nextQuestion() {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderQuestion();
    } else {
      // finish assessment -> redirect to dashboard (simulate)
      window.location.href = 'dashboard.html'; 
    }
  }

  function prevQuestion() {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion();
    }
  }

  function renderDots() {
    let dotsHtml = '';
    for (let i = 0; i < questions.length; i++) {
      let dotClass = 'dot-indicator';
      if (i === currentIndex) dotClass += ' active';
      else if (answers[i]) dotClass += ' answered';
      dotsHtml += `<span class="${dotClass}"></span>`;
    }
    dotIndicatorsDiv.innerHTML = dotsHtml;
  }

  // Expose functions globally for onclick
  window.showQuestionScreen = showQuestionScreen;
  window.selectOption = selectOption;
  window.nextQuestion = nextQuestion;
  window.prevQuestion = prevQuestion;