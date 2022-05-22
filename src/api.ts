const BASE_PATH = "https://hn.algolia.com/api/v1";
export interface Title {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface Url {
  value: string;
  matchLevel: string;
  fullyHighlighted: boolean;
  matchedWords: string[];
}

export interface Author {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface StoryText {
  value: string;
  matchLevel: string;
  matchedWords: any[];
}

export interface HighlightResult {
  title: Title;
  url: Url;
  author: Author;
  story_text: StoryText;
}

export interface Hit {
  created_at: Date;
  title: string;
  url: string;
  author: string;
  points: number;
  story_text: string;
  comment_text?: any;
  num_comments: number;
  story_id?: any;
  story_title?: any;
  story_url?: any;
  parent_id?: any;
  created_at_i: number;
  _tags: string[];
  objectID: string;
  _highlightResult: HighlightResult;
  relevancy_score?: number;
}

export interface SearchResponse {
  hits: Hit[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  query: string;
  params: string;
  processingTimeMS: number;
}
// Comment
export interface Child2 {
  id: number;
  created_at: Date;
  created_at_i: number;
  type: string;
  author: string;
  title?: any;
  url?: any;
  text: string;
  points?: any;
  parent_id: number;
  story_id: number;
  children: any[];
  options: any[];
}

export interface Child {
  id: number;
  created_at: Date;
  created_at_i: number;
  type: string;
  author: string;
  title?: any;
  url?: any;
  text: string;
  points?: any;
  parent_id: number;
  story_id: number;
  children: Child2[];
  options: any[];
}

export interface CommentResult {
  id: number;
  created_at: Date;
  created_at_i: number;
  type: string;
  author: string;
  title?: any;
  url?: any;
  text: string;
  points?: any;
  parent_id: number;
  story_id: number;
  children: Child[];
  options: any[];
}

export async function getItems(search: string) {
  const response = await fetch(`${BASE_PATH}/search?query=${search}`);
  return await response.json();
}

export async function getComment(id: string) {
  const response = await fetch(`${BASE_PATH}/items/${id}`);
  return await response.json();
}
