import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  '^.+\\.tsx?$': 'ts-jest'
  },
  roots: [
    "./",
    "src/"
  ]
};
export default config;