import { generateSigner, sol } from '@metaplex-foundation/umi';
import test from 'ava';
import { transfer } from '../src/systemProgram';
import { createUmi } from './_setup';

test('it can transfer funds', async (t) => {
  // Given a Umi instance and a new signer.
  const umi = await createUmi();
  const address = generateSigner(umi);

  await transfer(umi, {
    fundingAccount: umi.identity,
    recipientAccount: address.publicKey,
    lamports: sol(1),
  }).sendAndConfirm(umi);

  const recipientAccount = await umi.rpc.getAccount(address.publicKey);
  if (recipientAccount.exists) {
    t.deepEqual(recipientAccount.lamports, sol(1));
  } else {
    t.fail('Recipient account does not exist');
  }
});
