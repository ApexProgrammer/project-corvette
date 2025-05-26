import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PageBackground from '../../components/PageBackground/PageBackground';
import Header from '../../components/Header/Header';
import GenerationHero from '../../components/GenerationHero/GenerationHero';
import GenerationNav from '../../components/GenerationNav/GenerationNav';
import ImageModal from '../../components/ImageModal/ImageModal';
import { useKeyboardNavigation } from '../../hooks/useKeyboardNavigation';
import { useTheme } from '../../contexts/ThemeContext';
import { getGeneration } from '../../utils/generationUtils';
import { themeColors } from '../../data/themeColors';
import MobileNav from '../../components/MobileNav/MobileNav';
import ScrollProgress from '../../components/ScrollProgress/ScrollProgress';
import BackToTop from '../../components/BackToTop/BackToTop';
import SectionNav from '../../components/SectionNav/SectionNav';
import './GenerationDetail.css';

function GenerationDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { selectedTheme, showThemeSelector, setShowThemeSelector, applyTheme } = useTheme();
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeSection, setActiveSection] = useState('specs');
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  const generation = getGeneration(id);
  useKeyboardNavigation(id);

  useEffect(() => {
    if (!generation) return;
    
    const imagesToPreload = [
      generation.hero?.image,
      ...(generation.yearlyChanges?.map(change => change?.image) || []),
      ...(generation.signatureModels?.map(model => model?.image) || []),
      ...(generation.gallery ? generation.gallery.map(item => item?.image) : [])
    ].filter(Boolean); // Filter out any undefined or null values
    
    let loadedCount = 0;
    const totalImages = imagesToPreload.length;
    
    const preloadImages = imagesToPreload.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / totalImages) * 100));
          resolve(src);
        };
        img.onerror = () => {
          loadedCount++;
          setLoadingProgress(Math.floor((loadedCount / totalImages) * 100));
          resolve(src); // Resolve anyway to not block other images
        };
      });
    });
    
    Promise.all(preloadImages)
      .then(() => {
        setImagesPreloaded(true);
        document.querySelectorAll('.preload-important').forEach(img => {
          img.setAttribute('fetchpriority', 'high');
        });
      })
      .catch(err => {
        console.error("Error preloading images:", err);
        setImagesPreloaded(true); // Continue anyway
      });
  }, [generation]);

  const sections = [
    { id: 'specs', label: 'Generation Overview' },
    { id: 'evolution', label: 'Evolution Timeline' },
    { id: 'signature-models', label: 'Signature Models' },
    { id: 'innovations', label: 'Technical Innovation' },
    { id: 'design', label: 'Design Story' },
    { id: 'cultural-impact', label: 'Cultural Impact' },
    { id: 'facts', label: 'Did You Know?' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'references', label: 'References' },
  ];

  if (!generation) {
    return <div>Generation not found</div>;
  }

  if (!imagesPreloaded) {
    return (
      <PageBackground overlay="linear-gradient(135deg, rgba(20, 20, 25, 0.95), rgba(30, 30, 35, 0.95))">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading Corvette Generation {id.toUpperCase()}... {loadingProgress}%</p>
        </div>
      </PageBackground>
    );
  }

  return (
    <PageBackground overlay="linear-gradient(135deg, rgba(20, 20, 25, 0.95), rgba(30, 30, 35, 0.95))">
      <ScrollProgress />
      <div className="generation-detail-container">
        <Header 
          themeColors={themeColors}
          selectedTheme={selectedTheme}
          onThemeChange={applyTheme}
          showThemeSelector={showThemeSelector}
          onToggleSelector={setShowThemeSelector}
        />
        
        <GenerationNav currentGeneration={id} />
        <MobileNav />
        <BackToTop />
        <GenerationHero generation={generation} />
        
        <SectionNav
          sections={sections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="generation-content">
          <section id="specs" className={`specs-section ${activeSection === 'specs' ? 'active' : ''}`}>
            <h2>Generation Overview</h2>
            <div className="specs-grid">
              <div className="spec-item">
                <span className="spec-label">Production</span>
                <span className="spec-value">{generation.specs.unitsProduced}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Years</span>
                <span className="spec-value">{generation.specs.productionYears}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Price Range</span>
                <span className="spec-value">{generation.specs.priceRange}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Top Engine</span>
                <span className="spec-value">{generation.specs.topEngine}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">0-60 Time</span>
                <span className="spec-value">{generation.specs.zeroToSixty}</span>
              </div>
              <div className="spec-item">
                <span className="spec-label">Leadership</span>
                <span className="spec-value">
                  {generation.specs.leadership.designer} (Designer)<br />
                  {generation.specs.leadership.chiefEngineer} (Chief Engineer)
                </span>
              </div>
            </div>
          </section>

          <section id="evolution" className={`evolution-section ${activeSection === 'evolution' ? 'active' : ''}`}>
            <h2>Evolution Timeline</h2>
            <div className="timeline">
              {generation.yearlyChanges.map((change, index) => (
                <div key={change.year} className="timeline-item">
                  <div className="timeline-image">
                    <img 
                      className="preload-important"
                      src={change.image} 
                      alt={`${change.year} Changes`}
                      loading={index < 2 ? "eager" : "lazy"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/800x600/1a1a1a/ffffff?text=${change.year}+${generation.gen}`;
                      }}
                    />
                  </div>
                  <div className="timeline-content">
                    <h3>{change.year}</h3>
                    <p>{change.changes}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="signature-models" className={`signature-models-section ${activeSection === 'signature-models' ? 'active' : ''}`}>
            <h2>Signature Models</h2>
            <div className="signature-models-grid">
              {generation.signatureModels.map((model, index) => (
                <div key={model.name} className="signature-model-card">
                  <div className="model-image">
                    <img 
                      className="preload-important"
                      src={model.image} 
                      alt={model.name}
                      loading={index < 2 ? "eager" : "lazy"}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/800x600/1a1a1a/ffffff?text=${model.name}`;
                      }}
                    />
                  </div>
                  <div className="model-content">
                    <h3>{model.name}</h3>
                    <p>{model.description}</p>
                    <div className="model-significance">{model.significance}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section id="innovations" className={`innovations-section ${activeSection === 'innovations' ? 'active' : ''}`}>
            <h2>Technical Innovation</h2>
            <div className="innovations-grid">
              <div className="innovations-category">
                <h3>Engine Innovations</h3>
                <div className="innovation-list">
                  {generation.innovations.engine.map(innovation => (
                    <div key={innovation.name} className="innovation-item">
                      <div className="innovation-header">
                        <h4>{innovation.name}</h4>
                        <span className="innovation-year">{innovation.year}</span>
                      </div>
                      <p>{innovation.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              {generation.innovations.chassis && (
                <div className="innovations-category">
                  <h3>Chassis Innovations</h3>
                  <div className="innovation-list">
                    {generation.innovations.chassis.map(innovation => (
                      <div key={innovation.name} className="innovation-item">
                        <div className="innovation-header">
                          <h4>{innovation.name}</h4>
                          <span className="innovation-year">{innovation.year}</span>
                        </div>
                        <p>{innovation.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          <section id="design" className={`design-section ${activeSection === 'design' ? 'active' : ''}`}>
            <h2>Design Story</h2>
            <div className="design-content">
              <div className="design-philosophy">
                <h3>Design Philosophy</h3>
                <p>{generation.design.philosophy}</p>
                <blockquote>
                  <p>{generation.design.quote}</p>
                  <cite>— {generation.design.designer}</cite>
                </blockquote>
              </div>
              <div className="design-details">
                <div className="influences">
                  <h3>Design Influences</h3>
                  <ul>
                    {generation.design.influences.map(influence => (
                      <li key={influence}>{influence}</li>
                    ))}
                  </ul>
                </div>
                <div className="key-features">
                  <h3>Key Features</h3>
                  <ul>
                    {generation.design.keyFeatures.map(feature => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section id="cultural-impact" className={`cultural-impact-section ${activeSection === 'cultural-impact' ? 'active' : ''}`}>
            <h2>Cultural Impact</h2>
            <div className="impact-grid">
              <div className="impact-category">
                <h3>Media Appearances</h3>
                {generation.culturalImpact.media.map(appearance => (
                  <div key={appearance.name} className="impact-item">
                    <h4>{appearance.name}</h4>
                    <p className="impact-year">{appearance.year}</p>
                    <p>{appearance.description}</p>
                  </div>
                ))}
              </div>
              <div className="impact-category">
                <h3>Racing Heritage</h3>
                {generation.culturalImpact.racing.map(race => (
                  <div key={`${race.event}-${race.year}`} className="impact-item">
                    <h4>{race.event}</h4>
                    <p className="impact-year">{race.year}</p>
                    <p>{race.achievement}</p>
                  </div>
                ))}
              </div>
              <div className="impact-category">
                <h3>Notable Owners</h3>
                {generation.culturalImpact.famousOwners.map(owner => (
                  <div key={`${owner.name}-${owner.year}`} className="impact-item">
                    <h4>{owner.name}</h4>
                    <p className="impact-year">{owner.year}</p>
                    <p>{owner.model}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section id="facts" className={`facts-section ${activeSection === 'facts' ? 'active' : ''}`}>
            <h2>Did You Know?</h2>
            <div className="facts-grid">
              {generation.facts.map(fact => (
                <div key={fact.title} className="fact-card">
                  <h3>{fact.title}</h3>
                  <p>{fact.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="gallery" className={`gallery-section ${activeSection === 'gallery' ? 'active' : ''}`}>
            <h2>Gallery</h2>
            <div className="gallery-grid">
              {generation.gallery && generation.gallery.map((item, index) => (
                <div 
                  key={index} 
                  className="gallery-item"
                  onClick={() => setSelectedImage(item)}
                >
                  <img 
                    loading={index < 4 ? "eager" : "lazy"}
                    src={item.image} 
                    alt={item.caption || `Gallery image ${index + 1}`}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/800x600/1a1a1a/ffffff?text=Gallery+${index + 1}`;
                    }}
                  />
                  {item.caption && <div className="image-caption">{item.caption}</div>}
                </div>
              ))}
            </div>
          </section>

          <section id="references" className={`references-section ${activeSection === 'references' ? 'active' : ''}`}>
            <h2>References</h2>
            <ul className="references-list">
              {generation.references && generation.references.map((ref, index) => (
                <li key={index} className="reference-item">
                  {ref.url ? (
                    <a href={ref.url} target="_blank" rel="noopener noreferrer">
                      {ref.citation}
                    </a>
                  ) : (
                    ref.citation
                  )}
                </li>
              ))}
            </ul>
          </section>

          <button 
            className="back-button"
            onClick={() => navigate('/')}
          >
            Back to Timeline
          </button>
        </div>

        {selectedImage && (
          <ImageModal
            image={selectedImage.image}
            caption={selectedImage.caption}
            year={selectedImage.year}
            onClose={() => setSelectedImage(null)}
          />
        )}
      </div>
    </PageBackground>
  );
}

export default GenerationDetail;