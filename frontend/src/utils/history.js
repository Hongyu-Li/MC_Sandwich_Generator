import { createBrowserHistory } from "history"

const history = createBrowserHistory()

history.listen((location, method) => {
  if (method === "REPLACE" || method === "POP") {
    return
  }
  window.scrollTo(0, 0)
})

export default history
