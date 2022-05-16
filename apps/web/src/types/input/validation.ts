import { InputError } from '@/types/input/inputDetails';

export interface Validation {
    lazy?: boolean;
    minLength?: number;
    maxLength?: number;
    required?: boolean;
    regex?: string;
    validator?: any;
}

export interface ValidationData {
    [fieldName: string]: {
        valid?: boolean;
        errors?: InputError[];
    };
}
