import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Check } from 'lucide-react';
import { FOCUS_NOTES } from '../data/focusNotes';
import { useTasks } from '../context/TaskContext';

export default function FocusNotes() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { stats } = useTasks();

  const currentSlide = FOCUS_NOTES[currentSlideIndex];
  const totalSlides = FOCUS_NOTES.length;

  const handlePrev = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  }, [totalSlides]);

  const handleNext = useCallback(() => {
    setCurrentSlideIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  }, [totalSlides]);

  // Keyboard navigation support for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      handleNext();
    }
  };

  const renderIcon = (iconName) => {
    switch (iconName) {
      case 'check-circle':
      case 'check':
        return <Check size={16} className="card-icon-svg" aria-hidden="true" />;
      case 'clock':
        return <Clock size={16} className="card-icon-svg" aria-hidden="true" />;
      default:
        return <CheckCircle2 size={16} className="card-icon-svg" aria-hidden="true" />;
    }
  };

  return (
    <section
      className="focus-notes-banner"
      aria-roledescription="carousel"
      aria-label="Focus Notes"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="focus-notes-content">
        {/* Left Side: Header, Badge, Quote, and Indicators */}
        <div className="focus-notes-main">
          {/* Top Pill Badge */}
          <div className="focus-badge-wrapper">
            <span className="focus-badge">
              <span className="badge-text">{currentSlide.badge}</span>
              <span className="badge-separator">•</span>
              <span className="badge-number">{currentSlide.slideNumber}</span>
            </span>
            {/* Mobile Greeting Badge */}
            <span className="focus-badge-mobile">GOOD AFTERNOON</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="focus-text-block">
            <h2 className="focus-headline">{currentSlide.headline}</h2>
            <p className="focus-subtitle desktop-subtext">{currentSlide.subtitle}</p>
            {/* Mobile Subtext with dynamic in-progress tasks count */}
            <p className="focus-subtitle mobile-subtext">
              {stats.inProgress || 3} tasks waiting for your attention.
            </p>
          </div>

          {/* Segmented Slide Indicators */}
          <div
            className="carousel-indicators"
            role="tablist"
            aria-label="Slide indicators"
          >
            {FOCUS_NOTES.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                aria-selected={currentSlideIndex === index}
                aria-label={`Go to slide ${index + 1}: ${slide.headline}`}
                className={`indicator-bar ${currentSlideIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentSlideIndex(index)}
              />
            ))}
          </div>

          {/* Mobile Progress Bar */}
          <div className="mobile-progress-wrapper" aria-hidden="true">
            <div className="mobile-progress-track">
              <div
                className="mobile-progress-fill"
                style={{ width: `${currentSlide.progress}%` }}
              />
            </div>
            <span className="mobile-progress-label">{currentSlide.progress}%</span>
          </div>
        </div>

        {/* Right Side: Floating Preview Card & Navigation Arrows */}
        <div className="focus-notes-aside">
          {/* Floating Next Up / Status Card */}
          <div className="focus-floating-card">
            <div className="card-top-row">
              <div className="card-icon-box">
                {renderIcon(currentSlide.cardIcon)}
              </div>
              <div className="card-header-meta">
                <span className="card-badge-label">{currentSlide.cardBadge}</span>
                <h4 className="card-task-title">{currentSlide.cardTitle}</h4>
              </div>
            </div>

            <div className="card-progress-row">
              <div className="progress-bar-container">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${currentSlide.progress}%` }}
                />
              </div>
              <span className="progress-percentage">{currentSlide.progress}%</span>
            </div>
          </div>

          {/* Carousel Arrows */}
          <div className="carousel-controls" aria-label="Carousel navigation">
            <button
              type="button"
              className="carousel-btn prev-btn"
              onClick={handlePrev}
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="carousel-btn next-btn"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
