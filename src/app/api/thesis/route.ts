import { NextRequest, NextResponse } from 'next/server';
import { getAllTheses, createThesis, updateThesis, deleteThesis, getThesis } from '@/lib/db';
import { promises as fs } from 'fs';
import path from 'path';

const THESIS_DATA_FILE = path.resolve(process.cwd(), 'thesis-data.json');

// Roman numeral conversion function (same as admin panel)
const toRomanNumeral = (num: number): string => {
  if (num === 0) return ''
  
  const romanNumerals = [
    { value: 100, numeral: 'C' },
    { value: 90, numeral: 'XC' },
    { value: 50, numeral: 'L' },
    { value: 40, numeral: 'XL' },
    { value: 10, numeral: 'X' },
    { value: 9, numeral: 'IX' },
    { value: 5, numeral: 'V' },
    { value: 4, numeral: 'IV' },
    { value: 1, numeral: 'I' }
  ]
  
  let result = ''
  let remaining = num
  
  for (const { value, numeral } of romanNumerals) {
    while (remaining >= value) {
      result += numeral
      remaining -= value
    }
  }
  
  return result
}

// Initialize with simple default data if database is empty
const defaultThesisData = {
  "example": {
    title: "Example Thesis",
    industry: "Example Industry",
    publishDate: "2025-01-01",
    readTime: "10 min read",
    tags: ["Example", "Industry"],
    content: {
      executiveSummary: {
        title: "I. Executive Summary",
        content: ""
      },
      conclusion: {
        title: "II. Conclusion",
        content: ""
      },
      contact: {
        title: "III. Contact",
        content: {
          name: "",
          title: "",
          company: "",
          email: ""
        }
      },
      sources: {
        title: "IV. Sources",
        content: []
      }
    }
  }
}

