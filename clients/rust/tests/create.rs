#![cfg(feature = "test-sbf")]

use solana_program_test::{tokio, ProgramTest};
use solana_sdk::{
    native_token::LAMPORTS_PER_SOL,
    signature::{Keypair, Signer},
    transaction::Transaction,
};
use system_program::instructions::TransferBuilder;

#[tokio::test]
async fn transfer() {
    let mut context = ProgramTest::new("system_program", system_program::ID, None)
        .start_with_context()
        .await;

    // Given a new keypair.

    let address = Keypair::new();

    let ix = TransferBuilder::new()
        .funding_account(context.payer.pubkey())
        .recipient_account(address.pubkey())
        .lamports(LAMPORTS_PER_SOL)
        .instruction();

    // When we create a new account.

    let tx = Transaction::new_signed_with_payer(
        &[ix],
        Some(&context.payer.pubkey()),
        &[&context.payer, &address],
        context.last_blockhash,
    );
    context.banks_client.process_transaction(tx).await.unwrap();

    // Then an account was created with the correct data.

    let account = context
        .banks_client
        .get_account(address.pubkey())
        .await
        .unwrap();

    assert!(account.is_some());

    let account = account.unwrap();
    assert_eq!(account.lamports, 100);
}
