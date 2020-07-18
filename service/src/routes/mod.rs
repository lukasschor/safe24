  
extern crate rocket;

use rocket::Route;
use rocket::Catcher;
use rocket_contrib::json::JsonValue;

pub mod hooks;
pub mod membership;

pub fn transaction_routes() -> Vec<Route> {
    routes![hooks::update, membership::status]
}

pub fn error_catchers() -> Vec<Catcher> {
    catchers![not_found, panic]
}

#[catch(404)]
fn not_found() -> JsonValue {
    json!({
        "status": "error",
        "reason": "Resource was not found."
    })
}
#[catch(500)]
fn panic() -> JsonValue {
    json!({
        "status": "error",
        "reason": "Server error occurred."
    })
}