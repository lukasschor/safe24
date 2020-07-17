use anyhow::Result;
use rocket::response::content;
use crate::utils::{Context};
use std::collections::{HashMap};

#[derive(Serialize, Debug)]
struct GraphQLReq {
    query: String,
    variables: HashMap<String, String>,
}

#[get("/membership/status/<safe>")]
pub fn status(context: Context, safe: String) -> Result<content::Json<String>> {
    let query = "query list($safe: Bytes!) {
        transferEvents(
          where: { 
            timestamp_gte:1000, 
            token: \"0x6b175474e89094c44da98b954eedeac495271d0f\",
            destination: $safe,
          }, first: 10) {
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
    let data = GraphQLReq {
        query, variables
    };
    let resp = context
        .client()
        .post("https://api.thegraph.com/subgraphs/name/protofire/token-registry")
        .json(&data)
        .send().unwrap()
        .text().unwrap();
    println!("{}", resp);
    return Ok(content::Json(resp));
}
