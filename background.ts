export {}

const SHOW_SUCCESS_POPUP_COMMAND = "show-success-popup"

chrome.commands.onCommand.addListener(async (command) => {
  if (command !== "copy-url") {
    return
  }

  let queryOptions = { active: true, lastFocusedWindow: true }
  let [tab] = await chrome.tabs.query(queryOptions)

  if (!tab) {
    return
  }

  const currentUrl = tab.url

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: logWindow,
    args: [currentUrl]
  })
  chrome.tabs.sendMessage(tab.id, { command: SHOW_SUCCESS_POPUP_COMMAND })

  return true
})

async function logWindow(currentUrl: string) {
  // Hacky way to not have to get permissions for every new site
  const input = document.createElement("input")
  document.body.appendChild(input)
  input.value = currentUrl
  input.select()
  document.execCommand("copy")
  input.remove()
}
