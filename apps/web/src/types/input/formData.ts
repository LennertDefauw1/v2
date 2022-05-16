import { InputField, InputFile, InputSelect, InputText, InputTextArea } from '@/types/input/inputDetails';

export interface FormData {
    name: string;
    submit?: string;
    cancel?: string;
    inputs: (InputText | InputTextArea | InputSelect | InputFile)[];
}

export interface FormFields {
    [index: string]: InputField;
}
