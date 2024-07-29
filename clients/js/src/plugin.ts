import { UmiPlugin } from '@metaplex-foundation/umi';
import { createSystemProgramProgram } from './generated';

export const systemProgram = (): UmiPlugin => ({
  install(umi) {
    umi.programs.add(createSystemProgramProgram(), false);
  },
});
