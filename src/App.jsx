

import './App.css';
import { useState, useEffect } from 'react';
import { spacebiologyData } from './knowledgeEngine';
import { SpaceBiologyAI } from './aiEngine';
import ForceGraph2D from 'force-graph';


function getDecade(year) {
  if (year >= 2020) return '2020s';
  if (year >= 2010) return '2010s';
  if (year >= 2000) return '2000s';
  if (year >= 1990) return '1990s';
  return 'Earlier';
}

function App() {
  const [search, setSearch] = useState('');
  const [decade, setDecade] = useState('All Years');
  const [category, setCategory] = useState('All Categories');
  const [selected, setSelected] = useState(null);
  const [aiEngine, setAiEngine] = useState(null);
  const [insights, setInsights] = useState(null);
  const [relatedPubs, setRelatedPubs] = useState([]);

  // Initialize AI engine
  useEffect(() => {
    const engine = new SpaceBiologyAI(spacebiologyData);
    setAiEngine(engine);
    setInsights(engine.generateInsights(spacebiologyData.publications));
  }, []);

  const publications = spacebiologyData.publications;

  const filtered = publications.filter(pub => {
    const matchSearch = aiEngine ? 
      aiEngine.smartSearch(search, [pub]).length > 0 || search === '' :
      pub.title.toLowerCase().includes(search.toLowerCase()) ||
      pub.authors.join(' ').toLowerCase().includes(search.toLowerCase()) ||
      pub.keywords.join(' ').toLowerCase().includes(search.toLowerCase()) ||
      pub.abstract.toLowerCase().includes(search.toLowerCase());
    
    const matchDecade = decade === 'All Years' || getDecade(pub.year) === decade;
    const matchCategory = category === 'All Categories' || pub.category === category;
    
    return matchSearch && matchDecade && matchCategory;
  });

  const selectedPub = selected ? publications.find(p => p.id === selected) : filtered[0];

  // Update related publications when selection changes
  useEffect(() => {
    if (aiEngine && selectedPub) {
      const related = aiEngine.findRelatedPublications(selectedPub.id);
      setRelatedPubs(related);
    }
  }, [selectedPub, aiEngine]);

  const getGraphData = () => {
    if (!selectedPub) return { nodes: [], links: [] };
    
    // Create nodes for publication, experiment, results, and keywords
    const nodes = [
      { 
        id: 'publication', 
        name: selectedPub.title.substring(0, 20) + '...', 
        group: 1,
        size: 15 
      },
      { 
        id: 'experiment', 
        name: 'Experiment', 
        group: 2,
        size: 12 
      },
      { 
        id: 'results', 
        name: 'Results', 
        group: 3,
        size: 12 
      }
    ];
    
    // Add keyword nodes
    selectedPub.keywords.forEach((keyword, index) => {
      nodes.push({
        id: `keyword-${index}`,
        name: keyword,
        group: 4,
        size: 8
      });
    });
    
    // Create links
    const links = [
      { source: 'publication', target: 'experiment', value: 1 },
      { source: 'publication', target: 'results', value: 1 }
    ];
    
    // Link keywords to publication
    selectedPub.keywords.forEach((keyword, index) => {
      links.push({
        source: 'publication',
        target: `keyword-${index}`,
        value: 0.5
      });
    });
    
    return { nodes, links };
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>🚀 Space Biology Knowledge Engine</h1>
        <p>Advanced AI-powered exploration of NASA bioscience research for the new era of human space exploration.</p>
        {insights && (
          <div style={{fontSize:'0.9rem',color:'#c7e6ff',marginTop:'1rem'}}>
            📊 {insights.totalPublications} Publications • 🏆 Avg {Math.round(insights.averageCitations)} Citations • 
            🧬 Top Research: {insights.topKeywords[0]?.[0]} ({insights.topKeywords[0]?.[1]} studies)
          </div>
        )}
      </header>
      
      <section className="dashboard-search">
        <input
          type="text"
          placeholder="🔍 Search publications, experiments, or topics..."
          className="dashboard-input"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select
          className="dashboard-select"
          value={decade}
          onChange={e => setDecade(e.target.value)}
        >
          <option>All Years</option>
          <option>2020s</option>
          <option>2010s</option>
          <option>2000s</option>
          <option>1990s</option>
        </select>
        <select
          className="dashboard-select"
          value={category}
          onChange={e => setCategory(e.target.value)}
        >
          <option>All Categories</option>
          {spacebiologyData.categories.map(cat => (
            <option key={cat}>{cat}</option>
          ))}
        </select>
      </section>
      <main className="dashboard-main">
        <div className="dashboard-summary">
          <h2>🤖 AI Analysis</h2>
          <div className="dashboard-summary-content">
            {selectedPub ? (
              <>
                <h3 style={{color:'#7ecfff'}}>{selectedPub.title}</h3>
                <div style={{display:'flex',gap:'0.5rem',marginBottom:'1rem',flexWrap:'wrap'}}>
                  <span style={{background:'#7ecfff',color:'#0b1e3f',padding:'0.2rem 0.5rem',borderRadius:'8px',fontSize:'0.8rem'}}>
                    {selectedPub.category}
                  </span>
                  <span style={{background:'#ffb347',color:'#0b1e3f',padding:'0.2rem 0.5rem',borderRadius:'8px',fontSize:'0.8rem'}}>
                    {selectedPub.year}
                  </span>
                  <span style={{background:'#b4ffb3',color:'#0b1e3f',padding:'0.2rem 0.5rem',borderRadius:'8px',fontSize:'0.8rem'}}>
                    📖 {selectedPub.citations} citations
                  </span>
                </div>
                <div style={{background:'rgba(255,255,255,0.1)',padding:'1rem',borderRadius:'8px',marginBottom:'1rem'}}>
                  <p><strong>🧠 AI Summary:</strong></p>
                  <p style={{fontStyle:'italic',lineHeight:'1.5'}}>
                    {aiEngine ? aiEngine.generateAISummary(selectedPub) : selectedPub.abstract}
                  </p>
                </div>
                <p><strong>👥 Authors:</strong> {selectedPub.authors.join(', ')}</p>
                <p><strong>🔬 Experiment:</strong> {selectedPub.experiment}</p>
                <p><strong>📊 Key Results:</strong> {selectedPub.results}</p>
                <p><strong>🎯 Impact Areas:</strong> {selectedPub.impacts?.join(', ')}</p>
                <p><strong>🏷️ Keywords:</strong> {selectedPub.keywords.join(', ')}</p>
                {selectedPub.doi && (
                  <p><strong>📄 DOI:</strong> <span style={{color:'#7ecfff'}}>{selectedPub.doi}</span></p>
                )}
              </>
            ) : (
              <p><em>No publication selected. Choose from the list below.</em></p>
            )}
          </div>
        </div>
        <div className="dashboard-graph">
          <h2>🕸️ Knowledge Graph</h2>
          <div className="dashboard-graph-placeholder" style={{height:'320px',background:'rgba(126,207,255,0.04)',border:'2px dashed #7ecfff44',borderRadius:'12px',padding:'1rem',overflow:'auto'}}>
            {selectedPub ? (
              <div style={{textAlign:'center'}}>
                <h4 style={{color:'#7ecfff',marginBottom:'1rem'}}>Research Connections</h4>
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'1rem'}}>
                  <div style={{
                    background:'#7ecfff',
                    color:'#0b1e3f',
                    padding:'0.8rem 1.2rem',
                    borderRadius:'25px',
                    fontSize:'0.9rem',
                    fontWeight:'bold',
                    maxWidth:'90%',
                    textAlign:'center',
                    boxShadow:'0 4px 8px rgba(126,207,255,0.3)'
                  }}>
                    📊 {selectedPub.title}
                  </div>
                  
                  <div style={{display:'flex',gap:'1rem',flexWrap:'wrap',justifyContent:'center'}}>
                    <div style={{
                      background:'#ffb347',
                      color:'#0b1e3f',
                      padding:'0.5rem 1rem',
                      borderRadius:'18px',
                      fontSize:'0.8rem',
                      boxShadow:'0 2px 4px rgba(255,179,71,0.3)'
                    }}>
                      🔬 {selectedPub.category}
                    </div>
                    <div style={{
                      background:'#b4ffb3',
                      color:'#0b1e3f',
                      padding:'0.5rem 1rem',
                      borderRadius:'18px',
                      fontSize:'0.8rem',
                      boxShadow:'0 2px 4px rgba(180,255,179,0.3)'
                    }}>
                      📅 {selectedPub.year}
                    </div>
                  </div>
                  
                  <div style={{display:'flex',gap:'0.5rem',flexWrap:'wrap',justifyContent:'center',maxWidth:'100%'}}>
                    {selectedPub.keywords.slice(0,5).map((keyword, index) => (
                      <div key={index} style={{
                        background:'linear-gradient(45deg, #e0f0ff, #c7e6ff)',
                        color:'#1a3a5d',
                        padding:'0.3rem 0.8rem',
                        borderRadius:'15px',
                        fontSize:'0.75rem',
                        border:'1px solid #7ecfff44'
                      }}>
                        🏷️ {keyword}
                      </div>
                    ))}
                  </div>
                  
                  {relatedPubs.length > 0 && (
                    <div style={{marginTop:'1rem',width:'100%'}}>
                      <h5 style={{color:'#7ecfff',margin:'0.5rem 0'}}>🔗 Related Studies</h5>
                      {relatedPubs.slice(0,3).map(pub => (
                        <div key={pub.id} style={{
                          background:'rgba(255,255,255,0.05)',
                          padding:'0.5rem',
                          margin:'0.3rem 0',
                          borderRadius:'8px',
                          fontSize:'0.8rem',
                          borderLeft:'3px solid #7ecfff'
                        }}>
                          {pub.title} ({pub.year})
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p style={{padding:'2em',color:'#c7e6ff'}}><em>🌐 Interactive knowledge graph visualization will appear here when you select a publication.</em></p>
            )}
          </div>
        </div>
        <div className="dashboard-list" style={{flexBasis:'100%',marginTop:'2rem'}}>
          <h2 style={{color:'#7ecfff',marginBottom:'1rem'}}>📚 Research Publications ({filtered.length})</h2>
          {search && aiEngine && (
            <div style={{textAlign:'center',marginBottom:'1rem',fontSize:'0.9rem',color:'#c7e6ff'}}>
              🔍 Smart search results ranked by relevance
            </div>
          )}
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',gap:'1rem',justifyContent:'center',padding:'0 1rem',maxWidth:'1200px',margin:'0 auto'}}>
            {filtered.length === 0 && <p style={{color:'#c7e6ff',gridColumn:'1/-1',textAlign:'center'}}>No publications found. Try adjusting your search criteria.</p>}
            {filtered.map(pub => (
              <div
                key={pub.id}
                className={`dashboard-list-item${selectedPub && pub.id === selectedPub.id ? ' selected' : ''}`}
                style={{
                  background:'#17325a',
                  borderRadius:'12px',
                  padding:'1.2rem',
                  cursor:'pointer',
                  border: pub.id === (selectedPub && selectedPub.id) ? '2px solid #7ecfff' : '2px solid transparent',
                  boxShadow: pub.id === (selectedPub && selectedPub.id) ? '0 4px 20px rgba(126,207,255,0.2)' : '0 2px 8px rgba(0,0,0,0.1)',
                  transition:'all 0.3s ease',
                  transform: pub.id === (selectedPub && selectedPub.id) ? 'translateY(-2px)' : 'translateY(0)',
                }}
                onClick={() => setSelected(pub.id)}
              >
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'0.5rem'}}>
                  <span style={{background:pub.category === 'Plant Biology' ? '#4CAF50' : pub.category === 'Human Physiology' ? '#FF9800' : pub.category === 'Microbiology' ? '#9C27B0' : '#2196F3',color:'white',padding:'0.2rem 0.5rem',borderRadius:'8px',fontSize:'0.7rem'}}>
                    {pub.category}
                  </span>
                  <span style={{color:'#7ecfff',fontSize:'0.8rem'}}>📖 {pub.citations}</span>
                </div>
                <h4 style={{margin:'0 0 0.8rem 0',color:'#7ecfff',fontSize:'1rem',lineHeight:'1.3'}}>{pub.title}</h4>
                <p style={{margin:'0 0 0.5rem 0',fontSize:'0.85rem',color:'#c7e6ff',lineHeight:'1.4'}}>{pub.authors.join(', ')}</p>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <p style={{margin:0,fontSize:'0.8rem',color:'#e0f0ff'}}>{pub.year}</p>
                  {pub.impacts && (
                    <span style={{fontSize:'0.7rem',color:'#ffb347'}}>🎯 {pub.impacts.length} impacts</span>
                  )}
                </div>
                <div style={{marginTop:'0.5rem',display:'flex',gap:'0.3rem',flexWrap:'wrap'}}>
                  {pub.keywords.slice(0,3).map((keyword, i) => (
                    <span key={i} style={{background:'rgba(126,207,255,0.2)',color:'#7ecfff',padding:'0.1rem 0.4rem',borderRadius:'6px',fontSize:'0.65rem'}}>
                      {keyword}
                    </span>
                  ))}
                  {pub.keywords.length > 3 && (
                    <span style={{color:'#c7e6ff',fontSize:'0.65rem'}}>+{pub.keywords.length - 3}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <footer className="dashboard-footer">
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'2rem',flexWrap:'wrap'}}>
          <p>© {new Date().getFullYear()} Space Biology Knowledge Engine</p>
          <div style={{fontSize:'0.8rem',color:'#c7e6ff'}}>
            🚀 Powered by AI • 🧬 {spacebiologyData.publications.length} Publications • 
            🔬 {spacebiologyData.categories.length} Research Areas
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
