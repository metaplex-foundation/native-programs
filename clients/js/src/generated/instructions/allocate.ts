/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  struct,
  u32,
  u64,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type AllocateInstructionAccounts = {
  /** The account to allocate space for */
  account: Signer;
};

// Data.
export type AllocateInstructionData = {
  discriminator: number;
  /** Number of bytes to allocate */
  space: bigint;
};

export type AllocateInstructionDataArgs = {
  /** Number of bytes to allocate */
  space: number | bigint;
};

export function getAllocateInstructionDataSerializer(): Serializer<
  AllocateInstructionDataArgs,
  AllocateInstructionData
> {
  return mapSerializer<
    AllocateInstructionDataArgs,
    any,
    AllocateInstructionData
  >(
    struct<AllocateInstructionData>(
      [
        ['discriminator', u32()],
        ['space', u64()],
      ],
      { description: 'AllocateInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 8 })
  ) as Serializer<AllocateInstructionDataArgs, AllocateInstructionData>;
}

// Args.
export type AllocateInstructionArgs = AllocateInstructionDataArgs;

// Instruction.
export function allocate(
  context: Pick<Context, 'programs'>,
  input: AllocateInstructionAccounts & AllocateInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'systemProgram',
    '11111111111111111111111111111111'
  );

  // Accounts.
  const resolvedAccounts = {
    account: {
      index: 0,
      isWritable: true as boolean,
      value: input.account ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: AllocateInstructionArgs = { ...input };

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getAllocateInstructionDataSerializer().serialize(
    resolvedArgs as AllocateInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
