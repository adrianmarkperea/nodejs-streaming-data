const fs = require("fs");

const file = fs.createWriteStream("./bigfile.txt")

for (let i = 0; i <= 1e6; i++) {
  file.write("Lorem ipsum dolor sit amet")
}

file.end()

