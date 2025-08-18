#!/usr/bin/env node

// Quiz Data Export Script
// Exports all quiz submissions to a CSV file for easy access

import { db } from '../server/db.js';
import { quizSubmissions } from '../shared/schema.js';
import fs from 'fs';
import path from 'path';

async function exportQuizData() {
  try {
    console.log('Fetching quiz data from database...');
    
    const data = await db.select().from(quizSubmissions).orderBy(quizSubmissions.createdAt.desc());
    
    if (data.length === 0) {
      console.log('No quiz data found.');
      return;
    }

    // CSV Headers
    const headers = [
      'Email',
      'Company Name', 
      'Quiz Score',
      'AI Readiness Level',
      'Date Submitted',
      'Q1 Wikipedia/Knowledge Graph',
      'Q2 Review Platforms',
      'Q3 Reddit Discussions',
      'Q4 Reddit Karma',
      'Q5 Review Engagement',
      'Q6 Media Coverage',
      'Q7 LinkedIn/Product Hunt',
      'Q8 Structured Data',
      'Q9 ChatGPT Visibility',
      'Q9 Gemini Visibility', 
      'Q9 Perplexity Visibility',
      'Q10 Google Rankings',
      'Knowledge Score',
      'Community Score',
      'Reviews Score',
      'Media Score',
      'LLM Score',
      'Primary Recommendations'
    ];

    // Convert data to CSV rows
    const csvRows = data.map(submission => {
      const responses = submission.responses;
      const breakdown = submission.breakdown;
      const recommendations = submission.recommendations?.slice(0, 3).join('; ') || '';

      return [
        submission.email,
        submission.companyName || '',
        submission.score,
        submission.level,
        new Date(submission.createdAt).toLocaleDateString(),
        responses.q1,
        responses.q2,
        responses.q3,
        responses.q4,
        responses.q5,
        responses.q6,
        responses.q7,
        responses.q8,
        responses.q9_chatgpt,
        responses.q9_gemini,
        responses.q9_perplexity,
        responses.q10,
        breakdown.knowledge,
        breakdown.community,
        breakdown.reviews,
        breakdown.media,
        breakdown.llm,
        recommendations
      ];
    });

    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    // Write to file
    const timestamp = new Date().toISOString().split('T')[0];
    const filename = `quiz-data-export-${timestamp}.csv`;
    const filepath = path.join(process.cwd(), filename);
    
    fs.writeFileSync(filepath, csvContent);
    
    console.log(`✅ Quiz data exported successfully!`);
    console.log(`📁 File: ${filename}`);
    console.log(`📊 Records: ${data.length} quiz submissions`);
    console.log(`📅 Export date: ${new Date().toLocaleString()}`);
    
    // Also create a always-current version
    const currentFilePath = path.join(process.cwd(), 'quiz-data-current.csv');
    fs.writeFileSync(currentFilePath, csvContent);
    console.log(`📋 Current data file: quiz-data-current.csv`);
    
  } catch (error) {
    console.error('❌ Error exporting quiz data:', error);
  }
}

// Run the export
exportQuizData();