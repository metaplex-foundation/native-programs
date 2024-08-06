import { UmiPlugin } from '@metaplex-foundation/umi';
import { createSystemProgramProgram } from './systemProgram';

export const nativePrograms = (): UmiPlugin => ({
  install(umi) {
    umi.programs.add(createSystemProgramProgram(), false);
  },
});
