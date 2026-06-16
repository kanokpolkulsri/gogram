import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../data/userStore';
import { Category3DIcon } from './icons';
import Hearts from './Hearts';
import './LearnHeader.css';

export default function LearnHeader() {
  const user = useUser();
  const navigate = useNavigate();
  const { categoryId } = useParams();

  const studyCategories = user.categories || [];
  const units = user.units || [];

  // Load the active category from the parameter, defaulting to last studied or 'grammar-foundation'
  const activeCategoryId = categoryId || user.lastCategoryId || 'grammar-foundation';
  const categoryInfo = studyCategories.find((c) => c.id === activeCategoryId) || (studyCategories.length > 0 ? studyCategories[0] : null);

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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="learn-header-back-arrow">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          <Category3DIcon letter={categoryInfo.iconChar} color={categoryInfo.color} size={32} />
        </div>

        {/* Level & Hearts on the rightmost */}
        <div className="learn-header-right" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="learn-header-streak" title="Level">
            <svg width="24" height="24" viewBox="0 0 48 48" fill="none" className="level-icon" style={{ flexShrink: 0 }}>
              <path
                d="M24 4L8 8v14c0 10.4 6.8 20.1 16 22 9.2-1.9 16-11.6 16-22V8L24 4z"
                fill="#FFC800"
              />
              <path d="M24 4L24 44c9.2-1.9 16-11.6 16-22V8L24 4z" fill="#FF9600" opacity="0.15" />
              <path d="M24 10L14 12v10c0 7 4.2 13.5 10 16V10z" fill="#FFE57F" opacity="0.4" />
            </svg>
            <span className="learn-header-streak-val">LV. {userLevel}</span>
          </div>
          <Hearts count={user.hearts} />
        </div>
      </div>
    </header>
  );
}
