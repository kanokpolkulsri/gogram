import './ConversationChatView.css';

export default function ConversationChatView({ question }) {
  const dialogue = question?.dialogue || [];
  const targetIndex = question?.targetTurnIndex ?? -1;

  return (
    <div className="exam-script-body scrollbar" id="exam-script-body">
      {dialogue.map((turn, idx) => {
        const isTarget = idx === targetIndex;

        return (
          <div key={idx} className="exam-script-line" id={`exam-script-line-${idx}`}>
            <span className="exam-speaker-label">
              {turn.speaker || (idx % 2 === 0 ? 'A' : 'B')}:
            </span>

            {isTarget ? (
              <div className="exam-blank-box" id={`exam-blank-${idx}`}>
                <span className="exam-blank-line-placeholder">__________</span>
              </div>
            ) : (
              <span className="exam-dialogue-text">{turn.text}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}
