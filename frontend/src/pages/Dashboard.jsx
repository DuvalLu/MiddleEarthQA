import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ title: "", question: "" });
  const [newAnswer, setNewAnswer] = useState("");
  const [showQuestionForm, setShowQuestionForm] = useState(false);

  const navigate = useNavigate();
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (!username) navigate("/");
    axios
      .get("https://middleearthqa-backend.onrender.com/api/categories")
      .then((res) => setCategories(res.data));
  }, [username, navigate]);

  useEffect(() => {
    if (selectedCategory) {
      setSelectedQuestion(null);
      setAnswers([]);
      axios
        .get(
          `https://middleearthqa-backend.onrender.com/api/questions/${selectedCategory.id}`,
        )
        .then((res) => setQuestions(res.data));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (selectedQuestion) {
      axios
        .get(
          `https://middleearthqa-backend.onrender.com/api/answers/${selectedQuestion.id}`,
        )
        .then((res) => setAnswers(res.data));
    }
  }, [selectedQuestion]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handlePostQuestion = async () => {
    if (!newQuestion.title || !newQuestion.question) return;
    await axios.post(
      "https://middleearthqa-backend.onrender.com/api/questions",
      {
        user_id: userId,
        category_id: selectedCategory.id,
        title: newQuestion.title,
        question: newQuestion.question,
      },
    );
    setNewQuestion({ title: "", question: "" });
    setShowQuestionForm(false);
    const res = await axios.get(
      `https://middleearthqa-backend.onrender.com/api/questions/${selectedCategory.id}`,
    );
    setQuestions(res.data);
  };

  const handlePostAnswer = async () => {
    if (!newAnswer) return;
    await axios.post("https://middleearthqa-backend.onrender.com/api/answers", {
      question_id: selectedQuestion.id,
      user_id: userId,
      answer: newAnswer,
    });
    setNewAnswer("");
    const res = await axios.get(
      `https://middleearthqa-backend.onrender.com/api/answers/${selectedQuestion.id}`,
    );
    setAnswers(res.data);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>⚔️ Middle-Earth Q&A</h1>
        <div style={styles.headerRight}>
          <span style={styles.welcomeText}>Welcome, {username}</span>
          <span style={styles.logout} onClick={handleLogout}>
            Logout
          </span>
        </div>
      </div>

      <div style={styles.body}>
        <div style={styles.sidebar}>
          <h3 style={styles.sidebarTitle}>Categories</h3>
          {categories.map((cat) => (
            <div
              key={cat.id}
              style={{
                ...styles.categoryItem,
                backgroundColor:
                  selectedCategory?.id === cat.id ? "#c9a84c" : "#0f3460",
                color: selectedCategory?.id === cat.id ? "#1a1a2e" : "#fff",
              }}
              onClick={() => {
                setSelectedCategory(cat);
                setShowQuestionForm(false);
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>

        <div style={styles.main}>
          {!selectedCategory && (
            <p style={styles.placeholder}>
              Select a category to view its questions
            </p>
          )}

          {selectedCategory && !selectedQuestion && (
            <>
              <div style={styles.categoryHeader}>
                <h2 style={styles.categoryTitle}>{selectedCategory.name}</h2>
                <button
                  style={styles.button}
                  onClick={() => setShowQuestionForm(!showQuestionForm)}
                >
                  {showQuestionForm ? "Cancel" : "+ Ask a Question"}
                </button>
              </div>

              {showQuestionForm && (
                <div style={styles.form}>
                  <input
                    style={styles.input}
                    type="text"
                    placeholder="Question title"
                    value={newQuestion.title}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, title: e.target.value })
                    }
                  />
                  <textarea
                    style={styles.textarea}
                    placeholder="Describe your question..."
                    value={newQuestion.question}
                    onChange={(e) =>
                      setNewQuestion({
                        ...newQuestion,
                        question: e.target.value,
                      })
                    }
                  />
                  <button style={styles.button} onClick={handlePostQuestion}>
                    Post Question
                  </button>
                </div>
              )}

              {questions.length === 0 ? (
                <p style={styles.placeholder}>
                  No questions yet. Be the first to ask!
                </p>
              ) : (
                questions.map((q) => (
                  <div
                    key={q.id}
                    style={styles.questionCard}
                    onClick={() => setSelectedQuestion(q)}
                  >
                    <h3 style={styles.questionTitle}>{q.title}</h3>
                    <p style={styles.questionMeta}>
                      Asked by {q.username} ·{" "}
                      {new Date(q.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </>
          )}

          {selectedQuestion && (
            <>
              <button
                style={styles.backButton}
                onClick={() => setSelectedQuestion(null)}
              >
                ← Back to Questions
              </button>
              <div style={styles.questionDetail}>
                <h2 style={styles.categoryTitle}>{selectedQuestion.title}</h2>
                <p style={styles.questionBody}>{selectedQuestion.question}</p>
                <p style={styles.questionMeta}>
                  Asked by {selectedQuestion.username} ·{" "}
                  {new Date(selectedQuestion.created_at).toLocaleDateString()}
                </p>
              </div>

              <h3 style={styles.answersTitle}>Answers ({answers.length})</h3>
              {answers.length === 0 ? (
                <p style={styles.placeholder}>
                  No answers yet. Share your wisdom!
                </p>
              ) : (
                answers.map((a) => (
                  <div key={a.id} style={styles.answerCard}>
                    <p style={styles.answerText}>{a.answer}</p>
                    <p style={styles.questionMeta}>
                      Answered by {a.username} ·{" "}
                      {new Date(a.created_at).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}

              <div style={styles.form}>
                <textarea
                  style={styles.textarea}
                  placeholder="Write your answer..."
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                />
                <button style={styles.button} onClick={handlePostAnswer}>
                  Post Answer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    backgroundColor: "#1a1a2e",
    color: "#fff",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 30px",
    backgroundColor: "#16213e",
    borderBottom: "2px solid #c9a84c",
  },
  title: { color: "#c9a84c", margin: 0, fontSize: "22px" },
  headerRight: { display: "flex", alignItems: "center", gap: "20px" },
  welcomeText: { color: "#fff", fontSize: "14px" },
  logout: {
    color: "#c9a84c",
    cursor: "pointer",
    textDecoration: "underline",
    fontSize: "14px",
  },
  body: { display: "flex", flex: 1, overflow: "hidden" },
  sidebar: {
    width: "220px",
    backgroundColor: "#16213e",
    padding: "20px 10px",
    overflowY: "auto",
    borderRight: "2px solid #c9a84c",
  },
  sidebarTitle: { color: "#c9a84c", textAlign: "center", marginBottom: "15px" },
  categoryItem: {
    padding: "10px 15px",
    marginBottom: "8px",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },
  main: { flex: 1, padding: "30px", overflowY: "auto" },
  placeholder: {
    color: "#aaa",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: "50px",
  },
  categoryHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  },
  categoryTitle: { color: "#c9a84c", margin: 0 },
  button: {
    padding: "8px 16px",
    backgroundColor: "#c9a84c",
    color: "#1a1a2e",
    border: "none",
    borderRadius: "5px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  backButton: {
    padding: "6px 12px",
    backgroundColor: "transparent",
    color: "#c9a84c",
    border: "1px solid #c9a84c",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  questionCard: {
    backgroundColor: "#16213e",
    padding: "15px 20px",
    borderRadius: "8px",
    marginBottom: "12px",
    cursor: "pointer",
    borderLeft: "4px solid #c9a84c",
  },
  questionTitle: { color: "#fff", margin: "0 0 5px 0" },
  questionMeta: { color: "#aaa", fontSize: "12px", margin: 0 },
  questionDetail: {
    backgroundColor: "#16213e",
    padding: "20px",
    borderRadius: "8px",
    marginBottom: "20px",
    borderLeft: "4px solid #c9a84c",
  },
  questionBody: { color: "#ddd", margin: "10px 0" },
  answersTitle: { color: "#c9a84c", marginBottom: "15px" },
  answerCard: {
    backgroundColor: "#0f3460",
    padding: "15px 20px",
    borderRadius: "8px",
    marginBottom: "10px",
  },
  answerText: { color: "#fff", margin: "0 0 5px 0" },
  form: {
    backgroundColor: "#16213e",
    padding: "20px",
    borderRadius: "8px",
    marginTop: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #c9a84c",
    backgroundColor: "#0f3460",
    color: "#fff",
    fontSize: "14px",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #c9a84c",
    backgroundColor: "#0f3460",
    color: "#fff",
    fontSize: "14px",
    boxSizing: "border-box",
    minHeight: "100px",
    resize: "vertical",
  },
};

export default Dashboard;
