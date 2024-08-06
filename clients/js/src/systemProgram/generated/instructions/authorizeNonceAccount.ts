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
  struct,
  u32,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type AuthorizeNonceAccountInstructionAccounts = {
  /** The nonce account to change the authority of */
  nonceAccount: PublicKey | Pda;
  /** The current authority of the nonce account */
  nonceAuthority: Signer;
};

// Data.
export type AuthorizeNonceAccountInstructionData = {
  discriminator: number;
  /** The new authority to set on the nonce account */
  newAuthority: PublicKey;
};

export type AuthorizeNonceAccountInstructionDataArgs = {
  /** The new authority to set on the nonce account */
  newAuthority: PublicKey;
};

export function getAuthorizeNonceAccountInstructionDataSerializer(): Serializer<
  AuthorizeNonceAccountInstructionDataArgs,
  AuthorizeNonceAccountInstructionData
> {
  return mapSerializer<
    AuthorizeNonceAccountInstructionDataArgs,
    any,
    AuthorizeNonceAccountInstructionData
  >(
    struct<AuthorizeNonceAccountInstructionData>(
      [
        ['discriminator', u32()],
        ['newAuthority', publicKeySerializer()],
      ],
      { description: 'AuthorizeNonceAccountInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 7 })
  ) as Serializer<
    AuthorizeNonceAccountInstructionDataArgs,
    AuthorizeNonceAccountInstructionData
  >;
}

// Args.
export type AuthorizeNonceAccountInstructionArgs =
  AuthorizeNonceAccountInstructionDataArgs;

// Instruction.
export function authorizeNonceAccount(
  context: Pick<Context, 'programs'>,
  input: AuthorizeNonceAccountInstructionAccounts &
    AuthorizeNonceAccountInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'systemProgram',
    '11111111111111111111111111111111'
  );

  // Accounts.
  const resolvedAccounts = {
    nonceAccount: {
      index: 0,
      isWritable: true as boolean,
      value: input.nonceAccount ?? null,
    },
    nonceAuthority: {
      index: 1,
      isWritable: false as boolean,
      value: input.nonceAuthority ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: AuthorizeNonceAccountInstructionArgs = { ...input };

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
  const data = getAuthorizeNonceAccountInstructionDataSerializer().serialize(
    resolvedArgs as AuthorizeNonceAccountInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}