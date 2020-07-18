#![feature(proc_macro_hygiene, decl_macro, option_result_contains)]

#[macro_use] extern crate rocket;
#[macro_use] extern crate rocket_contrib;
#[macro_use] extern crate serde_derive;

extern crate anyhow;
extern crate dotenv;
extern crate reqwest;

pub mod routes;
pub mod utils;

use dotenv::dotenv;
use routes::transaction_routes;
use routes::error_catchers;

fn main() {
    dotenv().ok();

    rocket::ignite()
        .manage(reqwest::blocking::Client::new())
        .mount("/", transaction_routes())
        .register(error_catchers())
        .launch();
}