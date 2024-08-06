import { UmiPlugin } from '@metaplex-foundation/umi';
import { createSystemProgramProgram } from ".";

export const systemProgram = (): UmiPlugin => ({
  install(umi) {
    umi.programs.add(createSystemProgramProgram(), false);
  },
});
