export interface RetrievedChunk {
  rank: number;
  relevance_score: number;
  section: string;
  page: number;
  content_preview: string;
}

export interface SourceRef {
  source_number: number;
  section: string;
  page: number;
  source: string;
}

export interface ClaimValidation {
  skipped: boolean;
  faithfulness: number | null;
  citation_accuracy: number | null;
  unsupported_claims: string[];
}

export interface AskResponse {
  question: string;
  answer: string;
  refused: boolean;
  refusal_reason: "out_of_scope" | "personal_medical_advice" | null;
  top_score: number | null;
  confidence: "high" | "medium" | "low" | "none";
  retrieved_chunks: RetrievedChunk[];
  sources: SourceRef[];
  claim_validation: ClaimValidation | null;
  warning: string | null;
  disclaimer?: string;
}