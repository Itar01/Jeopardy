import questions from "./questions.json";

export const CLUES = [
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
    [200, 400, 600, 800, 1000],
];

export const QUESTIONS = import.meta.env.VITE_JEOPARDY_QUESTIONS ? JSON.parse(import.meta.env.VITE_JEOPARDY_QUESTIONS) : questions;

export const CATEGORIES = questions.map(q => q.category);