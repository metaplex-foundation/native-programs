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
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type AssignWithSeedInstructionAccounts = {
  /** The account to assign to the program */
  account: PublicKey | Pda;
  /** The base public key to use for the account's address derivation */
  base: Signer;
};

// Data.
export type AssignWithSeedInstructionData = {
  discriminator: number;
  /** The base public key to use for the account's address derivation */
  basePubkey: PublicKey;
  /** String of ASCII chars, no longer than pubkey::MAX_SEED_LEN */
  seed: string;
  /** Owner program account */
  owner: PublicKey;
};

export type AssignWithSeedInstructionDataArgs = {
  /** The base public key to use for the account's address derivation */
  basePubkey: PublicKey;
  /** String of ASCII chars, no longer than pubkey::MAX_SEED_LEN */
  seed: string;
  /** Owner program account */
  owner: PublicKey;
};

export function getAssignWithSeedInstructionDataSerializer(): Serializer<
  AssignWithSeedInstructionDataArgs,
  AssignWithSeedInstructionData
> {
  return mapSerializer<
    AssignWithSeedInstructionDataArgs,
    any,
    AssignWithSeedInstructionData
  >(
    struct<AssignWithSeedInstructionData>(
      [
        ['discriminator', u32()],
        ['basePubkey', publicKeySerializer()],
        ['seed', string()],
        ['owner', publicKeySerializer()],
      ],
      { description: 'AssignWithSeedInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 10 })
  ) as Serializer<
    AssignWithSeedInstructionDataArgs,
    AssignWithSeedInstructionData
  >;
}

// Args.
export type AssignWithSeedInstructionArgs = AssignWithSeedInstructionDataArgs;

// Instruction.
export function assignWithSeed(
  context: Pick<Context, 'programs'>,
  input: AssignWithSeedInstructionAccounts & AssignWithSeedInstructionArgs
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
  const resolvedArgs: AssignWithSeedInstructionArgs = { ...input };

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
  const data = getAssignWithSeedInstructionDataSerializer().serialize(
    resolvedArgs as AssignWithSeedInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}