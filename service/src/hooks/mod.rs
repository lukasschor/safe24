use anyhow::Result;
use crate::utils::{Context};
use std::collections::{HashMap};
use std::time::SystemTime;
use std::env;
use crate::routes::hooks::{SafeUpdate};
use crate::membership;

#[derive(Serialize, Deserialize, Debug)]
struct SafeServiceTx {
    isExecuted: bool,
    confirmationsRequired: u32,
    confirmations: Vec<SafeServiceConfirmation> 
}

#[derive(Serialize, Deserialize, Debug)]
struct SafeServiceConfirmation {
    owner: String,
}

pub fn update(context: &Context, payload: &SafeUpdate) -> Result<bool> {
    let tx_detail_url = format!("{}/api/v1/transactions/{}/", env::var("SAFE_TX_SERVICE")?, payload.safeTxHash);
    let tx_details: SafeServiceTx = context
        .client()
        .get(&tx_detail_url)
        .send()?
        .json()?;
    println!("{} of {} confirmations (executed: {})", tx_details.confirmations.len(), tx_details.confirmationsRequired, tx_details.isExecuted);
    if tx_details.isExecuted || (tx_details.confirmations.len() as u32) < tx_details.confirmationsRequired {
        println!("Not ready or already executed");
        return Ok(false);
    }
    if !membership::status(context, payload.address.to_owned())?.active {
        println!("No membership");
        return Ok(false);
    }
    println!("Lets execute it");
    return Ok(true);
}