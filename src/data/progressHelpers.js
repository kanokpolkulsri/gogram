export function isLessonUnlocked(completedLessons, unitId, levelId, categoryUnits = []) {
  const levelOrder = ['easy', 'medium1', 'medium2', 'hard1', 'hard2'];
  const levelIndex = levelOrder.indexOf(levelId);

  // Default to units [1, 2, 3] if category list is empty
  const unitsList = categoryUnits.length > 0 ? categoryUnits : [{ id: 1 }, { id: 2 }, { id: 3 }];
  const unitIndex = unitsList.findIndex((u) => Number(u.id) === Number(unitId));

  if (unitIndex === -1) return false;

  // First unit, first level always unlocked
  if (unitIndex === 0 && levelIndex === 0) return true;

  if (levelIndex > 0) {
    // Previous level in same unit must be completed
    const prevLevel = levelOrder[levelIndex - 1];
    return completedLessons.includes(`${unitId}-${prevLevel}`);
  }

  if (unitIndex > 0) {
    // First level of next unit: last level of previous unit must be completed
    const prevUnit = unitsList[unitIndex - 1];
    return completedLessons.includes(`${prevUnit.id}-hard2`);
  }

  return false;
}

export function isLessonCompleted(completedLessons, unitId, levelId) {
  return completedLessons.includes(`${unitId}-${levelId}`);
}

export function getNextLesson(completedLessons, categoryUnits = []) {
  const levelOrder = ['easy', 'medium1', 'medium2', 'hard1', 'hard2'];
  const unitsList = categoryUnits.length > 0 ? categoryUnits : [{ id: 1 }, { id: 2 }, { id: 3 }];

  for (const unit of unitsList) {
    for (const levelId of levelOrder) {
      if (!completedLessons.includes(`${unit.id}-${levelId}`)) {
        return { unitId: unit.id, levelId };
      }
    }
  }
  return null; // All completed
}
