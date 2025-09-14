const localBank = {
  politics: [
    { q: "Who is the current Prime Minister of India?", o: ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Manmohan Singh"], a: "Narendra Modi" },
    { q: "Who is the current President of India (2025)?", o: ["Droupadi Murmu", "Pratibha Patil", "Ram Nath Kovind", "A.P.J Abdul Kalam"], a: "Droupadi Murmu" },
    { q: "Which Article of the Constitution guarantees Right to Equality?", o: ["Article 14", "Article 21", "Article 19", "Article 370"], a: "Article 14" },
    { q: "Who appoints the Chief Election Commissioner of India?", o: ["Prime Minister", "President", "Parliament", "Supreme Court"], a: "President" },
    { q: "How many seats are there in the Rajya Sabha?", o: ["250", "245", "545", "300"], a: "245" },
    { q: "Which body conducts elections in India?", o: ["Election Commission", "Supreme Court", "CAG", "Lok Sabha"], a: "Election Commission" },
    { q: "Which party is symbolized by the Lotus?", o: ["INC", "BJP", "AAP", "CPI"], a: "BJP" },
    { q: "Which party uses the Hand symbol?", o: ["INC", "BJP", "AAP", "SP"], a: "INC" },
    { q: "In which year did India adopt its Constitution?", o: ["1950", "1947", "1949", "1952"], a: "1950" },
    { q: "Who is the first woman Prime Minister of India?", o: ["Indira Gandhi", "Sonia Gandhi", "Pratibha Patil", "Droupadi Murmu"], a: "Indira Gandhi" },
    { q: "How long is the term of Lok Sabha?", o: ["5 years", "4 years", "6 years", "7 years"], a: "5 years" },
    { q: "Which house is called the 'Upper House' of Parliament?", o: ["Lok Sabha", "Rajya Sabha", "Vidhan Sabha", "Gram Sabha"], a: "Rajya Sabha" },
    { q: "Which Indian leader is known as 'Father of the Nation'?", o: ["Jawaharlal Nehru", "Mahatma Gandhi", "B.R. Ambedkar", "Subhas Chandra Bose"], a: "Mahatma Gandhi" },
    { q: "Who is known as the 'Missile Man of India'?", o: ["A.P.J. Abdul Kalam", "Vikram Sarabhai", "C.V. Raman", "Homi Bhabha"], a: "A.P.J. Abdul Kalam" },
    { q: "Which amendment lowered the voting age in India from 21 to 18?", o: ["61st Amendment", "42nd Amendment", "44th Amendment", "73rd Amendment"], a: "61st Amendment" }
  ],
  sports: [
    { q: "Which Indian cricketer is known as 'Captain Cool'?", o: ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Kapil Dev"], a: "MS Dhoni" },
    { q: "India won the 2011 Cricket World Cup by defeating which country?", o: ["Pakistan", "Australia", "Sri Lanka", "England"], a: "Sri Lanka" },
    { q: "Who was India’s first individual Olympic gold medalist?", o: ["Abhinav Bindra", "Milkha Singh", "Neeraj Chopra", "Sushil Kumar"], a: "Abhinav Bindra" },
    { q: "In which sport is PV Sindhu famous?", o: ["Tennis", "Badminton", "Table Tennis", "Squash"], a: "Badminton" },
    { q: "Who is the current captain of Indian Men’s Cricket Team (2025)?", o: ["Rohit Sharma", "KL Rahul", "MS Dhoni", "Virat Kohli"], a: "Rohit Sharma" },
    { q: "Which Indian city hosted the 2010 Commonwealth Games?", o: ["Delhi", "Mumbai", "Chennai", "Bengaluru"], a: "Delhi" },
    { q: "Who is known as the 'God of Cricket' in India?", o: ["Virat Kohli", "Kapil Dev", "Sachin Tendulkar", "MS Dhoni"], a: "Sachin Tendulkar" },
    { q: "Neeraj Chopra won Olympic gold in which sport?", o: ["Javelin Throw", "Shot Put", "Discus Throw", "High Jump"], a: "Javelin Throw" },
    { q: "Saina Nehwal is associated with which sport?", o: ["Badminton", "Tennis", "Hockey", "Shooting"], a: "Badminton" },
    { q: "Which Indian hosted Formula 1 races from 2011 to 2013?", o: ["Delhi", "Bengaluru", "Noida (Buddh Circuit)", "Chennai"], a: "Noida (Buddh Circuit)" },
    { q: "Which Indian footballer is called 'Captain Fantastic'?", o: ["Baichung Bhutia", "Sunil Chhetri", "Sandesh Jhingan", "Gurpreet Singh"], a: "Sunil Chhetri" },
    { q: "Who captained India in the 1983 Cricket World Cup win?", o: ["MS Dhoni", "Kapil Dev", "Sourav Ganguly", "Sunil Gavaskar"], a: "Kapil Dev" },
    { q: "Mirabai Chanu is associated with which sport?", o: ["Wrestling", "Weightlifting", "Boxing", "Archery"], a: "Weightlifting" },
    { q: "Who won the Gold in Wrestling at the 2018 Commonwealth Games?", o: ["Sushil Kumar", "Bajrang Punia", "Yogeshwar Dutt", "Sakshi Malik"], a: "Bajrang Punia" },
    { q: "Which Indian cricketer is called 'Hitman'?", o: ["Virat Kohli", "Rohit Sharma", "Shikhar Dhawan", "MS Dhoni"], a: "Rohit Sharma" }
  ]
};




let currentQuestions = [];
let currentIndex = 0;
let score = 0;

const categoryIds = {
  science: 17, // Science & Nature from Open Trivia DB
  math: 19     // Mathematics category
};

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function decodeHTML(html) {
  let txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function pickRandomQuestions(arr, n = 5) {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, n);
}

async function loadQuestions(category) {
  document.getElementById("home-container").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";

  if (category === "politics" || category === "sports") {
    currentQuestions = pickRandomQuestions(localBank[category], 5);
    startQuiz();
  } else {
    try {
      const url = `https://opentdb.com/api.php?amount=5&category=${categoryIds[category]}&difficulty=easy&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.results && data.results.length > 0) {
        currentQuestions = data.results.map(item => ({
          q: decodeHTML(item.question),
          o: shuffleArray([...item.incorrect_answers, item.correct_answer].map(decodeHTML)),
          a: decodeHTML(item.correct_answer)
        }));
      } else {
        currentQuestions = pickRandomQuestions(localBank[category], 5);
      }
    } catch (err) {
      currentQuestions = pickRandomQuestions(localBank[category], 5);
    }
    startQuiz();
  }
}

function startQuiz() {
  currentIndex = 0;
  score = 0;
  document.getElementById("result-box").innerHTML = "";
  document.getElementById("home-btn").style.display = "none";
  showQuestion();
}

function showQuestion() {
  let qObj = currentQuestions[currentIndex];
  document.getElementById("question").innerText = qObj.q;

  let optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  qObj.o.forEach(opt => {
    let btn = document.createElement("button");
    btn.innerText = opt;
    btn.className = "option-btn";
    btn.onclick = () => checkAnswer(btn, qObj.a);
    optionsDiv.appendChild(btn);
  });

  document.getElementById("next-btn").style.display = "none";
}

function checkAnswer(button, correct) {
  let allBtns = document.querySelectorAll(".option-btn");
  allBtns.forEach(b => {
    b.disabled = true;
    if (b.innerText === correct) {
      b.classList.add("correct");
    }
  });

  if (button.innerText === correct) {
    score++;
  } else {
    button.classList.add("wrong");
  }

  document.getElementById("next-btn").style.display = "inline-block";
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentQuestions.length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  document.getElementById("question").innerText = "";
  document.getElementById("options").innerHTML = "";
  document.getElementById("next-btn").style.display = "none";
  document.getElementById("result-box").innerText = `You scored ${score} out of ${currentQuestions.length}`;
  document.getElementById("home-btn").style.display = "inline-block";
}

function goHome() {
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("home-container").style.display = "block";
}
