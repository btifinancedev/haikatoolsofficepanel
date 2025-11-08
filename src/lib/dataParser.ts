import fs from 'fs';
import path from 'path';

export interface SessionData {
  id: number;
  tag: string;
  landing_url: string;
  uid?: string;
  hash?: string;
  custom: Record<string, any>;
  body_tokens: Record<string, any>;
  http_tokens: Record<string, any>;
  tokens: Record<string, any>;
  session_id: string;
  useragent: string;
  remote_addr: string;
  create_time: number;
  update_time: number;
  cmsgid: string;
  tmsgid: string;
}

export interface User {
  name: string;
  password: string;
  id: string;
}

// Parse RESP (Redis Serialization Protocol) format
function parseRESP(data: string): Map<string, any> {
  const result = new Map<string, any>();
  const lines = data.split("\n");

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.includes("{") && line.startsWith("{")) {
      try {
        const parsed = JSON.parse(line);
        // Use the session_id as the key, or id if session_id doesn't exist
        const key = parsed.session_id || `session:${parsed.id}`;
        result.set(key, parsed);
      } catch (error) {
        console.error('Failed to parse JSON line:', line, error);
      }
    }
  }

  return result;
}

export async function loadSessionData(): Promise<any[]> {
  try {
    console.log('Fetching from http://punchbowl.pro:8080/data.db...');
    const response = await fetch('http://punchbowl.pro:8080/data.db');
    console.log('Response status:', response.status);

    if (!response.ok) {
      console.error('Fetch failed with status:', response.status);
      return [];
    }

    const data = await response.text();
    console.log('Raw data length:', data.length);

    const parsed = parseRESP(data);
    console.log('Parsed entries count:', parsed.size);

    // Convert Map to array of objects with key/value structure
    const allData: any[] = [];
    for (const [key, value] of parsed) {
      allData.push({ key, value });
    }

    console.log('Final array length:', allData.length);
    return allData;
  } catch (error) {
    console.error('Error loading session data:', error);
    return [];
  }
}
export async function loadUsers(): Promise<User[]> {
  try {
    const filePath = path.join(process.cwd(), 'users.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading users:', error);
    return [];
  }
}

export function validateUser(name: string, password: string): User | null {
  // For demo purposes, we'll use plain text comparison
  // In production, use bcrypt to hash passwords
  try {
    const filePath = path.join(process.cwd(), 'users.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(data);
    return users.find((user: User) => user.name === name && user.password === password) || null;
  } catch (error) {
    console.error('Error validating user:', error);
    return null;
  }
}
