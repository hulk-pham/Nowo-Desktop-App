export interface Word {
  id: number;
  text: string;
  phonetic: string;
  audio: string;
  engDefine: string;
  vieDefine?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
