import { PlasmoGetOverlayAnchor } from "plasmo"
import { useEffect, useState } from "react"

const SHOW_SUCCESS_POPUP_COMMAND = "show-success-popup"

export const getOverlayAnchor: PlasmoGetOverlayAnchor = async () =>
  document.querySelector("body")

const PopUp = () => {
  const [show, setShow] = useState(false)
  useEffect(() => {
    chrome.runtime.onMessage.addListener((request) => {
      if (request.command === SHOW_SUCCESS_POPUP_COMMAND) {
        setShow(true)
        setTimeout(() => {
          setShow(false)
        }, 3000)
      }
    })
  }, [])

  if (!show) {
    return null
  }

  return (
    <div
      style={{
        borderRadius: "5px",
        padding: "5px 5px",
        backgroundColor: "green",
        display: "flex",
        flexBasis: "auto",
        marginTop: "10px",
        marginLeft: "10px"
      }}>
      <span>Link copied to clipboard 🎉</span>
    </div>
  )
}

export default PopUp
