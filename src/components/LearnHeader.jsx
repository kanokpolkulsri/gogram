import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../data/userStore';
import { studyCategories, units } from '../data/mockData';
import { Category3DIcon } from './icons';
import StreakFire from './StreakFire';
import './LearnHeader.css';

export default function LearnHeader() {
  const user = useUser();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  // Load the active category from the parameter, defaulting to last studied or 'grammar-foundation'
  const activeCategoryId = categoryId || user.lastCategoryId || 'grammar-foundation';
  const categoryInfo = studyCategories.find((c) => c.id === activeCategoryId) || studyCategories[0];

  // Calculate completed units count for this category
  const unitsForCat = units.filter(unit => unit.category === activeCategoryId);
  const completedUnitsCount = unitsForCat.filter(unit => 
    unit.levels.every(level => user.completedLessons.includes(`${unit.id}-${level.id}`))
  ).length;
  const userLevel = 1 + completedUnitsCount;

  return (
    <header
      className="learn-header mobile-only"
      id="learn-header"
    >
      <div className="learn-header-content animate-fade-in">
        {/* Clickable Back chevron, Category Name with 3D Icon */}
        <div 
          className="learn-header-category" 
          onClick={() => navigate('/dashboard')}
          title="Back to Categories"
        >
          <svg 
            className="learn-header-back-arrow" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <Category3DIcon letter={categoryInfo.iconChar} color={categoryInfo.color} size={32} />
          <span className="learn-header-category-name">{categoryInfo.title}</span>
        </div>

        {/* Level on the rightmost */}
        <div className="learn-header-streak" title="Level">
          <StreakFire size={30} active={true} customColor={categoryInfo.color} />
          <span className="learn-header-streak-val">LV. {userLevel}</span>
        </div>
      </div>
    </header>
  );
}
