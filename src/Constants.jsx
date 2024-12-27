import questions from "./questions.json";
import finalJeopardyQuestion from './finalJeopardy.json';

export const QUESTIONS = import.meta.env.VITE_JEOPARDY_QUESTIONS ? JSON.parse(import.meta.env.VITE_JEOPARDY_QUESTIONS) : questions;
export const CATEGORIES = questions.map(q => q.category);
export const FINAL_JEOPARDY_QUESTION = import.meta.env.VITE_FINAL_JEOPARDY_QUESTION ? JSON.parse(import.meta.env.VITE_FINAL_JEOPARDY_QUESTION) : finalJeopardyQuestion;
export const CLUES = [
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
];