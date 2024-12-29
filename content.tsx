import { AnimatePresence, motion } from "motion/react"
import type { PlasmoGetOverlayAnchor } from "plasmo"
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
      return true
    })
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          style={{
            borderRadius: "10px",
            fontSize: "16px",
            color: "#0C3112",
            fontWeight: "bold",
            fontFamily: "sans-serif",
            padding: "10px 10px",
            backgroundColor: "#9CE8AA",
            border: "2px solid #7CDF8C",
            display: "flex",
            flexBasis: "auto",
            alignItems: "center",
            marginTop: "10px",
            marginLeft: "10px",
            position: "fixed",
            top: "10px",
            right: "20px"
          }}>
          <LinkIcon />
          <div style={{ marginLeft: "5px" }}>Link copied to clipboard</div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PopUp

const LinkIcon = () => (
  <svg
    fill="#000000"
    width="20px"
    height="20px"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g
      id="SVGRepo_tracerCarrier"
      stroke-linecap="round"
      stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
      {" "}
      <g data-name="Layer 2">
        {" "}
        <g data-name="link-2">
          {" "}
          <rect width="24" height="24" opacity="0"></rect>{" "}
          <path d="M13.29 9.29l-4 4a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4-4a1 1 0 0 0-1.42-1.42z"></path>{" "}
          <path d="M12.28 17.4L11 18.67a4.2 4.2 0 0 1-5.58.4 4 4 0 0 1-.27-5.93l1.42-1.43a1 1 0 0 0 0-1.42 1 1 0 0 0-1.42 0l-1.27 1.28a6.15 6.15 0 0 0-.67 8.07 6.06 6.06 0 0 0 9.07.6l1.42-1.42a1 1 0 0 0-1.42-1.42z"></path>{" "}
          <path d="M19.66 3.22a6.18 6.18 0 0 0-8.13.68L10.45 5a1.09 1.09 0 0 0-.17 1.61 1 1 0 0 0 1.42 0L13 5.3a4.17 4.17 0 0 1 5.57-.4 4 4 0 0 1 .27 5.95l-1.42 1.43a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l1.42-1.42a6.06 6.06 0 0 0-.6-9.06z"></path>{" "}
        </g>{" "}
      </g>{" "}
    </g>
  </svg>
)
