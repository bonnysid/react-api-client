import {Validator} from "../types/types";

export const required = (value: string) => value ? undefined : 'Поле обязательное'
export const symbolsMustBeWithoutRus = (value: string) => value.search(/[А-яЁё]/) === -1 ? undefined : 'Не должно быть русских букв'
export const composeValidators = (...validators: Validator[]) => (value: string) => validators.reduce((error: undefined | string, validator) => error || validator(value), undefined)