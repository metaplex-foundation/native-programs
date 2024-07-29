/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  mapSerializer,
  publicKey as publicKeySerializer,
  string,
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
export type AllocateWithSeedInstructionAccounts = {
  /** The account to allocate space for */
  account: PublicKey | Pda;
  /** The base public key to use for the account's address derivation */
  base: Signer;
};

// Data.
export type AllocateWithSeedInstructionData = {
  discriminator: number;
  /** The base public key to use for the account's address derivation */
  basePubkey: PublicKey;
  /** The seed to use for the account's address derivation */
  seed: string;
  /** Number of bytes to allocate */
  space: bigint;
  /** Owner program account */
  owner: PublicKey;
};

export type AllocateWithSeedInstructionDataArgs = {
  /** The base public key to use for the account's address derivation */
  basePubkey: PublicKey;
  /** The seed to use for the account's address derivation */
  seed: string;
  /** Number of bytes to allocate */
  space: number | bigint;
  /** Owner program account */
  owner: PublicKey;
};

export function getAllocateWithSeedInstructionDataSerializer(): Serializer<
  AllocateWithSeedInstructionDataArgs,
  AllocateWithSeedInstructionData
> {
  return mapSerializer<
    AllocateWithSeedInstructionDataArgs,
    any,
    AllocateWithSeedInstructionData
  >(
    struct<AllocateWithSeedInstructionData>(
      [
        ['discriminator', u32()],
        ['basePubkey', publicKeySerializer()],
        ['seed', string()],
        ['space', u64()],
        ['owner', publicKeySerializer()],
      ],
      { description: 'AllocateWithSeedInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 9 })
  ) as Serializer<
    AllocateWithSeedInstructionDataArgs,
    AllocateWithSeedInstructionData
  >;
}

// Args.
export type AllocateWithSeedInstructionArgs =
  AllocateWithSeedInstructionDataArgs;

// Instruction.
export function allocateWithSeed(
  context: Pick<Context, 'programs'>,
  input: AllocateWithSeedInstructionAccounts & AllocateWithSeedInstructionArgs
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
    base: { index: 1, isWritable: false as boolean, value: input.base ?? null },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: AllocateWithSeedInstructionArgs = { ...input };

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
  const data = getAllocateWithSeedInstructionDataSerializer().serialize(
    resolvedArgs as AllocateWithSeedInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
