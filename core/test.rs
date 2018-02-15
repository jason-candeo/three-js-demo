pub struct Point {
    x: i32,
    y: i32
}

#[no_mangle]
pub fn add(a: i32, b: i32) -> i32 {
  return a + b
}