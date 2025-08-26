// AI Knowledge Processing Engine
export class SpaceBiologyAI {
  constructor(data) {
    this.data = data;
    this.relationshipGraph = this.buildRelationshipGraph();
  }

  // Build knowledge graph relationships
  buildRelationshipGraph() {
    const graph = {
      nodes: new Map(),
      edges: []
    };

    // Add publication nodes
    this.data.publications.forEach(pub => {
      graph.nodes.set(pub.id, {
        id: pub.id,
        type: 'publication',
        title: pub.title,
        category: pub.category,
        year: pub.year,
        citations: pub.citations
      });
    });

    // Add category nodes
    this.data.categories.forEach(cat => {
      graph.nodes.set(`cat-${cat}`, {
        id: `cat-${cat}`,
        type: 'category',
        name: cat
      });
    });

    // Add keyword nodes and relationships
    this.data.publications.forEach(pub => {
      // Link to category
      graph.edges.push({
        source: pub.id,
        target: `cat-${pub.category}`,
        type: 'belongs_to'
      });

      // Link related experiments
      pub.relatedExperiments?.forEach(relId => {
        graph.edges.push({
          source: pub.id,
          target: relId,
          type: 'related_to'
        });
      });
    });

    return graph;
  }

  // Generate AI summary for a publication
  generateAISummary(publication) {
    const templates = {
      'Plant Biology': `This ${publication.year} study on ${publication.title.toLowerCase()} represents a breakthrough in space agriculture research. The experiment involved ${publication.experiment.toLowerCase()} Key findings include ${publication.results.toLowerCase()} This research has significant implications for ${publication.impacts.join(', ')}, making it crucial for future Mars missions where sustainable food production will be essential.`,
      
      'Human Physiology': `A critical ${publication.year} investigation into ${publication.title.toLowerCase()} reveals important health challenges for long-duration spaceflight. Researchers conducted ${publication.experiment.toLowerCase()} The study found that ${publication.results.toLowerCase()} These findings are vital for ${publication.impacts.join(', ')}, highlighting the need for advanced countermeasures in future deep space exploration.`,
      
      'Microbiology': `This ${publication.year} microbiological study examines ${publication.title.toLowerCase()}, addressing critical spacecraft safety concerns. The research methodology included ${publication.experiment.toLowerCase()} Results demonstrated that ${publication.results.toLowerCase()} The implications for ${publication.impacts.join(', ')} are significant for maintaining crew health during extended missions.`,
      
      'Radiation Biology': `A comprehensive ${publication.year} analysis of ${publication.title.toLowerCase()} addresses one of the most serious challenges in space exploration. Scientists performed ${publication.experiment.toLowerCase()} The research revealed that ${publication.results.toLowerCase()} These findings are essential for ${publication.impacts.join(', ')}, particularly for missions beyond Earth's magnetosphere.`
    };

    return templates[publication.category] || `This ${publication.year} study investigates ${publication.title.toLowerCase()}. The research involved ${publication.experiment} and found that ${publication.results}`;
  }

  // Find related publications using AI-like analysis
  findRelatedPublications(publicationId, limit = 3) {
    const target = this.data.publications.find(p => p.id === publicationId);
    if (!target) return [];

    return this.data.publications
      .filter(p => p.id !== publicationId)
      .map(pub => ({
        ...pub,
        similarity: this.calculateSimilarity(target, pub)
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);
  }

  // Calculate similarity between publications
  calculateSimilarity(pub1, pub2) {
    let score = 0;
    
    // Category match
    if (pub1.category === pub2.category) score += 0.4;
    
    // Keyword overlap
    const keywords1 = pub1.keywords.map(k => k.toLowerCase());
    const keywords2 = pub2.keywords.map(k => k.toLowerCase());
    const intersection = keywords1.filter(k => keywords2.includes(k));
    score += (intersection.length / Math.max(keywords1.length, keywords2.length)) * 0.3;
    
    // Year proximity
    const yearDiff = Math.abs(pub1.year - pub2.year);
    score += (1 - yearDiff / 10) * 0.2;
    
    // Related experiments
    if (pub1.relatedExperiments?.includes(pub2.id) || pub2.relatedExperiments?.includes(pub1.id)) {
      score += 0.3;
    }

    return score;
  }

  // Generate research insights
  generateInsights(publications) {
    const categories = {};
    const yearTrends = {};
    const topKeywords = {};

    publications.forEach(pub => {
      // Category analysis
      categories[pub.category] = (categories[pub.category] || 0) + 1;
      
      // Year trends
      yearTrends[pub.year] = (yearTrends[pub.year] || 0) + 1;
      
      // Keyword frequency
      pub.keywords.forEach(keyword => {
        topKeywords[keyword] = (topKeywords[keyword] || 0) + 1;
      });
    });

    return {
      categories,
      yearTrends,
      topKeywords: Object.entries(topKeywords)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 10),
      totalPublications: publications.length,
      averageCitations: publications.reduce((sum, pub) => sum + pub.citations, 0) / publications.length
    };
  }

  // Search with AI-powered ranking
  smartSearch(query, publications) {
    const normalizedQuery = query.toLowerCase();
    const terms = normalizedQuery.split(' ');

    return publications
      .map(pub => ({
        ...pub,
        relevanceScore: this.calculateRelevance(pub, terms, normalizedQuery)
      }))
      .filter(pub => pub.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  calculateRelevance(publication, terms, fullQuery) {
    let score = 0;
    const text = `${publication.title} ${publication.abstract} ${publication.keywords.join(' ')} ${publication.authors.join(' ')}`.toLowerCase();

    // Exact phrase match
    if (text.includes(fullQuery)) score += 2;

    // Term matches with different weights
    terms.forEach(term => {
      if (publication.title.toLowerCase().includes(term)) score += 1.5;
      if (publication.keywords.some(k => k.toLowerCase().includes(term))) score += 1.2;
      if (publication.abstract.toLowerCase().includes(term)) score += 0.8;
      if (publication.authors.some(a => a.toLowerCase().includes(term))) score += 0.5;
    });

    // Boost recent publications slightly
    if (publication.year >= 2020) score += 0.2;

    // Boost high-citation publications
    score += Math.min(publication.citations / 100, 0.5);

    return score;
  }
}
