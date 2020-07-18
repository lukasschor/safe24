use anyhow::Result;
use rocket::response::content;
use crate::utils::{Context};
use crate::membership;

#[get("/membership/status/<safe>")]
pub fn status(context: Context, safe: String) -> Result<content::Json<String>> {
    let response = membership::status(&context, safe)?;
    return Ok(content::Json(serde_json::to_string(&response)?));
}
