export interface RetrievedChunk {
  chunk_id: string;
  text: string;
  score: number;
  section_heading: string;
  parent_heading: string;
  source_url: string;
}

export interface Citation {
  section_heading: string;
  source_url: string;
  chunk_id: string;
}

export interface AskResponse {
  answer: string;
  citations: Citation[];
  retrieved_chunks: RetrievedChunk[];
  abstained: boolean;
}
