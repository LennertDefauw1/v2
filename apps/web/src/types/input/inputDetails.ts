import { Validation } from '@/types/input/validation';

export interface InputDetails {
    name: string | any;
    type: any;
    value?: any;
    label?: string;
    readonly?: boolean;
    validation?: Validation;
    hidden?: boolean;
    autofocus?: boolean;
    capitalize?: boolean;
}

export interface InputData {
    name: string;
    data: {
        value: any;
    };
}

export interface InputText extends InputDetails {
    placeholder: string;
    autocomplete?: boolean;
}

export interface InputTextArea extends InputDetails {
    cols?: number;
    rows?: number;
}

export interface InputFile extends InputDetails {
    multiple: boolean;
    folderUpload: boolean;
    accept?: any[];
    selectedFolderId?: string;
}

export interface InputSelect extends InputDetails {
    selectedValue: any;
    objectValue?: string;
    items: InputSelectFields[];
    checkboxWarning?: CheckboxWarning;
    canChange?: boolean;
    translation?: string;
}

export interface CheckboxWarning {
    condition: string;
    message: string;
}

export interface InputSelectFields {
    value: any;
}

export interface InputField {
    value: string;
    valid: boolean;
    errors?: InputError[];
}

export interface InputError {
    message: string;
}
