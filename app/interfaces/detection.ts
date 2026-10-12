export interface Detection {
  class_id: number;
  class_name: string;
  confidence: number;
  box: { x1: number; y1: number; x2: number; y2: number }; // normalized 0..1
}

export interface DetectResponse {
  image_width: number;
  image_height: number;
  detections: Detection[];
}