import type { ScoreCategory } from '../types/simulation';
export const categoryMaximums: Record<ScoreCategory,number> = {'Anatomy Identification':25,'Procedure Sequence':25,'Decision Making':20,'Safety Checks':20,'Final Assessment':10};
export const scoreCategories = Object.keys(categoryMaximums) as ScoreCategory[];
