import * as fs from 'fs';
import { Configuration } from '@sls-mentor/core';

export const readConfiguration = (): Configuration => {
  try {
    const rawConfig = fs.readFileSync('sls-mentor.json', 'utf-8');
    const configuration = JSON.parse(rawConfig) as Configuration;

    return configuration;
  } catch {
    // if no config is found, return empty object
    return {};
  }
};
