export interface ColumnMetadata {
  name: string;
  type: string;
  required?: boolean;
  maxLength?: number;
}