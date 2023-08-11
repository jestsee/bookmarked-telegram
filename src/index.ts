import "dotenv/config"
import { startBot } from "./bot"

function sayMyName(name: string): void {
  if (name === "Heisenberg") {
    console.log("You're right 👍")
  } else {
    console.log("You're wrong 👎")
  }
}

sayMyName("Heisenberg")
startBot()
