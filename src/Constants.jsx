import questions from "./jeopardy.json";
import questions2 from "./double_jeopardy.json";
import finalJeopardyQuestion from './finalJeopardy.json';

export const JEOPARDY_QUESTIONS = import.meta.env.VITE_JEOPARDY_QUESTIONS ? JSON.parse(import.meta.env.VITE_JEOPARDY_QUESTIONS) : questions;
export const JEOPARDY_CATEGORIES = JEOPARDY_QUESTIONS.map(q => q.category);

export const DOUBLE_JEOPARDY_QUESTIONS = import.meta.env.VITE_DOUBLE_JEOPARDY_QUESTIONS ? JSON.parse(import.meta.env.VITE_DOUBLE_JEOPARDY_QUESTIONS) : questions2;
export const DOUBLE_JEOPARDY_CATEGORIES = DOUBLE_JEOPARDY_QUESTIONS.map(q => q.category);

export const FINAL_JEOPARDY_QUESTION = import.meta.env.VITE_FINAL_JEOPARDY_QUESTION ? JSON.parse(import.meta.env.VITE_FINAL_JEOPARDY_QUESTION) : finalJeopardyQuestion;

export const CLUES = [
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
];

export const CLUES2 = [
    [400, 800, 1200, 1600, 2000],
    [400, 800, 1200, 1600, 2000],
    [400, 800, 1200, 1600, 2000],
    [400, 800, 1200, 1600, 2000],
    [400, 800, 1200, 1600, 2000],
    [400, 800, 1200, 1600, 2000],
];