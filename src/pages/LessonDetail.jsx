import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabase.js";

export default function LessonDetail() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    supabase
      .from("lessons")
      .select("*")
      .eq("id", lessonId)
      .single()
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setLesson(data);
      });

    supabase
      .from("questions")
      .select("*")
      .eq("lesson_id", lessonId)
      .then(({ data, error }) => {
        if (error) console.error(error);
        else setQuestions(data);
      });
  }, [lessonId]);

  if (!lesson) return <h2>جاري التحميل...</h2>;

  const handleAnswer = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correct_option) correct++;
    });
    setScore(correct);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h1>{lesson.title}</h1>

      <img
        src={lesson.image_url || "/images/default.png"}
        alt={lesson.title}
        style={{
          width: "100%",
          maxHeight: "300px",
          objectFit: "cover",
          borderRadius: "10px",
          marginBottom: "15px",
        }}
      />

      <a
        href={lesson.pdf_url}
        target="_blank"
        rel="noreferrer"
        style={{
          background: "blue",
          color: "white",
          padding: "10px 15px",
          borderRadius: "8px",
          display: "inline-block",
          marginBottom: "20px",
        }}
      >
        مشاهدة الفيديو
      </a>

      <h2>الاختبار</h2>

      {questions.map((q) => (
        <div
          key={q.id}
          style={{
            marginBottom: "20px",
            padding: "15px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <p style={{ fontWeight: "bold" }}>{q.question}</p>
          {q.options.map((opt, idx) => (
            <label key={idx} style={{ display: "block", marginBottom: "5px" }}>
              <input
                type="radio"
                name={q.id}
                value={opt}
                onChange={() => handleAnswer(q.id, opt)}
              />{" "}
              {opt}
            </label>
          ))}
        </div>
      ))}

      <button
        onClick={calculateScore}
        style={{
          background: "green",
          color: "white",
          padding: "10px 20px",
          borderRadius: "10px",
          fontSize: "16px",
        }}
      >
        إنهاء الاختبار
      </button>

      {score !== null && (
        <h2 style={{ marginTop: "20px" }}>
          نتيجتك: {score} من {questions.length}
        </h2>
      )}
    </div>
  );
}
