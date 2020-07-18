use rocket::response::content;
use anyhow::Result;
use std::env;
use crate::utils::{Context};
use rocket_contrib::json::{Json};
use crate::hooks;

#[derive(Deserialize, Debug)]
pub struct SafeUpdate {
    pub address: String,
    //type: String,
    pub safeTxHash: String
}
#[post("/hooks/update/<token>", format = "json", data = "<update>")]
pub fn update(context: Context, token: String, update: Json<SafeUpdate>) -> Result<content::Json<String>> {
    if token == env::var("WEBHOOK_TOKEN")? {
        hooks::update(&context, &update.0)?;
    }
    return Ok(content::Json("".to_owned()));
}