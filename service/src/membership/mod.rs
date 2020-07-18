use anyhow::Result;
use crate::utils::{Context};
use std::collections::{HashMap};
use std::time::SystemTime;
use std::env;

#[derive(Serialize, Debug)]
struct GraphQLReq {
    query: String,
    variables: HashMap<String, String>,
}

#[derive(Serialize, Deserialize, Debug)]
struct GraphQLRes<T> {
    data: T 
}

#[derive(Serialize, Deserialize, Debug)]
struct QueryTransferEvents {
    transferEvents: Vec<QueryTransferEvent> 
}

#[derive(Serialize, Deserialize, Debug)]
struct QueryTransferEvent {
    amount: String,
    destination: String,
    source: String,
    timestamp: String
}

#[derive(Serialize, Debug)]
pub struct MembershipStatus {
    pub validUntil: u64,
    pub active: bool
}

pub fn status(context: &Context, safe: String) -> Result<MembershipStatus> {
    let query = "query list($safe: Bytes!, $destination: Bytes!, $token: Bytes!) {
        transferEvents(
          where: { 
            token: $token,
            source: $safe,
            destination: $destination,
          }, first: 1000, orderBy: timestamp, orderDirection: desc) {
          source,
          destination,
          amount,
          timestamp,
          token {
            address
          }
        }
      }".to_owned();
    let mut variables = HashMap::new();
    variables.insert("safe".to_owned(), safe);
    variables.insert("token".to_owned(), env::var("PAYMENT_TOKEN")?.to_owned());
    variables.insert("destination".to_owned(), env::var("RELAY_SAFE")?.to_owned());
    let data = GraphQLReq {
        query, variables
    };
    let resp = context
        .client()
        .post(&env::var("TOKEN_REGISTRY")?)
        .json(&data)
        .send()?;
    let decoded: GraphQLRes<QueryTransferEvents> = resp.json()?;
    let mut duration: f64 = 0.0;
    let mut valid_until: u64 = 0;
    for event in decoded.data.transferEvents.iter() {
        duration += event.amount.parse::<f64>()? * 3600.0 * 24.0; // 1 dai per 24h
        let end = event.timestamp.parse::<u64>()? + (duration as u64);
        if end > valid_until {
            valid_until = end;
        }
    }
    let now = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH)?.as_secs();
    return Ok(MembershipStatus {
        validUntil: valid_until,
        active: valid_until >= now,
    });
}