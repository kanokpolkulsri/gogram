import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getRandomEncouragement } from '../../data/mockData';
import { useUser, useUserDispatch } from '../../data/userStore';
import ProgressBar from '../../components/ProgressBar';
import Hearts from '../../components/Hearts';
import './QuizPage.css';

export default function QuizPage() {
  const { unitId, levelId } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const dispatch = useUserDispatch();

  const units = user.units || [];

  // Find the right unit and level
  const unit = units.find((u) => u.id === parseInt(unitId));
  const level = unit?.levels.find((l) => l.id === levelId);
  const questions = level?.questions || [];
  const totalQuestions = questions.length;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [score, setScore] = useState(0);
  const [encouragement, setEncouragement] = useState('');
  const [animating, setAnimating] = useState(false);
  const [showOutOfHearts, setShowOutOfHearts] = useState(false);
  const [firstAttempt, setFirstAttempt] = useState(true);

  const currentQuestion = questions[currentIndex];

  const handleSelect = (answer) => {
    if (isAnswered || user.hearts === 0) return;
    setSelectedAnswer(answer);
  };

  const handleCheck = useCallback(() => {
    if (!selectedAnswer || isAnswered) return;

    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      if (firstAttempt) {
        setCorrectStreak((s) => s + 1);
        setScore((s) => s + 1);
      }
      setEncouragement(getRandomEncouragement());
    } else {
      setCorrectStreak(0);
      setFirstAttempt(false);
      dispatch({ type: 'LOSE_HEART' });
      if (user.hearts - 1 <= 0) {
        setTimeout(() => setShowOutOfHearts(true), 800);
      }
    }
  }, [selectedAnswer, isAnswered, currentQuestion, dispatch, user.hearts, firstAttempt]);

  const handleContinue = useCallback(() => {
    if (!isCorrect) {
      // Stay on the same question, let them try again
      // We skip the full exit/enter animation since the question text remains the same,
      // letting the option buttons transition back to gray smoothly in place.
      setSelectedAnswer(null);
      setIsAnswered(false);
      setIsCorrect(false);
      setEncouragement('');
      return;
    }

    if (currentIndex + 1 >= totalQuestions) {
      // Lesson complete!
      const xp = level?.xpReward || 15;
      dispatch({
        type: 'COMPLETE_LESSON',
        unitId: parseInt(unitId),
        levelId,
        xp,
      });
      navigate('/lesson-complete', {
        state: { score, total: totalQuestions, xp },
      });
    } else {
      setAnimating(true);
      setTimeout(() => {
        setCurrentIndex((i) => i + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setIsCorrect(false);
        setFirstAttempt(true);
        setEncouragement('');
        setAnimating(false);
      }, 300);
    }
  }, [currentIndex, totalQuestions, level, unitId, levelId, score, dispatch, navigate, isCorrect]);

  const handleClose = () => {
    if (unit && unit.category) {
      navigate(`/learn/${unit.category}`);
    } else {
      navigate('/learn');
    }
  };

  const handleOutOfHeartsBack = () => {
    dispatch({ type: 'RESET_HEARTS' });
    if (unit && unit.category) {
      navigate(`/learn/${unit.category}`);
    } else {
      navigate('/learn');
    }
  };

  // Handle keyboard enter for check/continue
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Enter') {
        if (isAnswered) handleContinue();
        else handleCheck();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isAnswered, handleCheck, handleContinue]);

  if (!unit || !level) {
    return (
      <div className="quiz-page quiz-error">
        <p>Lesson not found!</p>
        <button className="btn btn-primary" onClick={() => navigate('/learn')}>
          Back to Learn
        </button>
      </div>
    );
  }

  return (
    <div className="quiz-page" id="quiz-page">
      {/* Top Bar */}
      <div className="quiz-top-bar">
        <button className="quiz-close-btn" onClick={handleClose} id="quiz-close" aria-label="Close quiz">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#AFAFAF">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
        </button>
        <div className="quiz-progress-wrapper">
          {correctStreak > 0 && (
            <span className="quiz-streak-badge">{correctStreak} IN A ROW</span>
          )}
          <ProgressBar current={currentIndex + (isAnswered && isCorrect ? 1 : 0)} total={totalQuestions} />
        </div>
        <Hearts count={user.hearts} />
      </div>

      {/* Question */}
      <div className={`quiz-content ${animating ? 'quiz-content-exit' : 'quiz-content-enter'}`}>
        <h2 className="quiz-question" id="quiz-question">{currentQuestion?.question}</h2>

        {/* Options */}
        <div className="quiz-options">
          {currentQuestion?.options.map((option, index) => {
            let optionClass = 'quiz-option';
            if (selectedAnswer === option && !isAnswered) {
              optionClass += ' selected';
            }
            if (isAnswered && option === currentQuestion.correctAnswer) {
              optionClass += ' correct';
            }
            if (isAnswered && selectedAnswer === option && !isCorrect) {
              optionClass += ' wrong';
            }

            return (
              <button
                key={index}
                className={optionClass}
                onClick={() => handleSelect(option)}
                disabled={isAnswered || user.hearts === 0}
                id={`quiz-option-${index}`}
              >
                <span className="quiz-option-number">{index + 1}</span>
                <span className="quiz-option-text">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom area: Check button or Feedback */}
      {!isAnswered ? (
        <div className="quiz-bottom">
          {user.hearts === 0 && (
            <div className="quiz-no-hearts-warning" style={{ color: 'var(--color-red)', fontWeight: 800, textAlign: 'center', marginBottom: '16px' }}>
              ❤️ No hearts left! Practice or visit the shop to get more.
            </div>
          )}
          <button
            className={`btn ${selectedAnswer && user.hearts > 0 ? 'btn-primary' : 'btn-disabled'}`}
            onClick={handleCheck}
            disabled={!selectedAnswer || user.hearts === 0}
            id="quiz-check-btn"
          >
            CHECK
          </button>
        </div>
      ) : (
        <div className={`quiz-feedback ${isCorrect ? 'quiz-feedback-correct' : 'quiz-feedback-wrong'}`}>
          <div className="quiz-feedback-header">
            <span className="quiz-feedback-text">
              {isCorrect ? encouragement : `Correct answer: ${currentQuestion.correctAnswer}`}
            </span>
            {isCorrect && (
              <svg width="24" height="24" viewBox="0 0 24 24" fill={isCorrect ? 'var(--color-green)' : 'var(--color-red)'} className="quiz-feedback-icon">
                <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z"/>
              </svg>
            )}
          </div>
          <button
            className={`btn ${isCorrect ? 'btn-primary' : 'quiz-btn-wrong'}`}
            onClick={handleContinue}
            id="quiz-continue-btn"
          >
            CONTINUE
          </button>
        </div>
      )}

      {/* Out of Hearts Modal */}
      {showOutOfHearts && (
        <div className="quiz-modal-overlay">
          <div className="quiz-modal">
            <div className="quiz-modal-hearts">
              <svg width="60" height="60" viewBox="0 0 24 24" fill="#E5E5E5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h3>You ran out of hearts!</h3>
            <p>Practice more to earn hearts back.</p>
            <button className="btn btn-primary" onClick={handleOutOfHeartsBack} id="quiz-back-btn">
              BACK TO LEARN
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
