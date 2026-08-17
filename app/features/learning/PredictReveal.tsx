"use client";

import { useId, useState } from "react";

export interface PredictRevealOption {
  readonly id: string;
  readonly label: string;
}

/**
 * The "recall" half of the Recognition, then recall principle
 * (see `docs/project-charter.md` and RFC-0003). Hides one upcoming anchor and
 * asks the learner to guess it before the surrounding content reveals it.
 * Never blocks progress: the reveal button always works even without a guess.
 */
export default function PredictReveal({
  prompt,
  options,
  correctId,
  explanation,
  guessPrompt,
  revealLabel,
  correctFeedback,
  incorrectFeedback,
  onAnswered,
}: {
  readonly prompt: string;
  readonly options: readonly PredictRevealOption[];
  readonly correctId: string;
  readonly explanation?: string;
  readonly guessPrompt: string;
  readonly revealLabel: string;
  readonly correctFeedback: string;
  readonly incorrectFeedback: (correctLabel: string) => string;
  readonly onAnswered?: (correct: boolean) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const groupId = useId();
  const correctLabel = options.find((option) => option.id === correctId)?.label ?? correctId;

  const choose = (optionId: string) => {
    if (revealed) return;
    setSelectedId(optionId);
    setRevealed(true);
    onAnswered?.(optionId === correctId);
  };

  const reveal = () => {
    if (revealed) return;
    setRevealed(true);
    onAnswered?.(false);
  };

  return (
    <div className="predict-checkpoint" role="group" aria-labelledby={groupId}>
      <p className="predict-checkpoint-prompt" id={groupId}>
        <span className="predict-checkpoint-eyebrow">{guessPrompt}</span> {prompt}
      </p>
      <div className="predict-checkpoint-options">
        {options.map((option) => {
          const isSelected = selectedId === option.id;
          const isCorrectOption = revealed && option.id === correctId;
          return (
            <button
              key={option.id}
              type="button"
              aria-pressed={isSelected}
              className={
                revealed
                  ? isCorrectOption
                    ? "is-correct"
                    : isSelected
                      ? "is-incorrect"
                      : ""
                  : ""
              }
              onClick={() => choose(option.id)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {!revealed && (
        <button type="button" className="predict-checkpoint-reveal" onClick={reveal}>
          {revealLabel}
        </button>
      )}
      {revealed && (
        <p className="predict-checkpoint-feedback" role="status">
          {selectedId === correctId ? correctFeedback : incorrectFeedback(correctLabel)}
          {explanation ? ` ${explanation}` : ""}
        </p>
      )}
    </div>
  );
}
