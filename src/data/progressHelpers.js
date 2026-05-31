export function isLessonUnlocked(completedLessons, unitId, levelId) {
  const levelOrder = ['easy', 'medium1', 'medium2', 'hard1', 'hard2'];
  const levelIndex = levelOrder.indexOf(levelId);

  if (unitId === 1 && levelIndex === 0) return true; // First lesson always unlocked

  if (levelIndex > 0) {
    // Previous level in same unit must be completed
    const prevLevel = levelOrder[levelIndex - 1];
    return completedLessons.includes(`${unitId}-${prevLevel}`);
  }

  if (unitId > 1) {
    // First level of next unit: last level of previous unit must be completed
    return completedLessons.includes(`${unitId - 1}-hard2`);
  }

  return false;
}

export function isLessonCompleted(completedLessons, unitId, levelId) {
  return completedLessons.includes(`${unitId}-${levelId}`);
}

export function getNextLesson(completedLessons) {
  const levelOrder = ['easy', 'medium1', 'medium2', 'hard1', 'hard2'];
  const units = [1, 2, 3];

  for (const unitId of units) {
    for (const levelId of levelOrder) {
      if (!completedLessons.includes(`${unitId}-${levelId}`)) {
        return { unitId, levelId };
      }
    }
  }
  return null; // All completed
}
