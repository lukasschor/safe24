use rocket::response::content;
use anyhow::Result;

#[post("/hooks/update/<token>")]
pub fn update(token: String) -> Result<content::Json<String>> {
    return Ok(content::Json(token))
}