export async function GET() {
  try {
    // First try to get data from database
    const data = await getAllTheses();
    
    // If database has data, return it
    if (data && Object.keys(data).length > 0) {
      return NextResponse.json(data);
    }
    
    // If database is empty or fails, fall back to JSON file
    console.log('Database empty or failed, falling back to JSON file');
    const file = await fs.readFile(THESIS_DATA_FILE, 'utf-8');
    const fileData = JSON.parse(file);
    return NextResponse.json(fileData);
    
  } catch (error) {
    console.error('Error fetching thesis data:', error);
    
    // Final fallback to JSON file
    try {
      const file = await fs.readFile(THESIS_DATA_FILE, 'utf-8');
      const fileData = JSON.parse(file);
      return NextResponse.json(fileData);
    } catch (fileError) {
      console.error('Error reading JSON file:', fileError);
      return NextResponse.json(defaultThesisData);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { thesisId, ...thesisData } = body;
    
    if (!thesisId) {
      return NextResponse.json({ error: 'Missing thesisId' }, { status: 400 });
    }

    const success = await createThesis(thesisId, thesisData);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to create thesis' }, { status: 500 });
    }
  } catch (e) {
    console.error('Error creating thesis:', e);
    return NextResponse.json({ error: 'Failed to create thesis' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { thesisId, section, content, thesisTitle, featured, live } = body;
    
    if (!thesisId) {
      return NextResponse.json({ error: 'Missing thesisId' }, { status: 400 });
    }

    // Get existing thesis data
    const existingThesis = await getThesis(thesisId);
    const thesisData = existingThesis || {
      title: '',
      industry: '',
      publishDate: '',
      readTime: '',
      tags: [],
      content: {},
      contact: null,
      sources: null,
      live: false
    };

    // Handle featured status update (special case)
    if (featured !== undefined) {
      // For now, we'll store featured status in the content object
      // since we don't have a featured column in the database
      if (!thesisData.content) {
        thesisData.content = {};
      }
      thesisData.content.featured = featured;
      
      const success = await updateThesis(thesisId, thesisData);
      if (success) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: 'Failed to update thesis' }, { status: 500 });
      }
    }

    // Handle live status update (special case)
    if (live !== undefined) {
      (thesisData as Record<string, unknown>).live = live;
      
      const success = await updateThesis(thesisId, thesisData);
      if (success) {
        return NextResponse.json({ success: true });
      } else {
        return NextResponse.json({ error: 'Failed to update thesis' }, { status: 500 });
      }
    }

    // Handle regular content updates
    if (!section || content === undefined) {
      return NextResponse.json({ error: 'Missing section or content' }, { status: 400 });
    }

    // Handle different section types
    if (section === 'title' || section === 'subtitle' || section === 'industry' || section === 'publishDate' || section === 'readTime' || section === 'category') {
      // Update top-level fields
      if (section === 'publishDate') {
        thesisData.publishDate = content;
      } else if (section === 'readTime') {
        thesisData.readTime = content;
      } else if (section === 'title') {
        thesisData.title = content;
      } else if (section === 'industry') {
        thesisData.industry = content;
      } else if (section === 'category') {
        // Store category in content object since we don't have a category column
        if (!thesisData.content) {
          thesisData.content = {};
        }
        thesisData.content.category = content;
      }
    } else if (section === 'tags') {
      // Update tags array
      thesisData.tags = Array.isArray(content) ? content : [content];
    } else if (section === 'contact' || section === 'sources') {
      // Update contact and sources as top-level fields
      if (section === 'contact') {
        thesisData.contact = content;
      } else if (section === 'sources') {
        thesisData.sources = content;
      }
      
      // Also update them in the content object if they exist there
      if (!thesisData.content) {
        thesisData.content = {};
      }
      
      // Calculate the correct Roman numeral based on existing sections
      const existingSections = Object.keys(thesisData.content || {})
        .map(key => {
          const sectionData = thesisData.content[key];
          const sectionTitle = typeof sectionData === 'object' && sectionData.title ? sectionData.title : key;
          const romanMatch = sectionTitle.match(/^([IVX]+)\./);
          const position = romanMatch ? 
            (romanMatch[1] === 'I' ? 1 : 
             romanMatch[1] === 'II' ? 2 : 
             romanMatch[1] === 'III' ? 3 : 
             romanMatch[1] === 'IV' ? 4 : 
             romanMatch[1] === 'V' ? 5 : 
             romanMatch[1] === 'VI' ? 6 : 
             romanMatch[1] === 'VII' ? 7 : 
             romanMatch[1] === 'VIII' ? 8 : 
             romanMatch[1] === 'IX' ? 9 : 
             romanMatch[1] === 'X' ? 10 : 
             romanMatch[1] === 'XI' ? 11 : 
             romanMatch[1] === 'XII' ? 12 : 
             romanMatch[1] === 'XIII' ? 13 : 
             romanMatch[1] === 'XIV' ? 14 : 
             romanMatch[1] === 'XV' ? 15 : 999) : 999;
          return { key, position };
        })
        .sort((a, b) => a.position - b.position);
      
      const maxPosition = existingSections.length > 0 ? Math.max(...existingSections.map(s => s.position)) : 0;
      const nextPosition = maxPosition + 1;
      const romanNumeral = toRomanNumeral(nextPosition);
      
      if (section === 'contact') {
        thesisData.content[section] = {
          title: `${romanNumeral}. Contact`,
          content: content
        };
      } else if (section === 'sources') {
        thesisData.content[section] = {
          title: `${romanNumeral}. Sources`,
          content: content
        };
      }
    } else if (section === 'content') {
      // Update entire content object (for adding new sections)
      thesisData.content = content;
    } else {
      // Update content sections
      if (!thesisData.content) {
        thesisData.content = {};
      }
      thesisData.content[section] = content;
    }

    // Update thesis title if provided
    if (thesisTitle) {
      thesisData.title = thesisTitle;
    }

    // Update the thesis in the database
    const success = await updateThesis(thesisId, thesisData);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to update thesis' }, { status: 500 });
    }
  } catch (e) {
    console.error('Error updating thesis:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { thesisId } = body;
    
    if (!thesisId) {
      return NextResponse.json({ error: 'Missing thesisId' }, { status: 400 });
    }

    // Delete the thesis from the database
    const success = await deleteThesis(thesisId);
    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Failed to delete thesis' }, { status: 500 });
    }
  } catch (e) {
    console.error('Error deleting thesis:', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 