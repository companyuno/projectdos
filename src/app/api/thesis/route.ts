import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

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

const THESIS_DATA_FILE = path.resolve(process.cwd(), 'thesis-data.json');

// Initialize with simple default data if file doesn't exist
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
    const file = await fs.readFile(THESIS_DATA_FILE, 'utf-8');
    const data = JSON.parse(file);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(defaultThesisData);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { thesisId, ...thesisData } = body;
    
    if (!thesisId) {
      return NextResponse.json({ error: 'Missing thesisId' }, { status: 400 });
    }

    // Read existing data
    let existingThesisData;
    try {
      const file = await fs.readFile(THESIS_DATA_FILE, 'utf-8');
      existingThesisData = JSON.parse(file);
    } catch (e) {
      existingThesisData = defaultThesisData;
    }

    // Create the new thesis with the provided data
    existingThesisData[thesisId] = thesisData;

    // Write back to file
    await fs.writeFile(THESIS_DATA_FILE, JSON.stringify(existingThesisData, null, 2));
    
    return NextResponse.json({ success: true, data: existingThesisData[thesisId] });
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { thesisId, section, content, thesisTitle, featured } = body;
    
    if (!thesisId) {
      return NextResponse.json({ error: 'Missing thesisId' }, { status: 400 });
    }

    // Handle featured status update (special case)
    if (featured !== undefined) {
      // Read existing data
      let thesisData;
      try {
        const file = await fs.readFile(THESIS_DATA_FILE, 'utf-8');
        thesisData = JSON.parse(file);
      } catch (e) {
        thesisData = defaultThesisData;
      }

      // Initialize thesis if it doesn't exist
      if (!thesisData[thesisId]) {
        thesisData[thesisId] = { content: {} };
      }

      // Update featured status
      thesisData[thesisId].featured = featured;

      // Write back to file
      await fs.writeFile(THESIS_DATA_FILE, JSON.stringify(thesisData, null, 2));
      
      return NextResponse.json({ success: true });
    }

    // Handle regular content updates
    if (!section || content === undefined) {
      return NextResponse.json({ error: 'Missing section or content' }, { status: 400 });
    }

    // Read existing data
    let thesisData;
    try {
      const file = await fs.readFile(THESIS_DATA_FILE, 'utf-8');
      thesisData = JSON.parse(file);
    } catch (e) {
      thesisData = defaultThesisData;
    }

    // Initialize thesis if it doesn't exist
    if (!thesisData[thesisId]) {
      thesisData[thesisId] = { content: {} };
    }

    // Handle different section types
    if (section === 'title' || section === 'subtitle' || section === 'industry' || section === 'publishDate' || section === 'readTime') {
      // Update top-level fields
      thesisData[thesisId][section] = content;
    } else if (section === 'tags') {
      // Update tags array
      thesisData[thesisId].tags = Array.isArray(content) ? content : [content];
    } else if (section === 'contact' || section === 'sources') {
      // Update contact and sources as top-level fields
      thesisData[thesisId][section] = content;
      
      // Also update them in the content object if they exist there
      if (!thesisData[thesisId].content) {
        thesisData[thesisId].content = {};
      }
      
      // Calculate the correct Roman numeral based on existing sections
      const existingSections = Object.keys(thesisData[thesisId].content || {})
        .map(key => {
          const sectionData = thesisData[thesisId].content[key];
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
        thesisData[thesisId].content[section] = {
          title: `${romanNumeral}. Contact`,
          content: content
        };
      } else if (section === 'sources') {
        thesisData[thesisId].content[section] = {
          title: `${romanNumeral}. Sources`,
          content: content
        };
      }
    } else if (section === 'content') {
      // Update entire content object (for adding new sections)
      thesisData[thesisId].content = content;
    } else {
      // Update content sections
      if (!thesisData[thesisId].content) {
        thesisData[thesisId].content = {};
      }
      thesisData[thesisId].content[section] = content;
    }

    // Update thesis title if provided
    if (thesisTitle) {
      thesisData[thesisId].title = thesisTitle;
    }

    // Write back to file
    await fs.writeFile(THESIS_DATA_FILE, JSON.stringify(thesisData, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (e) {
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

    // Read existing data
    let thesisData;
    try {
      const file = await fs.readFile(THESIS_DATA_FILE, 'utf-8');
      thesisData = JSON.parse(file);
    } catch (e) {
      thesisData = defaultThesisData;
    }

    // Delete the thesis
    if (thesisData[thesisId]) {
      delete thesisData[thesisId];
      await fs.writeFile(THESIS_DATA_FILE, JSON.stringify(thesisData, null, 2));
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ error: 'Thesis not found' }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
} 